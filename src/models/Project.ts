import mongoose, { Schema, Document } from 'mongoose';
import { IProject } from '../types';

export interface IProjectDocument extends Document, Omit<IProject, 'slug'> {
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProjectDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    clientName: { type: String, required: true },
    industry: { type: String, required: true },
    technologies: [{ type: String }],
    thumbnail: { type: String, required: true },
    gallery: [{ type: String }],
    liveUrl: { type: String, required: true },
    githubUrl: { type: String },
    featured: { type: Boolean, default: false },
    completionYear: { type: String, required: true },
    servicesProvided: [{ type: String }],
    colorTheme: { type: String, default: '#2563eb' },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    seoTitle: { type: String },
    seoDescription: { type: String },
    challenges: { type: String },
    solution: { type: String },
    results: { type: String },
  },
  { timestamps: true }
);

projectSchema.index({ slug: 1 });
projectSchema.index({ featured: 1, status: 1 });

export default mongoose.model<IProjectDocument>('Project', projectSchema);
