import mongoose, { Schema, Document } from 'mongoose';
import { IContactMessage } from '../types';

export interface IContactMessageDocument extends Document, IContactMessage {
  createdAt: Date;
  updatedAt: Date;
}

const contactMessageSchema = new Schema<IContactMessageDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true },
    company: { type: String },
    budget: { type: String },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

contactMessageSchema.index({ read: 1, createdAt: -1 });

export default mongoose.model<IContactMessageDocument>('ContactMessage', contactMessageSchema);
