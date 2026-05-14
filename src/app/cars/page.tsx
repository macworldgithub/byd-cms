"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useCars, useDeleteCar } from "@/hooks/use-cars";
import { formatDate, getImageUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { PageLoader } from "@/components/ui/spinner";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Car,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { toast } from "sonner";

const ITEMS_PER_PAGE = 10;

export default function CarsPage() {
  const { data: cars, isLoading, error } = useCars();
  const deleteCar = useDeleteCar();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    name: string;
  } | null>(null);

  // Unique types and statuses for filters
  const types = useMemo(() => {
    if (!cars) return [];
    return [...new Set(cars.map((c) => c.type).filter(Boolean))];
  }, [cars]);

  const statuses = useMemo(() => {
    if (!cars) return [];
    return [...new Set(cars.map((c) => c.status).filter(Boolean))];
  }, [cars]);

  // Filtered data
  const filtered = useMemo(() => {
    if (!cars) return [];
    return cars.filter((car) => {
      const matchesSearch =
        !search ||
        car.name.toLowerCase().includes(search.toLowerCase()) ||
        car.carId.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || car.status === statusFilter;
      const matchesType = typeFilter === "all" || car.type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [cars, search, statusFilter, typeFilter]);

  // Pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteCar.mutateAsync(deleteTarget.id);
      toast.success(`"${deleteTarget.name}" deleted successfully`);
      setDeleteTarget(null);
    } catch {
      toast.error("Failed to delete car");
    }
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setTypeFilter("all");
    setPage(1);
  };

  const hasActiveFilters =
    search || statusFilter !== "all" || typeFilter !== "all";

  if (isLoading) return <PageLoader />;

  if (error) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 400, textAlign: "center" }}>
        <div style={{ height: 64, width: 64, borderRadius: 16, background: "rgba(239, 68, 68, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
          <Car style={{ height: 32, width: 32, color: "#f87171" }} />
        </div>
        <p style={{ fontSize: 14, fontWeight: 500, color: "#f87171" }}>Failed to load cars</p>
        <p style={{ fontSize: 12, color: "var(--color-text-muted)", marginTop: 4 }}>
          Please check your API connection and try again
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Header */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }} className="sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "white", letterSpacing: "-0.02em" }}>Cars</h1>
          <p style={{ fontSize: 14, color: "var(--color-text-muted)", marginTop: 4 }}>
            Manage your vehicle inventory ({cars?.length ?? 0} total)
          </p>
        </div>
        <Link href="/cars/new">
          <Button className="cms-btn cms-btn-primary">
            <Plus style={{ height: 16, width: 16 }} />
            Add New Car
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="cms-card">
        <div className="cms-card-body" style={{ padding: "1rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }} className="sm:flex-row">
            <div style={{ position: "relative", flex: 1 }}>
              <Search style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", height: 16, width: 16, color: "var(--color-text-dim)" }} />
              <Input
                placeholder="Search by name or car ID..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                style={{ paddingLeft: 36 }}
              />
            </div>
            <div style={{ width: "100%" }} className="sm:w-[160px]">
              <Select
                value={statusFilter}
                onValueChange={(v) => {
                  setStatusFilter(v);
                  setPage(1);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  {statuses.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div style={{ width: "100%" }} className="sm:w-[160px]">
              <Select
                value={typeFilter}
                onValueChange={(v) => {
                  setTypeFilter(v);
                  setPage(1);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {types.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="icon"
                onClick={clearFilters}
                style={{ flexShrink: 0 }}
              >
                <X style={{ height: 16, width: 16 }} />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="cms-card">
        <div style={{ overflowX: "auto" }}>
          {paginated.length === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 0", textAlign: "center" }}>
              <div className="empty-state-icon">
                <Car style={{ height: 32, width: 32, color: "var(--color-text-dim)" }} />
              </div>
              {hasActiveFilters ? (
                <>
                  <p style={{ fontSize: 14, fontWeight: 500, color: "var(--color-text-secondary)" }}>
                    No cars match your filters
                  </p>
                  <p style={{ fontSize: 12, color: "var(--color-text-dim)", marginTop: 4 }}>
                    Try adjusting your search or filter criteria
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    style={{ marginTop: 16 }}
                    onClick={clearFilters}
                  >
                    Clear Filters
                  </Button>
                </>
              ) : (
                <>
                  <p style={{ fontSize: 14, fontWeight: 500, color: "var(--color-text-secondary)" }}>
                    No cars yet
                  </p>
                  <p style={{ fontSize: 12, color: "var(--color-text-dim)", marginTop: 4 }}>
                    Add your first car to get started
                  </p>
                  <Link href="/cars/new" style={{ marginTop: 16 }}>
                    <Button size="sm">
                      <Plus style={{ height: 14, width: 14, marginRight: 8 }} />
                      Add Car
                    </Button>
                  </Link>
                </>
              )}
            </div>
          ) : (
            <table className="cms-table">
              <thead>
                <tr>
                  <th>Car</th>
                  <th className="hidden md:table-cell">Car ID</th>
                  <th className="hidden lg:table-cell">Type</th>
                  <th>Status</th>
                  <th className="hidden sm:table-cell">Created</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((car) => (
                  <tr key={car._id || car.carId}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div className="image-preview" style={{ height: 40, width: 56, flexShrink: 0 }}>
                          {car.heroImage ? (
                            <img src={getImageUrl(car.heroImage)} alt={car.name} />
                          ) : (
                            <div style={{ height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <Car style={{ height: 16, width: 16, color: "var(--color-text-dim)" }} />
                            </div>
                          )}
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <p style={{ fontSize: 14, fontWeight: 500, color: "white", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 200 }}>
                            {car.name}
                          </p>
                          {car.subtitle && (
                            <p style={{ fontSize: 12, color: "var(--color-text-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 200 }}>
                              {car.subtitle}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="hidden md:table-cell">
                      <code style={{ fontSize: 12, color: "var(--color-text-secondary)", background: "var(--color-surface-2)", padding: "2px 6px", borderRadius: 4, fontFamily: "monospace" }}>
                        {car.carId}
                      </code>
                    </td>
                    <td className="hidden lg:table-cell">
                      <span style={{ fontSize: 14, color: "var(--color-text-secondary)" }}>
                        {car.type || "—"}
                      </span>
                    </td>
                    <td>
                      <span className={`cms-badge ${
                        car.status?.toLowerCase() === "active" || car.status?.toLowerCase() === "published"
                          ? "cms-badge-success"
                          : car.status?.toLowerCase() === "draft"
                          ? "cms-badge-warning"
                          : "cms-badge-default"
                      }`}>
                        {car.status || "draft"}
                      </span>
                    </td>
                    <td className="hidden sm:table-cell">
                      <span style={{ fontSize: 12, color: "var(--color-text-muted)" }}>
                        {car.createdAt ? formatDate(car.createdAt) : "—"}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 4 }}>
                        <Link href={`/cars/${car.carId}/edit`}>
                          <button className="cms-btn cms-btn-ghost cms-btn-icon" style={{ height: 32, width: 32 }}>
                            <Pencil style={{ height: 14, width: 14 }} />
                          </button>
                        </Link>
                        <button
                          className="cms-btn cms-btn-ghost cms-btn-icon"
                          style={{ height: 32, width: 32, color: "#f87171" }}
                          onClick={() => setDeleteTarget({ id: car.carId, name: car.name })}
                        >
                          <Trash2 style={{ height: 14, width: 14 }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.5rem", borderTop: "1px solid var(--color-border-dim)" }}>
            <p style={{ fontSize: 12, color: "var(--color-text-muted)" }}>
              Showing {(page - 1) * ITEMS_PER_PAGE + 1}–
              {Math.min(page * ITEMS_PER_PAGE, filtered.length)} of{" "}
              {filtered.length}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <button
                className="pagination-btn"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                <ChevronLeft style={{ height: 16, width: 16 }} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  className={`pagination-btn ${p === page ? "active" : ""}`}
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              ))}
              <button
                className="pagination-btn"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                <ChevronRight style={{ height: 16, width: 16 }} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={() => setDeleteTarget(null)}
      >
        <AlertDialogContent className="cms-dialog-content">
          <AlertDialogHeader>
            <AlertDialogTitle style={{ fontSize: 18, fontWeight: 600, color: "white", marginBottom: 8 }}>Delete Car</AlertDialogTitle>
            <AlertDialogDescription style={{ fontSize: 14, color: "var(--color-text-secondary)" }}>
              Are you sure you want to delete{" "}
              <span style={{ color: "white", fontWeight: 500 }}>
                &ldquo;{deleteTarget?.name}&rdquo;
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter style={{ marginTop: 24, display: "flex", justifyContent: "flex-end", gap: 12 }}>
            <AlertDialogCancel asChild>
              <button className="cms-btn cms-btn-outline">Cancel</button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <button
                className="cms-btn cms-btn-danger"
                onClick={handleDelete}
                disabled={deleteCar.isPending}
              >
                {deleteCar.isPending ? "Deleting..." : "Delete"}
              </button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
