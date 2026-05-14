// ─── Sub-types ───────────────────────────────────────────────

export interface ImageSet {
  essential: string;
  premium: string;
}

export interface ExteriorColor {
  name: string;
  colorCode: string;
  images: {
    front: ImageSet;
    side: ImageSet;
  };
}

export interface InteriorColor {
  name: string;
  image: string;
}

export interface ShowcaseFeature {
  image: string;
  title: string;
  description: string;
}

export interface Spec {
  value: string;
  unit: string;
  label: string;
}

export interface Feature {
  title: string;
  description: string;
}

export interface CarModel {
  name: string;
  specs: string[];
}

// ─── Main Car Type ───────────────────────────────────────────

export interface Car {
  _id?: string;
  id?: string;
  carId: string;
  name: string;
  subtitle: string;
  status: string;
  type: string;
  heroImage: string;
  bannerImage: string;
  collageImages: string[];
  showcaseImages: string[];
  videos: string[];
  showcaseFeatures: ShowcaseFeature[];
  exteriorColors: ExteriorColor[];
  interiorColors: InteriorColor[];
  specs: Spec[];
  overview: {
    heading: string;
    body: string;
  };
  design: {
    title: string;
    features: Feature[];
  };
  technology: {
    title: string;
    features: Feature[];
  };
  styling: {
    title: string;
    subtitle: string;
  };
  safety: {
    features: Feature[];
  };
  storage: {
    boot: string;
    expanded: string;
  };
  models: CarModel[];
  moreInfo: {
    handbook: string;
    testDrive: string;
  };
  specifications: string[][];
  features: string[];
  createdAt?: string;
  updatedAt?: string;
}

// ─── Form Data (for create/update) ──────────────────────────

export type CarFormData = Omit<Car, '_id' | 'id' | 'createdAt' | 'updatedAt'>;

// ─── API Response Types ─────────────────────────────────────

export interface ApiError {
  message: string;
  status?: number;
}

export interface DeleteResponse {
  message: string;
}
