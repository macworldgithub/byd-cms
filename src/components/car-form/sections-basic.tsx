"use client";

import { useFieldArray, type UseFormReturn } from "react-hook-form";
import type { CarFormValues } from "@/lib/validations";
import { Plus, Trash2, ImageIcon } from "lucide-react";
import { getImageUrl } from "@/lib/utils";

interface SectionProps {
  form: UseFormReturn<CarFormValues>;
}

/* ── Image Preview ─────────────────────────────────────────── */
function ImagePreview({ url }: { url: string }) {
  if (!url) return null;
  return (
    <div className="image-preview" style={{ height: 96, width: 128, marginTop: 4 }}>
      <img src={getImageUrl(url)} alt="Preview" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
    </div>
  );
}

/* ── Basic Info ─────────────────────────────────────────────── */
export function BasicInfoSection({ form }: SectionProps) {
  const { register, formState: { errors } } = form;
  return (
    <div className="cms-card">
      <div className="cms-card-header">
        <h3 style={{ fontSize: 16, fontWeight: 600, color: "white" }}>Basic Information</h3>
      </div>
      <div className="cms-card-body" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-secondary)" }}>Car ID *</label>
            <input className="cms-input" placeholder="e.g. byd-seal" {...register("carId")} />
            {errors.carId && <p style={{ fontSize: 12, color: "#f87171" }}>{errors.carId.message}</p>}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-secondary)" }}>Name *</label>
            <input className="cms-input" placeholder="e.g. BYD Seal" {...register("name")} />
            {errors.name && <p style={{ fontSize: 12, color: "#f87171" }}>{errors.name.message}</p>}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-secondary)" }}>Subtitle</label>
            <input className="cms-input" placeholder="Short description" {...register("subtitle")} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-secondary)" }}>Type</label>
            <input className="cms-input" placeholder="e.g. Sedan, SUV, EV" {...register("type")} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-secondary)" }}>Status</label>
            <select className="cms-input cms-select" {...register("status")}>
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Hero & Banner Images ──────────────────────────────────── */
export function ImagesSection({ form }: SectionProps) {
  const { register, watch } = form;
  const heroImage = watch("heroImage");
  const bannerImage = watch("bannerImage");

  return (
    <div className="cms-card">
      <div className="cms-card-header">
        <h3 style={{ fontSize: 16, fontWeight: 600, color: "white" }}>Hero & Banner Images</h3>
      </div>
      <div className="cms-card-body">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-secondary)" }}>Hero Image URL</label>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <ImageIcon style={{ height: 16, width: 16, color: "var(--color-text-dim)", flexShrink: 0 }} />
              <input className="cms-input" placeholder="https://..." {...register("heroImage")} />
            </div>
            <ImagePreview url={heroImage} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-secondary)" }}>Banner Image URL</label>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <ImageIcon style={{ height: 16, width: 16, color: "var(--color-text-dim)", flexShrink: 0 }} />
              <input className="cms-input" placeholder="https://..." {...register("bannerImage")} />
            </div>
            <ImagePreview url={bannerImage} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── String Array Field ────────────────────────────────────── */
export function StringArraySection({ form, name, title, placeholder }: SectionProps & { name: "collageImages" | "showcaseImages" | "videos" | "features"; title: string; placeholder: string }) {
  const { fields, append, remove } = useFieldArray({ control: form.control, name: name as never });
  const values = form.watch(name) || [];

  return (
    <div className="cms-card">
      <div className="cms-card-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: "white" }}>{title}</h3>
        <button type="button" className="cms-btn cms-btn-outline cms-btn-sm" onClick={() => append("" as never)}>
          <Plus style={{ height: 14, width: 14 }} /> Add
        </button>
      </div>
      <div className="cms-card-body" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {fields.length === 0 && (
          <p style={{ fontSize: 12, color: "var(--color-text-dim)", textAlign: "center", padding: "1rem 0" }}>No items added yet</p>
        )}
        {fields.map((field, index) => (
          <div key={field.id} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
              <input className="cms-input" placeholder={placeholder} {...form.register(`${name}.${index}` as never)} />
              {name !== "features" && values[index] && <ImagePreview url={values[index]} />}
            </div>
            <button type="button" className="cms-btn cms-btn-ghost cms-btn-icon" style={{ color: "var(--color-text-dim)" }} onClick={() => remove(index)}>
              <Trash2 style={{ height: 14, width: 14 }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Showcase Features ─────────────────────────────────────── */
export function ShowcaseFeaturesSection({ form }: SectionProps) {
  const { fields, append, remove } = useFieldArray({ control: form.control, name: "showcaseFeatures" });
  return (
    <div className="cms-card">
      <div className="cms-card-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: "white" }}>Showcase Features</h3>
        <button type="button" className="cms-btn cms-btn-outline cms-btn-sm" onClick={() => append({ image: "", title: "", description: "" })}>
          <Plus style={{ height: 14, width: 14 }} /> Add
        </button>
      </div>
      <div className="cms-card-body" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {fields.length === 0 && <p style={{ fontSize: 12, color: "var(--color-text-dim)", textAlign: "center", padding: "1rem 0" }}>No showcase features added</p>}
        {fields.map((field, index) => (
          <div key={field.id} className="form-section-item" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: "var(--color-text-muted)" }}>Feature {index + 1}</span>
              <button type="button" className="cms-btn cms-btn-ghost cms-btn-icon" style={{ height: 28, width: 28, color: "var(--color-text-dim)" }} onClick={() => remove(index)}>
                <Trash2 style={{ height: 12, width: 12 }} />
              </button>
            </div>
            <input className="cms-input" placeholder="Image URL" {...form.register(`showcaseFeatures.${index}.image`)} />
            <input className="cms-input" placeholder="Title" {...form.register(`showcaseFeatures.${index}.title`)} />
            <textarea className="cms-input cms-textarea" placeholder="Description" {...form.register(`showcaseFeatures.${index}.description`)} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Specs ──────────────────────────────────────────────────── */
export function SpecsSection({ form }: SectionProps) {
  const { fields, append, remove } = useFieldArray({ control: form.control, name: "specs" });
  return (
    <div className="cms-card">
      <div className="cms-card-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: "white" }}>Key Specs</h3>
        <button type="button" className="cms-btn cms-btn-outline cms-btn-sm" onClick={() => append({ value: "", unit: "", label: "" })}>
          <Plus style={{ height: 14, width: 14 }} /> Add
        </button>
      </div>
      <div className="cms-card-body" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {fields.length === 0 && <p style={{ fontSize: 12, color: "var(--color-text-dim)", textAlign: "center", padding: "1rem 0" }}>No specs added</p>}
        {fields.map((field, index) => (
          <div key={field.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input className="cms-input" style={{ width: 100 }} placeholder="Value" {...form.register(`specs.${index}.value`)} />
            <input className="cms-input" style={{ width: 80 }} placeholder="Unit" {...form.register(`specs.${index}.unit`)} />
            <input className="cms-input" style={{ flex: 1 }} placeholder="Label" {...form.register(`specs.${index}.label`)} />
            <button type="button" className="cms-btn cms-btn-ghost cms-btn-icon" style={{ color: "var(--color-text-dim)" }} onClick={() => remove(index)}>
              <Trash2 style={{ height: 14, width: 14 }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Overview ──────────────────────────────────────────────── */
export function OverviewSection({ form }: SectionProps) {
  const { register } = form;
  return (
    <div className="cms-card">
      <div className="cms-card-header">
        <h3 style={{ fontSize: 16, fontWeight: 600, color: "white" }}>Overview</h3>
      </div>
      <div className="cms-card-body" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-secondary)" }}>Heading</label>
          <input className="cms-input" placeholder="Overview heading" {...register("overview.heading")} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-secondary)" }}>Body</label>
          <textarea className="cms-input cms-textarea" style={{ minHeight: 100 }} placeholder="Overview body text" {...register("overview.body")} />
        </div>
      </div>
    </div>
  );
}

/* ── Styling Section ───────────────────────────────────────── */
export function StylingSection({ form }: SectionProps) {
  const { register } = form;
  return (
    <div className="cms-card">
      <div className="cms-card-header">
        <h3 style={{ fontSize: 16, fontWeight: 600, color: "white" }}>Styling</h3>
      </div>
      <div className="cms-card-body">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-secondary)" }}>Title</label>
            <input className="cms-input" placeholder="Styling title" {...register("styling.title")} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-secondary)" }}>Subtitle</label>
            <input className="cms-input" placeholder="Styling subtitle" {...register("styling.subtitle")} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Storage ───────────────────────────────────────────────── */
export function StorageSection({ form }: SectionProps) {
  const { register } = form;
  return (
    <div className="cms-card">
      <div className="cms-card-header">
        <h3 style={{ fontSize: 16, fontWeight: 600, color: "white" }}>Storage</h3>
      </div>
      <div className="cms-card-body">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-secondary)" }}>Boot</label>
            <input className="cms-input" placeholder="Boot capacity" {...register("storage.boot")} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-secondary)" }}>Expanded</label>
            <input className="cms-input" placeholder="Expanded capacity" {...register("storage.expanded")} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── More Info ─────────────────────────────────────────────── */
export function MoreInfoSection({ form }: SectionProps) {
  const { register } = form;
  return (
    <div className="cms-card">
      <div className="cms-card-header">
        <h3 style={{ fontSize: 16, fontWeight: 600, color: "white" }}>More Info</h3>
      </div>
      <div className="cms-card-body">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-secondary)" }}>Handbook URL</label>
            <input className="cms-input" placeholder="https://..." {...register("moreInfo.handbook")} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-secondary)" }}>Test Drive URL</label>
            <input className="cms-input" placeholder="https://..." {...register("moreInfo.testDrive")} />
          </div>
        </div>
      </div>
    </div>
  );
}
