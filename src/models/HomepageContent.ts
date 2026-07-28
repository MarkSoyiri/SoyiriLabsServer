import mongoose, { Schema, Document } from 'mongoose';
import { IHomepageContent } from '../types';

export interface IHomepageContentDocument extends Document, IHomepageContent {
  createdAt: Date;
  updatedAt: Date;
}

const homepageContentSchema = new Schema<IHomepageContentDocument>(
  {
    heroTitle: { type: String, required: true },
    heroSubtitle: { type: String, required: true },
    heroDescription: { type: String, required: true },
    stats: [
      {
        label: { type: String, required: true },
        value: { type: String, required: true },
        suffix: { type: String },
      },
    ],
    aboutText: { type: String, required: true },
    ctaTitle: { type: String, required: true },
    ctaDescription: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IHomepageContentDocument>('HomepageContent', homepageContentSchema);
