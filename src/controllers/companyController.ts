import { Response, NextFunction } from 'express';
import CompanyInfo from '../models/CompanyInfo';
import { AuthRequest } from '../types';
import { uploadToCloudinary } from '../middleware/upload';

export const getCompanyInfo = async (_req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    let company = await CompanyInfo.findOne();
    if (!company) {
      company = await CompanyInfo.create({
        name: 'Soyiri Labs',
        tagline: 'Innovation Through Technology',
        description: 'A technology company focused on building innovative digital solutions.',
        mission: 'To empower businesses through cutting-edge technology.',
        vision: 'To be a global leader in digital innovation.',
        values: [],
        logo: '',
        favicon: '',
        email: 'hello@soyirilabs.com',
        phone: '+1234567890',
        address: '123 Tech Street, Digital City',
        socialLinks: [],
      });
    }
    res.status(200).json({ success: true, data: company });
  } catch (error) {
    next(error);
  }
};

export const updateCompanyInfo = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const body = { ...req.body };

    if (body.values && typeof body.values === 'string') {
      body.values = JSON.parse(body.values);
    }
    if (body.socialLinks && typeof body.socialLinks === 'string') {
      body.socialLinks = JSON.parse(body.socialLinks);
    }

    if (req.files && typeof req.files === 'object' && !Array.isArray(req.files)) {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      if (files.logo && files.logo[0]) {
        body.logo = await uploadToCloudinary(files.logo[0], 'soyirilabs/company');
      }
      if (files.favicon && files.favicon[0]) {
        body.favicon = await uploadToCloudinary(files.favicon[0], 'soyirilabs/company');
      }
    }

    let company = await CompanyInfo.findOne();
    if (!company) {
      company = await CompanyInfo.create(body);
    } else {
      company = await CompanyInfo.findByIdAndUpdate(company._id, body, {
        new: true,
        runValidators: true,
      });
    }

    res.status(200).json({ success: true, data: company });
  } catch (error) {
    next(error);
  }
};
