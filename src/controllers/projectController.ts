import { Response, NextFunction } from 'express';
import Project from '../models/Project';
import { AuthRequest } from '../types';
import { uploadToCloudinary } from '../middleware/upload';
import { generateSlug } from '../utils/helpers';

export const getProjects = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { status, featured, industry } = req.query;
    const filter: Record<string, unknown> = {};

    if (status) filter.status = status;
    if (featured !== undefined) filter.featured = featured === 'true';
    if (industry) filter.industry = industry;

    const projects = await Project.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    next(error);
  }
};

export const getFeaturedProjects = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const projects = await Project.find({ featured: true, status: 'published' }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    next(error);
  }
};

export const getProjectBySlug = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) {
      res.status(404).json({ success: false, message: 'Project not found' });
      return;
    }
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const body = { ...req.body };

    if (!body.slug) {
      body.slug = generateSlug(body.title);
    }

    if (req.file) {
      body.thumbnail = await uploadToCloudinary(req.file, 'soyirilabs/projects');
    }

    if (req.files && Array.isArray(req.files)) {
      const uploads = (req.files as Express.Multer.File[]).map((f) =>
        uploadToCloudinary(f, 'soyirilabs/projects/gallery')
      );
      body.gallery = await Promise.all(uploads);
    }

    if (body.technologies && typeof body.technologies === 'string') {
      body.technologies = JSON.parse(body.technologies);
    }
    if (body.servicesProvided && typeof body.servicesProvided === 'string') {
      body.servicesProvided = JSON.parse(body.servicesProvided);
    }

    const project = await Project.create(body);
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const body = { ...req.body };
    let project = await Project.findById(req.params.id);

    if (!project) {
      res.status(404).json({ success: false, message: 'Project not found' });
      return;
    }

    if (req.file) {
      body.thumbnail = await uploadToCloudinary(req.file, 'soyirilabs/projects');
    }

    if (req.files && Array.isArray(req.files) && (req.files as Express.Multer.File[]).length > 0) {
      const existingGallery = body.existingGallery
        ? JSON.parse(body.existingGallery)
        : project.gallery;
      const uploads = (req.files as Express.Multer.File[]).map((f) =>
        uploadToCloudinary(f, 'soyirilabs/projects/gallery')
      );
      const newGallery = await Promise.all(uploads);
      body.gallery = [...existingGallery, ...newGallery];
    }

    if (body.technologies && typeof body.technologies === 'string') {
      body.technologies = JSON.parse(body.technologies);
    }
    if (body.servicesProvided && typeof body.servicesProvided === 'string') {
      body.servicesProvided = JSON.parse(body.servicesProvided);
    }

    project = await Project.findByIdAndUpdate(req.params.id, body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      res.status(404).json({ success: false, message: 'Project not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    next(error);
  }
};
