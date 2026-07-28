import mongoose, { Schema, Document } from 'mongoose';
import { IBlogPost } from '../types';

export interface IBlogPostDocument extends Document, Omit<IBlogPost, 'slug'> {
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

const blogPostSchema = new Schema<IBlogPostDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String, required: true },
    category: { type: String, required: true },
    tags: [{ type: String }],
    author: { type: String, required: true },
    publishedAt: { type: Date, default: Date.now },
    readingTime: { type: Number, required: true },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    seoTitle: { type: String },
    seoDescription: { type: String },
  },
  { timestamps: true }
);

blogPostSchema.index({ slug: 1 });
blogPostSchema.index({ status: 1, publishedAt: -1 });
blogPostSchema.index({ category: 1 });

export default mongoose.model<IBlogPostDocument>('BlogPost', blogPostSchema);
