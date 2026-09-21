import { defineCollection, z } from 'astro:content';

const services = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.enum(['bathroom', 'kitchen']),
    priceFrom: z.number().optional(),
    priceLabel: z.string(),
    duration: z.string(),
    shortDescription: z.string(),
    includes: z.array(z.string()),
    image: z.string(),
    imageAlt: z.string(),
    featured: z.boolean().default(false),
    order: z.number(),
  }),
});

const testimonials = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    text: z.string(),
    rating: z.number().min(1).max(5),
    service: z.string().optional(),
    showOnHome: z.boolean().default(false),
    order: z.number().default(99),
  }),
});

const faq = defineCollection({
  type: 'content',
  schema: z.object({
    question: z.string(),
    category: z.string(),
    order: z.number(),
  }),
});

const portfolio = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    location: z.string(),
    serviceType: z.string(),
    image: z.string(),
    imageAlt: z.string(),
    description: z.string(),
    order: z.number(),
  }),
});

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    heroBadge: z.string().optional(),
    heroHeading: z.string().optional(),
    heroSubheading: z.string().optional(),
    storyHeading: z.string().optional(),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['bathroom-remodeling', 'kitchen-remodeling']),
    pubDate: z.coerce.date(),
    author: z.string().default('Alex Kissel'),
    keywords: z.array(z.string()).default([]),
    image: z.string(),
    imageAlt: z.string(),
    faq: z
      .array(
        z.object({
          q: z.string(),
          a: z.string(),
        }),
      )
      .optional(),
  }),
});

export const collections = { services, testimonials, faq, portfolio, pages, blog };
