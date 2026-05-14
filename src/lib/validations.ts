import { z } from "zod";

// ─── Sub-schemas ─────────────────────────────────────────────

const imageSetSchema = z.object({
  essential: z.string().default(""),
  premium: z.string().default(""),
});

const exteriorColorSchema = z.object({
  name: z.string().min(1, "Color name is required"),
  colorCode: z.string().min(1, "Color code is required"),
  images: z.object({
    front: imageSetSchema.default({ essential: "", premium: "" }),
    side: imageSetSchema.default({ essential: "", premium: "" }),
  }).default({}),
});

const interiorColorSchema = z.object({
  name: z.string().min(1, "Color name is required"),
  image: z.string().default(""),
});

const showcaseFeatureSchema = z.object({
  image: z.string().default(""),
  title: z.string().default(""),
  description: z.string().default(""),
});

const specSchema = z.object({
  value: z.string().default(""),
  unit: z.string().default(""),
  label: z.string().default(""),
});

const featureSchema = z.object({
  title: z.string().default(""),
  description: z.string().default(""),
});

const modelSchema = z.object({
  name: z.string().default(""),
  specs: z.array(z.string()).default([]),
});

// ─── Main Car Schema ─────────────────────────────────────────

export const carFormSchema = z.object({
  carId: z.string().min(1, "Car ID is required").regex(/^[a-zA-Z0-9-_]+$/, "Car ID must be alphanumeric with hyphens/underscores"),
  name: z.string().min(1, "Car name is required"),
  subtitle: z.string().default(""),
  status: z.string().default("draft"),
  type: z.string().default(""),
  heroImage: z.string().default(""),
  bannerImage: z.string().default(""),
  collageImages: z.array(z.string()).default([]),
  showcaseImages: z.array(z.string()).default([]),
  videos: z.array(z.string()).default([]),
  showcaseFeatures: z.array(showcaseFeatureSchema).default([]),
  exteriorColors: z.array(exteriorColorSchema).default([]),
  interiorColors: z.array(interiorColorSchema).default([]),
  specs: z.array(specSchema).default([]),
  overview: z.object({
    heading: z.string().default(""),
    body: z.string().default(""),
  }).default({}),
  design: z.object({
    title: z.string().default(""),
    features: z.array(featureSchema).default([]),
  }).default({}),
  technology: z.object({
    title: z.string().default(""),
    features: z.array(featureSchema).default([]),
  }).default({}),
  styling: z.object({
    title: z.string().default(""),
    subtitle: z.string().default(""),
  }).default({}),
  safety: z.object({
    features: z.array(featureSchema).default([]),
  }).default({}),
  storage: z.object({
    boot: z.string().default(""),
    expanded: z.string().default(""),
  }).default({}),
  models: z.array(modelSchema).default([]),
  moreInfo: z.object({
    handbook: z.string().default(""),
    testDrive: z.string().default(""),
  }).default({}),
  specifications: z.array(z.array(z.string())).default([]),
  features: z.array(z.string()).default([]),
});

export type CarFormValues = z.infer<typeof carFormSchema>;
