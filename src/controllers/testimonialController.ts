import { Response, NextFunction } from 'express';
import Testimonial from '../models/Testimonial';
import { AuthRequest } from '../types';
import { uploadToCloudinary } from '../middleware/upload';

export const getTestimonials = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { featured } = req.query;
    const filter: Record<string, unknown> = {};
    if (featured !== undefined) filter.featured = featured === 'true';

    const testimonials = await Testimonial.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: testimonials.length, data: testimonials });
  } catch (error) {
    next(error);
  }
};

export const getFeaturedTestimonials = async (_req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const testimonials = await Testimonial.find({ featured: true }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: testimonials.length, data: testimonials });
  } catch (error) {
    next(error);
  }
};

export const createTestimonial = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const body = { ...req.body };

    if (req.file) {
      body.photo = await uploadToCloudinary(req.file, 'soyirilabs/testimonials');
    }

    if (body.rating) body.rating = parseInt(body.rating, 10);
    if (body.featured !== undefined) body.featured = body.featured === 'true' || body.featured === true;

    const testimonial = await Testimonial.create(body);
    res.status(201).json({ success: true, data: testimonial });
  } catch (error) {
    next(error);
  }
};

export const updateTestimonial = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const body = { ...req.body };
    let testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      res.status(404).json({ success: false, message: 'Testimonial not found' });
      return;
    }

    if (req.file) {
      body.photo = await uploadToCloudinary(req.file, 'soyirilabs/testimonials');
    }

    if (body.rating) body.rating = parseInt(body.rating, 10);
    if (body.featured !== undefined) body.featured = body.featured === 'true' || body.featured === true;

    testimonial = await Testimonial.findByIdAndUpdate(req.params.id, body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: testimonial });
  } catch (error) {
    next(error);
  }
};

export const deleteTestimonial = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      res.status(404).json({ success: false, message: 'Testimonial not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Testimonial deleted successfully' });
  } catch (error) {
    next(error);
  }
};
