import { Response, NextFunction } from 'express';
import Service from '../models/Service';
import { AuthRequest } from '../types';
import { uploadToCloudinary } from '../middleware/upload';
import { generateSlug } from '../utils/helpers';

export const getServices = async (_req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const services = await Service.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, count: services.length, data: services });
  } catch (error) {
    next(error);
  }
};

export const getServiceBySlug = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const service = await Service.findOne({ slug: req.params.slug });
    if (!service) {
      res.status(404).json({ success: false, message: 'Service not found' });
      return;
    }
    res.status(200).json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
};

export const createService = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const body = { ...req.body };

    if (!body.slug) {
      body.slug = generateSlug(body.title);
    }

    if (req.file) {
      body.image = await uploadToCloudinary(req.file, 'soyirilabs/services');
    }

    if (body.features && typeof body.features === 'string') {
      body.features = JSON.parse(body.features);
    }
    if (body.process && typeof body.process === 'string') {
      body.process = JSON.parse(body.process);
    }

    const service = await Service.create(body);
    res.status(201).json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
};

export const updateService = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const body = { ...req.body };
    let service = await Service.findById(req.params.id);

    if (!service) {
      res.status(404).json({ success: false, message: 'Service not found' });
      return;
    }

    if (req.file) {
      body.image = await uploadToCloudinary(req.file, 'soyirilabs/services');
    }

    if (body.features && typeof body.features === 'string') {
      body.features = JSON.parse(body.features);
    }
    if (body.process && typeof body.process === 'string') {
      body.process = JSON.parse(body.process);
    }

    service = await Service.findByIdAndUpdate(req.params.id, body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
};

export const deleteService = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      res.status(404).json({ success: false, message: 'Service not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Service deleted successfully' });
  } catch (error) {
    next(error);
  }
};
