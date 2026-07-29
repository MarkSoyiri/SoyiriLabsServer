import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import Project from '../models/Project';
import Service from '../models/Service';
import Testimonial from '../models/Testimonial';
import BlogPost from '../models/BlogPost';
import HomepageContent from '../models/HomepageContent';
import CompanyInfo from '../models/CompanyInfo';

const seedData = async (): Promise<void> => {
  const collections = await mongoose.connection.db?.listCollections().toArray();
  const collectionNames = collections?.map((c) => c.name) || [];

  // Admin User
  if (!collectionNames.includes('users') || (await User.countDocuments()) === 0) {
    await User.create({
      name: 'Admin',
      email: 'admin@soyirilabs.com',
      password: 'admin123',
      role: 'admin',
    });
    console.log('Admin user seeded: admin@soyirilabs.com / admin123');
  }

  // Homepage Content
  if (!collectionNames.includes('homepagecontents') || (await HomepageContent.countDocuments()) === 0) {
    await HomepageContent.create({
      heroTitle: 'We Build Digital Experiences That Drive Growth',
      heroSubtitle: 'Soyiri Labs',
      heroDescription:
        'We are a team of passionate technologists, designers, and strategists dedicated to crafting innovative digital solutions that transform businesses and delight users.',
      stats: [
        { label: 'Projects Completed', value: '50', suffix: '+' },
        { label: 'Happy Clients', value: '30', suffix: '+' },
        { label: 'Team Members', value: '15', suffix: '+' },
        { label: 'Years Experience', value: '5', suffix: '+' },
      ],
      aboutText:
        'Soyiri Labs is a technology innovation company that partners with businesses to design, build, and scale digital products. Our multidisciplinary team combines deep technical expertise with creative design thinking to deliver solutions that make a real impact.',
      ctaTitle: 'Ready to Build Something Amazing?',
      ctaDescription:
        'Let\'s collaborate to turn your vision into reality. Get in touch with our team and let\'s start a conversation about your next project.',
    });
    console.log('Homepage content seeded');
  }

  // Company Info
  if (!collectionNames.includes('companyinfos') || (await CompanyInfo.countDocuments()) === 0) {
    await CompanyInfo.create({
      name: 'Soyiri Labs',
      tagline: 'Innovation Through Technology',
      description:
        'Soyiri Labs is a technology innovation company specializing in web development, mobile apps, UI/UX design, and digital strategy.',
      mission:
        'To empower businesses and organizations with cutting-edge technology solutions that drive growth, efficiency, and innovation.',
      vision:
        'To be a globally recognized leader in digital innovation, known for delivering exceptional value and transformative solutions.',
      values: [
        {
          title: 'Innovation',
          description: 'We constantly push boundaries and explore new technologies to deliver forward-thinking solutions.',
          icon: 'lightbulb',
        },
        {
          title: 'Quality',
          description: 'We are committed to excellence in every project, ensuring robust, scalable, and beautiful results.',
          icon: 'shield',
        },
        {
          title: 'Collaboration',
          description: 'We believe in the power of teamwork and partner closely with our clients throughout the journey.',
          icon: 'users',
        },
        {
          title: 'Integrity',
          description: 'We operate with transparency, honesty, and a strong ethical foundation in all we do.',
          icon: 'check',
        },
      ],
      logo: 'https://res.cloudinary.com/demo/image/upload/v1/soyirilabs/logo',
      favicon: 'https://res.cloudinary.com/demo/image/upload/v1/soyirilabs/favicon',
      email: 'hello@soyirilabs.com',
      phone: '+1 (555) 123-4567',
      address: '123 Innovation Drive, Suite 200, San Francisco, CA 94105',
      socialLinks: [
        { platform: 'Twitter', url: 'https://twitter.com/soyirilabs', icon: 'twitter' },
        { platform: 'LinkedIn', url: 'https://linkedin.com/company/soyirilabs', icon: 'linkedin' },
        { platform: 'GitHub', url: 'https://github.com/soyirilabs', icon: 'github' },
      ],
    });
    console.log('Company info seeded');
  }

  // Projects — upsert by slug so it works regardless of existing data
  {
    const projects = [
      {
        title: 'Zesty Cave',
        slug: 'zesty-cave',
        description:
          'A modern online food ordering platform built for restaurants. Customers can browse menus, place orders, make secure payments, and track orders in real time. Includes a powerful admin dashboard for managing products, categories, customers, orders, payments, and business operations.',
        clientName: 'Zesty Cave',
        industry: 'Restaurant / E-Commerce',
        technologies: ['React', 'Express.js', 'Node.js', 'MongoDB', 'Tailwind CSS'],
        thumbnail: 'https://placehold.co/800x600/E11D48/FFFFFF?text=Zesty+Cave',
        gallery: [],
        liveUrl: 'https://react-shop-project-bootstrap.vercel.app/',
        featured: true,
        completionYear: '2025',
        servicesProvided: ['Web Development', 'E-Commerce', 'Admin Dashboard'],
        colorTheme: '#e11d48',
        status: 'published',
        seoTitle: 'Zesty Cave | Restaurant Food Ordering Platform | Soyiri Labs',
        seoDescription: 'Zesty Cave is a modern online food ordering platform built for restaurants with menu browsing, secure payments, real-time order tracking, and a powerful admin dashboard.',
      },
      {
        title: 'HydroMonitor',
        slug: 'hydromonitor',
        description:
          'A complete smart water monitoring and billing platform designed for property managers and institutions. Provides real-time monitoring from ESP32 devices, tenant management, billing, analytics, leak detection, alerts, and administrative tools through a modern responsive dashboard.',
        clientName: 'HydroMonitor',
        industry: 'IoT / Smart Water Management',
        technologies: ['React', 'Express.js', 'Node.js', 'MongoDB', 'ESP32', 'Firebase'],
        thumbnail: 'https://placehold.co/800x600/0891B2/FFFFFF?text=HydroMonitor',
        gallery: [],
        liveUrl: 'https://hydromonitor-web-app.vercel.app/',
        featured: true,
        completionYear: '2025',
        servicesProvided: ['Web Development', 'IoT Development', 'Dashboard Design'],
        colorTheme: '#0891b2',
        status: 'published',
        seoTitle: 'HydroMonitor | Smart Water Monitoring & Billing Platform | Soyiri Labs',
        seoDescription: 'HydroMonitor is a smart water monitoring and billing platform with ESP32 integration, real-time usage tracking, tenant management, billing, analytics, and leak detection.',
      },
      {
        title: 'HydroMonitorV2 Backend',
        slug: 'hydromonitor-v2-backend',
        description:
          'A robust backend infrastructure powering the next generation of smart water monitoring. Built with Node.js and Express, it handles real-time sensor data ingestion via MQTT, WebSocket-based live dashboards, tenant management, billing automation, and scalable API services for IoT ecosystems.',
        clientName: 'HydroMonitor',
        industry: 'IoT / Backend Infrastructure',
        technologies: ['Node.js', 'Express.js', 'MongoDB', 'MQTT', 'WebSockets', 'Docker'],
        thumbnail: 'https://placehold.co/800x600/0E7490/FFFFFF?text=HydroMonitor+V2',
        gallery: [],
        liveUrl: 'https://hydromonitor-v2-backend.vercel.app/',
        featured: true,
        completionYear: '2025',
        servicesProvided: ['Backend Development', 'IoT Engineering', 'API Design'],
        colorTheme: '#0e7490',
        status: 'published',
        seoTitle: 'HydroMonitorV2 Backend | IoT Backend Infrastructure | Soyiri Labs',
        seoDescription: 'HydroMonitorV2 Backend is a robust Node.js backend for smart water monitoring, handling real-time sensor data, MQTT ingestion, WebSocket dashboards, and IoT billing automation.',
      },
      {
        title: 'BackendSP',
        slug: 'backend-sp',
        description:
          'A high-performance backend platform built with Node.js and TypeScript, featuring modular service architecture, real-time data processing, secure authentication, and scalable RESTful APIs for modern web applications and third-party integrations.',
        clientName: 'BackendSP',
        industry: 'Backend / API Development',
        technologies: ['Node.js', 'Express.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker'],
        thumbnail: 'https://placehold.co/800x600/7C3AED/FFFFFF?text=BackendSP',
        gallery: [],
        liveUrl: 'https://express-js-on-vercel-liart-chi.vercel.app/',
        featured: true,
        completionYear: '2025',
        servicesProvided: ['Backend Development', 'API Design', 'DevOps'],
        colorTheme: '#7c3aed',
        status: 'published',
        seoTitle: 'BackendSP | High-Performance Backend Platform | Soyiri Labs',
        seoDescription: 'BackendSP is a high-performance Node.js and TypeScript backend platform with modular architecture, real-time processing, secure APIs, and scalable service design.',
      },
    ];

    for (const project of projects) {
      await Project.findOneAndUpdate(
        { slug: project.slug },
        { $set: project },
        { upsert: true, new: true },
      );
      console.log(`Project seeded: ${project.title}`);
    }
  }

  // Services
  if (!collectionNames.includes('services') || (await Service.countDocuments()) === 0) {
    const services = [
      {
        title: 'Web Development',
        slug: 'web-development',
        description:
          'We build high-performance web applications using modern frameworks and best practices.',
        longDescription:
          'From responsive corporate websites to complex SaaS platforms, our web development team leverages cutting-edge technologies to deliver fast, secure, and scalable solutions. We specialize in React, Next.js, Node.js, and modern cloud architectures.',
        icon: 'globe',
        image: 'https://res.cloudinary.com/demo/image/upload/v1/soyirilabs/services/web-dev',
        features: [
          'Custom web application development',
          'Progressive web apps (PWAs)',
          'API development and integration',
          'Performance optimization',
          'Responsive design',
          'SEO-friendly architecture',
        ],
        process: [
          { title: 'Discovery', description: 'We understand your goals, audience, and requirements through in-depth consultation.', duration: '1-2 weeks' },
          { title: 'Design', description: 'We create wireframes and prototypes to visualize the user experience and interface.', duration: '2-3 weeks' },
          { title: 'Development', description: 'Our engineers build your solution using agile methodologies with regular check-ins.', duration: '4-12 weeks' },
          { title: 'Testing', description: 'Rigorous QA testing ensures your application is reliable, secure, and performant.', duration: '1-2 weeks' },
          { title: 'Launch & Support', description: 'We deploy your application and provide ongoing maintenance and support.', duration: 'Ongoing' },
        ],
        order: 1,
        seoTitle: 'Web Development Services | Soyiri Labs',
        seoDescription: 'Professional web development services using modern frameworks. We build fast, secure, and scalable web applications.',
      },
      {
        title: 'Mobile App Development',
        slug: 'mobile-app-development',
        description:
          'Native and cross-platform mobile applications that deliver exceptional user experiences.',
        longDescription:
          'Our mobile development team creates beautiful, performant apps for iOS and Android using Flutter, React Native, and native technologies. We handle everything from concept to App Store deployment.',
        icon: 'smartphone',
        image: 'https://res.cloudinary.com/demo/image/upload/v1/soyirilabs/services/mobile',
        features: [
          'Cross-platform apps (Flutter, React Native)',
          'Native iOS and Android development',
          'App Store optimization',
          'Push notifications',
          'Offline-first architecture',
          'In-app purchases and subscriptions',
        ],
        process: [
          { title: 'Strategy', description: 'We define the app vision, target audience, and feature roadmap.', duration: '1-2 weeks' },
          { title: 'UI/UX Design', description: 'We design intuitive interfaces and smooth user flows.', duration: '2-4 weeks' },
          { title: 'Development', description: 'Agile development with regular builds and demos.', duration: '6-16 weeks' },
          { title: 'Testing', description: 'Comprehensive testing across devices and platforms.', duration: '2-3 weeks' },
          { title: 'Deployment', description: 'We handle App Store and Google Play submission.', duration: '1-2 weeks' },
        ],
        order: 2,
      },
      {
        title: 'UI/UX Design',
        slug: 'ui-ux-design',
        description:
          'User-centered design that creates intuitive, engaging, and accessible digital experiences.',
        longDescription:
          'Our design team follows a human-centered approach to create interfaces that are not only visually stunning but also intuitive and accessible. We combine research, prototyping, and iterative testing to deliver designs that users love.',
        icon: 'palette',
        image: 'https://res.cloudinary.com/demo/image/upload/v1/soyirilabs/services/design',
        features: [
          'User research and personas',
          'Information architecture',
          'Wireframing and prototyping',
          'Visual design and branding',
          'Design systems',
          'Usability testing',
        ],
        process: [
          { title: 'Research', description: 'We conduct user research, competitor analysis, and stakeholder interviews.', duration: '1-2 weeks' },
          { title: 'Wireframing', description: 'We create low-fidelity wireframes to establish layout and flow.', duration: '1-2 weeks' },
          { title: 'Visual Design', description: 'High-fidelity mockups with your brand identity and design system.', duration: '2-4 weeks' },
          { title: 'Prototyping', description: 'Interactive prototypes for user testing and stakeholder review.', duration: '1-2 weeks' },
          { title: 'Handoff', description: 'Developer-ready assets, specs, and design system documentation.', duration: '1 week' },
        ],
        order: 3,
      },
      {
        title: 'Cloud & DevOps',
        slug: 'cloud-devops',
        description:
          'Scalable cloud infrastructure and CI/CD pipelines to accelerate your development workflow.',
        longDescription:
          'We design and implement cloud architectures on AWS, GCP, and Azure. Our DevOps engineers set up automated deployment pipelines, monitoring, and infrastructure-as-code to ensure your applications run reliably at any scale.',
        icon: 'cloud',
        features: [
          'Cloud migration and architecture',
          'CI/CD pipeline setup',
          'Infrastructure as Code (Terraform)',
          'Containerization (Docker, Kubernetes)',
          'Monitoring and alerting',
          'Security and compliance',
        ],
        process: [
          { title: 'Assessment', description: 'We evaluate your current infrastructure and identify improvement areas.', duration: '1-2 weeks' },
          { title: 'Architecture Design', description: 'We design a scalable, secure cloud architecture tailored to your needs.', duration: '1-2 weeks' },
          { title: 'Implementation', description: 'We set up infrastructure, pipelines, and monitoring.', duration: '3-6 weeks' },
          { title: 'Optimization', description: 'We optimize for performance, cost, and security.', duration: '1-2 weeks' },
          { title: 'Handover', description: 'We provide documentation and training for your team.', duration: '1 week' },
        ],
        order: 4,
      },
    ];

    await Service.insertMany(services);
    console.log(`${services.length} services seeded`);
  }

  // Testimonials
  if (!collectionNames.includes('testimonials') || (await Testimonial.countDocuments()) === 0) {
    const testimonials = [
      {
        name: 'Sarah Johnson',
        company: 'ShopMax Retail',
        position: 'CEO',
        photo: 'https://res.cloudinary.com/demo/image/upload/v1/soyirilabs/testimonials/sarah',
        rating: 5,
        review: 'Soyiri Labs transformed our e-commerce platform completely. The new design is beautiful, the performance is outstanding, and our sales have increased significantly. Their team was professional, responsive, and truly understood our vision.',
        featured: true,
      },
      {
        name: 'Michael Chen',
        company: 'Pocket Finance',
        position: 'CTO',
        photo: 'https://res.cloudinary.com/demo/image/upload/v1/soyirilabs/testimonials/michael',
        rating: 5,
        review: 'Working with Soyiri Labs was an incredible experience. They delivered our fintech app on time and exceeded our expectations. The attention to detail and technical expertise they brought to the project was remarkable.',
        featured: true,
      },
      {
        name: 'Emily Rodriguez',
        company: 'MediCare Plus',
        position: 'Director of Operations',
        photo: 'https://res.cloudinary.com/demo/image/upload/v1/soyirilabs/testimonials/emily',
        rating: 5,
        review: 'The healthcare management system Soyiri Labs built for us has revolutionized how we operate. Patient satisfaction is up, administrative overhead is down, and the telemedicine features have been a game-changer.',
        featured: true,
      },
    ];

    await Testimonial.insertMany(testimonials);
    console.log(`${testimonials.length} testimonials seeded`);
  }

  // Blog Posts
  if (!collectionNames.includes('blogposts') || (await BlogPost.countDocuments()) === 0) {
    const posts = [
      {
        title: 'The Future of Web Development in 2024',
        slug: 'future-of-web-development-2024',
        excerpt: 'Explore the trends shaping web development this year, from AI-powered tools to edge computing and beyond.',
        content: `# The Future of Web Development in 2024\n\nThe web development landscape continues to evolve at a rapid pace. In 2024, several key trends are shaping how we build and deploy web applications.\n\n## AI-Powered Development\n\nArtificial intelligence is transforming how developers work. From code generation to testing automation, AI tools are making developers more productive than ever.\n\n## Edge Computing\n\nEdge computing is changing where and how we run our applications. By moving computation closer to users, we can achieve dramatically lower latency and better performance.\n\n## WebAssembly\n\nWebAssembly continues to gain traction, enabling developers to run high-performance code in the browser written in languages like Rust, Go, and C++.\n\n## Conclusion\n\nThe web development landscape is more exciting than ever. Staying ahead of these trends is crucial for building modern, performant applications.`,
        coverImage: 'https://res.cloudinary.com/demo/image/upload/v1/soyirilabs/blog/web-dev',
        category: 'Technology',
        tags: ['web development', 'trends', 'technology'],
        author: 'Soyiri Labs',
        publishedAt: new Date('2024-01-15'),
        readingTime: 5,
        status: 'published',
        seoTitle: 'The Future of Web Development in 2024 | Soyiri Labs',
        seoDescription: 'Explore the key trends shaping web development in 2024, including AI, edge computing, and WebAssembly.',
      },
      {
        title: 'Building Scalable APIs with Node.js',
        slug: 'building-scalable-apis-nodejs',
        excerpt: 'Learn best practices for designing and building high-performance APIs using Node.js and Express.',
        content: `# Building Scalable APIs with Node.js\n\nNode.js has become a go-to choice for building backend APIs. Here are the best practices we follow at Soyiri Labs.\n\n## Architecture Patterns\n\nA well-structured API starts with a solid architecture. We recommend using a layered approach with clear separation of concerns.\n\n## Performance Optimization\n\nFrom database query optimization to caching strategies, several techniques can dramatically improve API performance.\n\n## Security Best Practices\n\nSecurity should never be an afterthought. Implement proper authentication, input validation, and rate limiting from the start.`,
        coverImage: 'https://res.cloudinary.com/demo/image/upload/v1/soyirilabs/blog/api',
        category: 'Engineering',
        tags: ['node.js', 'api', 'backend', 'scalability'],
        author: 'Soyiri Labs',
        publishedAt: new Date('2024-02-20'),
        readingTime: 7,
        status: 'published',
      },
      {
        title: 'Designing for Accessibility: A Practical Guide',
        slug: 'designing-for-accessibility-guide',
        excerpt: 'Why accessibility matters in web design and how to implement inclusive design practices.',
        content: `# Designing for Accessibility: A Practical Guide\n\nAccessibility isn't just a nice-to-have — it's essential for creating products that everyone can use.\n\n## Why Accessibility Matters\n\nOver 1 billion people worldwide have some form of disability. By designing for accessibility, we ensure our products serve everyone.\n\n## Key Principles\n\nFollow the POUR principles: Perceivable, Operable, Understandable, and Robust.\n\n## Practical Tips\n\n- Use semantic HTML\n- Ensure sufficient color contrast\n- Provide alternative text for images\n- Support keyboard navigation\n- Test with screen readers`,
        coverImage: 'https://res.cloudinary.com/demo/image/upload/v1/soyirilabs/blog/accessibility',
        category: 'Design',
        tags: ['accessibility', 'design', 'ux', 'inclusive design'],
        author: 'Soyiri Labs',
        publishedAt: new Date('2024-03-10'),
        readingTime: 6,
        status: 'published',
      },
    ];

    await BlogPost.insertMany(posts);
    console.log(`${posts.length} blog posts seeded`);
  }

  console.log('Database seeding completed successfully!');
};

export default seedData;
