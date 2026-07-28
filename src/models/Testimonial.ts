import mongoose, { Schema, Document } from 'mongoose';
import { ITestimonial } from '../types';

export interface ITestimonialDocument extends Document, ITestimonial {
  createdAt: Date;
  updatedAt: Date;
}

const testimonialSchema = new Schema<ITestimonialDocument>(
  {
    name: { type: String, required: true, trim: true },
    company: { type: String, required: true },
    position: { type: String, required: true },
    photo: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

testimonialSchema.index({ featured: 1 });

export default mongoose.model<ITestimonialDocument>('Testimonial', testimonialSchema);
