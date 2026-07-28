import { Response, NextFunction } from 'express';
import HomepageContent from '../models/HomepageContent';
import { AuthRequest } from '../types';

export const getHomepageContent = async (_req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    let content = await HomepageContent.findOne();
    if (!content) {
      content = await HomepageContent.create({
        heroTitle: 'Soyiri Labs',
        heroSubtitle: 'Innovation Through Technology',
        heroDescription: 'We build digital products that transform businesses and delight users.',
        stats: [],
        aboutText: 'Soyiri Labs is a technology company focused on building innovative digital solutions.',
        ctaTitle: 'Let\'s Work Together',
        ctaDescription: 'Ready to start your next project? Get in touch with us today.',
      });
    }
    res.status(200).json({ success: true, data: content });
  } catch (error) {
    next(error);
  }
};

export const updateHomepageContent = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const body = { ...req.body };

    if (body.stats && typeof body.stats === 'string') {
      body.stats = JSON.parse(body.stats);
    }

    let content = await HomepageContent.findOne();
    if (!content) {
      content = await HomepageContent.create(body);
    } else {
      content = await HomepageContent.findByIdAndUpdate(content._id, body, {
        new: true,
        runValidators: true,
      });
    }

    res.status(200).json({ success: true, data: content });
  } catch (error) {
    next(error);
  }
};
