import mongoose, { Schema, Document } from 'mongoose';
import { ICompanyInfo } from '../types';

export interface ICompanyInfoDocument extends Document, ICompanyInfo {
  createdAt: Date;
  updatedAt: Date;
}

const companyInfoSchema = new Schema<ICompanyInfoDocument>(
  {
    name: { type: String, required: true },
    tagline: { type: String, required: true },
    description: { type: String, required: true },
    mission: { type: String, required: true },
    vision: { type: String, required: true },
    values: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        icon: { type: String, required: true },
      },
    ],
    logo: { type: String, required: true },
    favicon: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    socialLinks: [
      {
        platform: { type: String, required: true },
        url: { type: String, required: true },
        icon: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<ICompanyInfoDocument>('CompanyInfo', companyInfoSchema);
