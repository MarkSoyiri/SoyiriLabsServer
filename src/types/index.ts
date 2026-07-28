import { Request } from 'express';

export interface IProject {
  title: string;
  slug: string;
  description: string;
  clientName: string;
  industry: string;
  technologies: string[];
  thumbnail: string;
  gallery: string[];
  liveUrl: string;
  githubUrl?: string;
  featured: boolean;
  completionYear: string;
  servicesProvided: string[];
  colorTheme: string;
  status: 'draft' | 'published';
  seoTitle?: string;
  seoDescription?: string;
  challenges?: string;
  solution?: string;
  results?: string;
}

export interface IService {
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  icon: string;
  image?: string;
  features: string[];
  process: {
    title: string;
    description: string;
    duration?: string;
  }[];
  price?: number;
  order: number;
  seoTitle?: string;
  seoDescription?: string;
}

export interface ITestimonial {
  name: string;
  company: string;
  position: string;
  photo: string;
  rating: number;
  review: string;
  featured: boolean;
}

export interface IBlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt: Date;
  readingTime: number;
  status: 'draft' | 'published';
  seoTitle?: string;
  seoDescription?: string;
}

export interface IContactMessage {
  name: string;
  email: string;
  company?: string;
  budget?: string;
  message: string;
  read: boolean;
}

export interface IHomepageContent {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  stats: {
    label: string;
    value: string;
    suffix?: string;
  }[];
  aboutText: string;
  ctaTitle: string;
  ctaDescription: string;
}

export interface ICompanyInfo {
  name: string;
  tagline: string;
  description: string;
  mission: string;
  vision: string;
  values: {
    title: string;
    description: string;
    icon: string;
  }[];
  logo: string;
  favicon: string;
  email: string;
  phone: string;
  address: string;
  socialLinks: {
    platform: string;
    url: string;
    icon: string;
  }[];
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'editor';
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}
