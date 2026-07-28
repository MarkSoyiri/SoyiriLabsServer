import { Response, NextFunction } from 'express';
import ContactMessage from '../models/ContactMessage';
import CompanyInfo from '../models/CompanyInfo';
import { AuthRequest } from '../types';
import transporter from '../config/nodemailer';

export const submitMessage = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, company, budget, message } = req.body;

    if (!name || !email || !message) {
      res.status(400).json({ success: false, message: 'Name, email, and message are required' });
      return;
    }

    const contactMessage = await ContactMessage.create({ name, email, company, budget, message });

    const companyInfo = await CompanyInfo.findOne();
    const adminEmail = companyInfo?.email || process.env.ADMIN_EMAIL || 'admin@soyirilabs.com';

    if (process.env.SMTP_USER) {
      try {
        await transporter.sendMail({
          from: `"Soyiri Labs Contact" <${process.env.SMTP_USER}>`,
          to: adminEmail,
          subject: `New Contact Message from ${name}`,
          html: `
            <h2>New Contact Message</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
            ${budget ? `<p><strong>Budget:</strong> ${budget}</p>` : ''}
            <p><strong>Message:</strong></p>
            <p>${message}</p>
            <hr />
            <p><small>Sent via Soyiri Labs contact form</small></p>
          `,
        });
      } catch {
        console.warn('Email notification failed, but message was saved');
      }
    }

    res.status(201).json({
      success: true,
      message: 'Message sent successfully. We will get back to you soon.',
      data: contactMessage,
    });
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { read } = req.query;
    const filter: Record<string, unknown> = {};
    if (read !== undefined) filter.read = read === 'true';

    const messages = await ContactMessage.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    next(error);
  }
};

export const markAsRead = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const message = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    if (!message) {
      res.status(404).json({ success: false, message: 'Message not found' });
      return;
    }

    res.status(200).json({ success: true, data: message });
  } catch (error) {
    next(error);
  }
};

export const deleteMessage = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!message) {
      res.status(404).json({ success: false, message: 'Message not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    next(error);
  }
};
