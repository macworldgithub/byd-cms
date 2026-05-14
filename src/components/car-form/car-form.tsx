"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { carFormSchema, type CarFormValues } from "@/lib/validations";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

import {
  BasicInfoSection,
  ImagesSection,
  StringArraySection,
  ShowcaseFeaturesSection,
  SpecsSection,
  OverviewSection,
  StylingSection,
  StorageSection,
  MoreInfoSection,
} from "./sections-basic";

import {
  FeatureListSection,
  ExteriorColorsSection,
  InteriorColorsSection,
  ModelsSection,
  SpecificationsSection,
} from "./sections-advanced";

import type { Car } from "@/types/car";

interface CarFormProps {
  initialData?: Car;
  onSubmit: (data: CarFormValues) => Promise<void>;
  isSubmitting: boolean;
  mode: "create" | "edit";
}

const defaultValues: CarFormValues = {
  carId: "",
  name: "",
  subtitle: "",
  status: "draft",
  type: "",
  heroImage: "",
  bannerImage: "",
  collageImages: [],
  showcaseImages: [],
  videos: [],
  showcaseFeatures: [],
  exteriorColors: [],
  interiorColors: [],
  specs: [],
  overview: { heading: "", body: "" },
  design: { title: "", features: [] },
  technology: { title: "", features: [] },
  styling: { title: "", subtitle: "" },
  safety: { features: [] },
  storage: { boot: "", expanded: "" },
  models: [],
  moreInfo: { handbook: "", testDrive: "" },
  specifications: [],
  features: [],
};

export function CarForm({ initialData, onSubmit, isSubmitting, mode }: CarFormProps) {
  const form = useForm<CarFormValues>({
    resolver: zodResolver(carFormSchema),
    defaultValues: initialData
      ? {
          carId: initialData.carId || "",
          name: initialData.name || "",
          subtitle: initialData.subtitle || "",
          status: initialData.status || "draft",
          type: initialData.type || "",
          heroImage: initialData.heroImage || "",
          bannerImage: initialData.bannerImage || "",
          collageImages: initialData.collageImages || [],
          showcaseImages: initialData.showcaseImages || [],
          videos: initialData.videos || [],
          showcaseFeatures: initialData.showcaseFeatures || [],
          exteriorColors: initialData.exteriorColors || [],
          interiorColors: initialData.interiorColors || [],
          specs: initialData.specs || [],
          overview: initialData.overview || { heading: "", body: "" },
          design: initialData.design || { title: "", features: [] },
          technology: initialData.technology || { title: "", features: [] },
          styling: initialData.styling || { title: "", subtitle: "" },
          safety: initialData.safety || { features: [] },
          storage: initialData.storage || { boot: "", expanded: "" },
          models: initialData.models || [],
          moreInfo: initialData.moreInfo || { handbook: "", testDrive: "" },
          specifications: initialData.specifications || [],
          features: initialData.features || [],
        }
      : defaultValues,
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    await onSubmit(data);
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/cars">
            <button type="button" className="cms-btn cms-btn-ghost cms-btn-icon">
              <ArrowLeft style={{ height: 16, width: 16 }} />
            </button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              {mode === "create" ? "Add New Car" : `Edit: ${initialData?.name || ""}`}
            </h1>
            <p className="text-sm text-zinc-500 mt-0.5">
              {mode === "create"
                ? "Fill in the details to add a new vehicle"
                : "Update the vehicle information"}
            </p>
          </div>
        </div>
        <Button type="submit" disabled={isSubmitting} className="gap-2">
          {isSubmitting ? (
            <>
              <Spinner size="sm" /> Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" /> {mode === "create" ? "Create Car" : "Save Changes"}
            </>
          )}
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="basic" className="w-full">
        <div className="overflow-x-auto pb-2">
          <TabsList className="flex-wrap">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="specs">Specs</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="models">Models</TabsTrigger>
            <TabsTrigger value="extra">Extra</TabsTrigger>
          </TabsList>
        </div>

        {/* Basic */}
        <TabsContent value="basic" className="space-y-6">
          <BasicInfoSection form={form} />
          <ImagesSection form={form} />
          <OverviewSection form={form} />
        </TabsContent>

        {/* Media */}
        <TabsContent value="media" className="space-y-6">
          <StringArraySection form={form} name="collageImages" title="Collage Images" placeholder="Image URL" />
          <StringArraySection form={form} name="showcaseImages" title="Showcase Images" placeholder="Image URL" />
          <StringArraySection form={form} name="videos" title="Videos" placeholder="Video URL" />
          <ShowcaseFeaturesSection form={form} />
        </TabsContent>

        {/* Colors */}
        <TabsContent value="colors" className="space-y-6">
          <ExteriorColorsSection form={form} />
          <InteriorColorsSection form={form} />
        </TabsContent>

        {/* Specs */}
        <TabsContent value="specs" className="space-y-6">
          <SpecsSection form={form} />
          <SpecificationsSection form={form} />
        </TabsContent>

        {/* Content */}
        <TabsContent value="content" className="space-y-6">
          <FeatureListSection form={form} parentKey="design" title="Design" />
          <FeatureListSection form={form} parentKey="technology" title="Technology" />
          <FeatureListSection form={form} parentKey="safety" title="Safety" />
          <StylingSection form={form} />
        </TabsContent>

        {/* Models */}
        <TabsContent value="models" className="space-y-6">
          <ModelsSection form={form} />
        </TabsContent>

        {/* Extra */}
        <TabsContent value="extra" className="space-y-6">
          <StorageSection form={form} />
          <MoreInfoSection form={form} />
          <StringArraySection form={form} name="features" title="Features" placeholder="Feature description" />
        </TabsContent>
      </Tabs>

      {/* Bottom Submit */}
      <div className="flex justify-end pt-4 border-t border-white/[0.06]">
        <Button type="submit" disabled={isSubmitting} className="gap-2">
          {isSubmitting ? (
            <>
              <Spinner size="sm" /> Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" /> {mode === "create" ? "Create Car" : "Save Changes"}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
