"use client";

import { useFieldArray, type UseFormReturn } from "react-hook-form";
import type { CarFormValues } from "@/lib/validations";
import { Plus, Trash2 } from "lucide-react";
import { getImageUrl } from "@/lib/utils";

interface SectionProps {
  form: UseFormReturn<CarFormValues>;
}

/* ── Feature List Section (Design / Technology / Safety) ──── */
export function FeatureListSection({ form, parentKey, title }: SectionProps & { parentKey: "design" | "technology" | "safety"; title: string }) {
  const hasTitle = parentKey !== "safety";
  const fieldName = `${parentKey}.features` as const;
  const { fields, append, remove } = useFieldArray({ control: form.control, name: fieldName as never });

  return (
    <div className="cms-card">
      <div className="cms-card-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: "white" }}>{title}</h3>
        <button type="button" className="cms-btn cms-btn-outline cms-btn-sm" onClick={() => append({ title: "", description: "" } as never)}>
          <Plus style={{ height: 14, width: 14 }} /> Add Feature
        </button>
      </div>
      <div className="cms-card-body" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {hasTitle && (
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-secondary)" }}>Section Title</label>
            <input className="cms-input" placeholder={`${title} section title`} {...form.register(`${parentKey}.title` as never)} />
          </div>
        )}
        {fields.length === 0 && <p style={{ fontSize: 12, color: "var(--color-text-dim)", textAlign: "center", padding: "1rem 0" }}>No features added</p>}
        {fields.map((field, index) => (
          <div key={field.id} className="form-section-item" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: "var(--color-text-muted)" }}>Feature {index + 1}</span>
              <button type="button" className="cms-btn cms-btn-ghost cms-btn-icon" style={{ height: 28, width: 28, color: "var(--color-text-dim)" }} onClick={() => remove(index)}>
                <Trash2 style={{ height: 12, width: 12 }} />
              </button>
            </div>
            <input className="cms-input" placeholder="Feature title" {...form.register(`${parentKey}.features.${index}.title` as never)} />
            <textarea className="cms-input cms-textarea" style={{ minHeight: 60 }} placeholder="Feature description" {...form.register(`${parentKey}.features.${index}.description` as never)} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Exterior Colors ───────────────────────────────────────── */
export function ExteriorColorsSection({ form }: SectionProps) {
  const { fields, append, remove } = useFieldArray({ control: form.control, name: "exteriorColors" });

  return (
    <div className="cms-card">
      <div className="cms-card-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: "white" }}>Exterior Colors</h3>
        <button type="button" className="cms-btn cms-btn-outline cms-btn-sm" onClick={() => append({
          name: "", colorCode: "#000000",
          images: { front: { essential: "", premium: "" }, side: { essential: "", premium: "" } }
        })}>
          <Plus style={{ height: 14, width: 14 }} /> Add Color
        </button>
      </div>
      <div className="cms-card-body" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {fields.length === 0 && <p style={{ fontSize: 12, color: "var(--color-text-dim)", textAlign: "center", padding: "1rem 0" }}>No exterior colors added</p>}
        {fields.map((field, index) => (
          <div key={field.id} className="form-section-item" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  className="color-swatch"
                  style={{ backgroundColor: form.watch(`exteriorColors.${index}.colorCode`) || "#000" }}
                />
                <span style={{ fontSize: 14, fontWeight: 500, color: "var(--color-text-primary)" }}>
                  {form.watch(`exteriorColors.${index}.name`) || `Color ${index + 1}`}
                </span>
              </div>
              <button type="button" className="cms-btn cms-btn-ghost cms-btn-icon" style={{ height: 28, width: 28, color: "var(--color-text-dim)" }} onClick={() => remove(index)}>
                <Trash2 style={{ height: 12, width: 12 }} />
              </button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>Color Name</label>
                <input className="cms-input" placeholder="e.g. Arctic White" {...form.register(`exteriorColors.${index}.name`)} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>Color Code</label>
                <div style={{ display: "flex", gap: 8 }}>
                  <input type="color" style={{ height: 40, width: 40, padding: 0, border: "1px solid var(--color-border-medium)", borderRadius: 8, cursor: "pointer", background: "transparent" }} {...form.register(`exteriorColors.${index}.colorCode`)} />
                  <input className="cms-input" placeholder="#FFFFFF" {...form.register(`exteriorColors.${index}.colorCode`)} />
                </div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Front Images</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <label style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>Essential</label>
                  <input className="cms-input" placeholder="Front essential URL" {...form.register(`exteriorColors.${index}.images.front.essential`)} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <label style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>Premium</label>
                  <input className="cms-input" placeholder="Front premium URL" {...form.register(`exteriorColors.${index}.images.front.premium`)} />
                </div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Side Images</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <label style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>Essential</label>
                  <input className="cms-input" placeholder="Side essential URL" {...form.register(`exteriorColors.${index}.images.side.essential`)} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <label style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>Premium</label>
                  <input className="cms-input" placeholder="Side premium URL" {...form.register(`exteriorColors.${index}.images.side.premium`)} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Interior Colors ───────────────────────────────────────── */
export function InteriorColorsSection({ form }: SectionProps) {
  const { fields, append, remove } = useFieldArray({ control: form.control, name: "interiorColors" });

  return (
    <div className="cms-card">
      <div className="cms-card-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: "white" }}>Interior Colors</h3>
        <button type="button" className="cms-btn cms-btn-outline cms-btn-sm" onClick={() => append({ name: "", image: "" })}>
          <Plus style={{ height: 14, width: 14 }} /> Add Color
        </button>
      </div>
      <div className="cms-card-body" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {fields.length === 0 && <p style={{ fontSize: 12, color: "var(--color-text-dim)", textAlign: "center", padding: "1rem 0" }}>No interior colors added</p>}
        {fields.map((field, index) => (
          <div key={field.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input className="cms-input" style={{ width: 160 }} placeholder="Color name" {...form.register(`interiorColors.${index}.name`)} />
            <input className="cms-input" style={{ flex: 1 }} placeholder="Image URL" {...form.register(`interiorColors.${index}.image`)} />
            <button type="button" className="cms-btn cms-btn-ghost cms-btn-icon" style={{ color: "var(--color-text-dim)" }} onClick={() => remove(index)}>
              <Trash2 style={{ height: 14, width: 14 }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Models ────────────────────────────────────────────────── */
export function ModelsSection({ form }: SectionProps) {
  const { fields, append, remove } = useFieldArray({ control: form.control, name: "models" });

  return (
    <div className="cms-card">
      <div className="cms-card-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: "white" }}>Models</h3>
        <button type="button" className="cms-btn cms-btn-outline cms-btn-sm" onClick={() => append({ name: "", specs: [] })}>
          <Plus style={{ height: 14, width: 14 }} /> Add Model
        </button>
      </div>
      <div className="cms-card-body" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {fields.length === 0 && <p style={{ fontSize: 12, color: "var(--color-text-dim)", textAlign: "center", padding: "1rem 0" }}>No models added</p>}
        {fields.map((field, index) => (
          <ModelItem key={field.id} form={form} index={index} onRemove={() => remove(index)} />
        ))}
      </div>
    </div>
  );
}

function ModelItem({ form, index, onRemove }: { form: UseFormReturn<CarFormValues>; index: number; onRemove: () => void }) {
  const { fields: specFields, append: appendSpec, remove: removeSpec } = useFieldArray({
    control: form.control,
    name: `models.${index}.specs` as never,
  });

  return (
    <div className="form-section-item" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: "var(--color-text-muted)" }}>Model {index + 1}</span>
        <button type="button" className="cms-btn cms-btn-ghost cms-btn-icon" style={{ height: 28, width: 28, color: "var(--color-text-dim)" }} onClick={onRemove}>
          <Trash2 style={{ height: 12, width: 12 }} />
        </button>
      </div>
      <input className="cms-input" placeholder="Model name" {...form.register(`models.${index}.name`)} />
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <label style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>Specs</label>
          <button type="button" className="cms-btn cms-btn-ghost" style={{ height: 24, padding: "0 0.5rem", fontSize: 10, gap: 4 }} onClick={() => appendSpec("" as never)}>
            <Plus style={{ height: 12, width: 12 }} /> Add Spec
          </button>
        </div>
        {specFields.map((sf, si) => (
          <div key={sf.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input className="cms-input" placeholder="Spec value" {...form.register(`models.${index}.specs.${si}` as never)} />
            <button type="button" className="cms-btn cms-btn-ghost cms-btn-icon" style={{ height: 32, width: 32, color: "var(--color-text-dim)" }} onClick={() => removeSpec(si)}>
              <Trash2 style={{ height: 12, width: 12 }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Specifications (2D Array) ─────────────────────────────── */
export function SpecificationsSection({ form }: SectionProps) {
  const { fields, append, remove } = useFieldArray({ control: form.control, name: "specifications" as never });

  return (
    <div className="cms-card">
      <div className="cms-card-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: "white" }}>Specifications Table</h3>
        <button type="button" className="cms-btn cms-btn-outline cms-btn-sm" onClick={() => append(["", ""] as never)}>
          <Plus style={{ height: 14, width: 14 }} /> Add Row
        </button>
      </div>
      <div className="cms-card-body" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {fields.length === 0 && <p style={{ fontSize: 12, color: "var(--color-text-dim)", textAlign: "center", padding: "1rem 0" }}>No specification rows added</p>}
        {fields.map((field, index) => (
          <SpecificationRow key={field.id} form={form} index={index} onRemove={() => remove(index)} />
        ))}
      </div>
    </div>
  );
}

function SpecificationRow({ form, index, onRemove }: { form: UseFormReturn<CarFormValues>; index: number; onRemove: () => void }) {
  const { fields: colFields, append: appendCol, remove: removeCol } = useFieldArray({
    control: form.control,
    name: `specifications.${index}` as never,
  });

  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
      <div style={{ flex: 1, display: "flex", flexWrap: "wrap", gap: 8 }}>
        {colFields.map((cf, ci) => (
          <div key={cf.id} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <input className="cms-input" style={{ width: 128 }} placeholder={`Col ${ci + 1}`} {...form.register(`specifications.${index}.${ci}` as never)} />
            {colFields.length > 1 && (
              <button type="button" onClick={() => removeCol(ci)} style={{ color: "var(--color-text-dim)", background: "transparent", border: "none", cursor: "pointer" }}>
                <Trash2 style={{ height: 12, width: 12 }} />
              </button>
            )}
          </div>
        ))}
        <button type="button" className="cms-btn cms-btn-ghost cms-btn-sm" onClick={() => appendCol("" as never)}>
          + Col
        </button>
      </div>
      <button type="button" className="cms-btn cms-btn-ghost cms-btn-icon" style={{ color: "var(--color-text-dim)", flexShrink: 0 }} onClick={onRemove}>
        <Trash2 style={{ height: 14, width: 14 }} />
      </button>
    </div>
  );
}
