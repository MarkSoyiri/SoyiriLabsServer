import mongoose, { Schema, Document } from 'mongoose';
import { IService } from '../types';

export interface IServiceDocument extends Document, Omit<IService, 'slug'> {
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

const serviceSchema = new Schema<IServiceDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    longDescription: { type: String },
    icon: { type: String, required: true },
    image: { type: String },
    features: [{ type: String }],
    process: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        duration: { type: String },
      },
    ],
    price: { type: Number },
    order: { type: Number, default: 0 },
    seoTitle: { type: String },
    seoDescription: { type: String },
  },
  { timestamps: true }
);

serviceSchema.index({ slug: 1 });
serviceSchema.index({ order: 1 });

export default mongoose.model<IServiceDocument>('Service', serviceSchema);
