import { Response, NextFunction } from 'express';
import BlogPost from '../models/BlogPost';
import { AuthRequest } from '../types';
import { uploadToCloudinary } from '../middleware/upload';
import { generateSlug } from '../utils/helpers';

export const getBlogPosts = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { status, category } = req.query;
    const filter: Record<string, unknown> = {};

    if (status) filter.status = status;
    if (category) filter.category = category;

    const posts = await BlogPost.find(filter).sort({ publishedAt: -1 });
    res.status(200).json({ success: true, count: posts.length, data: posts });
  } catch (error) {
    next(error);
  }
};

export const getBlogPostBySlug = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug });
    if (!post) {
      res.status(404).json({ success: false, message: 'Blog post not found' });
      return;
    }
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

export const createBlogPost = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const body = { ...req.body };

    if (!body.slug) {
      body.slug = generateSlug(body.title);
    }

    if (req.file) {
      body.coverImage = await uploadToCloudinary(req.file, 'soyirilabs/blog');
    }

    if (body.tags && typeof body.tags === 'string') {
      body.tags = JSON.parse(body.tags);
    }

    if (body.readingTime) {
      body.readingTime = parseInt(body.readingTime, 10);
    }

    const post = await BlogPost.create(body);
    res.status(201).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

export const updateBlogPost = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const body = { ...req.body };
    let post = await BlogPost.findById(req.params.id);

    if (!post) {
      res.status(404).json({ success: false, message: 'Blog post not found' });
      return;
    }

    if (req.file) {
      body.coverImage = await uploadToCloudinary(req.file, 'soyirilabs/blog');
    }

    if (body.tags && typeof body.tags === 'string') {
      body.tags = JSON.parse(body.tags);
    }

    if (body.readingTime) {
      body.readingTime = parseInt(body.readingTime, 10);
    }

    post = await BlogPost.findByIdAndUpdate(req.params.id, body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

export const deleteBlogPost = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) {
      res.status(404).json({ success: false, message: 'Blog post not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Blog post deleted successfully' });
  } catch (error) {
    next(error);
  }
};
