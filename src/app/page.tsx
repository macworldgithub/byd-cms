"use client";

import { useCars } from "@/hooks/use-cars";
import { Car, BarChart3, TrendingUp, Clock, ChevronRight } from "lucide-react";
import { formatDate, getImageUrl } from "@/lib/utils";
import Link from "next/link";

export default function DashboardPage() {
  const { data: cars, isLoading } = useCars();

  const totalCars = cars?.length ?? 0;
  const activeCars =
    cars?.filter(
      (c) =>
        c.status?.toLowerCase() === "active" ||
        c.status?.toLowerCase() === "published"
    ).length ?? 0;
  const draftCars =
    cars?.filter((c) => c.status?.toLowerCase() === "draft").length ?? 0;
  const latestCar = cars?.[0];

  const stats = [
    {
      title: "Total Cars",
      value: totalCars,
      icon: Car,
      iconClass: "stat-icon-blue",
    },
    {
      title: "Active",
      value: activeCars,
      icon: TrendingUp,
      iconClass: "stat-icon-green",
    },
    {
      title: "Drafts",
      value: draftCars,
      icon: BarChart3,
      iconClass: "stat-icon-amber",
    },
    {
      title: "Latest Update",
      value: latestCar && latestCar.createdAt ? formatDate(latestCar.createdAt) : "—",
      icon: Clock,
      iconClass: "stat-icon-purple",
      isDate: true,
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "white", letterSpacing: "-0.02em" }}>
          Dashboard
        </h1>
        <p style={{ fontSize: 14, color: "var(--color-text-muted)", marginTop: 4 }}>
          Welcome to BYD Admin CMS. Manage your car inventory.
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
        {stats.map((stat) => (
          <div key={stat.title} className="cms-card" style={{ transition: "all 0.3s ease" }}>
            <div className="cms-card-body" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "1.25rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: "var(--color-text-dim)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  {stat.title}
                </p>
                {isLoading ? (
                  <div style={{ height: 32, width: 80, borderRadius: 8, background: "var(--color-surface-2)", animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" }} />
                ) : (
                  <p style={{ fontSize: stat.isDate ? 18 : 24, fontWeight: 700, color: "white" }}>
                    {stat.value}
                  </p>
                )}
              </div>
              <div className={stat.iconClass} style={{ display: "flex", height: 40, width: 40, alignItems: "center", justifyContent: "center", borderRadius: 12 }}>
                <stat.icon style={{ height: 20, width: 20 }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Cars */}
      <div className="cms-card">
        <div className="cms-card-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: "white" }}>Recent Cars</h2>
            <p style={{ fontSize: 12, color: "var(--color-text-muted)", marginTop: 2 }}>
              Latest vehicles added to the system
            </p>
          </div>
          <Link
            href="/cars"
            style={{ fontSize: 13, fontWeight: 500, color: "var(--color-accent-blue-text)", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}
          >
            View all <ChevronRight style={{ height: 14, width: 14 }} />
          </Link>
        </div>
        <div style={{ padding: 0 }}>
          {isLoading ? (
            <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: 12 }}>
              {[1, 2, 3].map((i) => (
                <div key={i} style={{ height: 56, borderRadius: 8, background: "var(--color-surface-2)", animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" }} />
              ))}
            </div>
          ) : !cars || cars.length === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "4rem 0", textAlign: "center" }}>
              <div className="empty-state-icon">
                <Car style={{ height: 32, width: 32, color: "var(--color-text-dim)" }} />
              </div>
              <p style={{ fontSize: 14, fontWeight: 500, color: "var(--color-text-secondary)" }}>No cars yet</p>
              <p style={{ fontSize: 12, color: "var(--color-text-dim)", marginTop: 4 }}>
                Add your first car to get started
              </p>
              <Link href="/cars/new" style={{ marginTop: 16 }}>
                <button className="cms-btn cms-btn-primary">Add Car</button>
              </Link>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {cars.slice(0, 5).map((car) => (
                <Link
                  key={car._id || car.carId}
                  href={`/cars/${car.carId}/edit`}
                  style={{ display: "flex", alignItems: "center", gap: 16, padding: "1rem 1.5rem", borderBottom: "1px solid var(--color-border-dim)", textDecoration: "none", transition: "background 0.2s ease" }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "var(--color-surface-2)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                >
                  <div className="image-preview" style={{ height: 48, width: 72, flexShrink: 0 }}>
                    {car.heroImage ? (
                      <img src={getImageUrl(car.heroImage)} alt={car.name} />
                    ) : (
                      <div style={{ height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Car style={{ height: 20, width: 20, color: "var(--color-text-dim)" }} />
                      </div>
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 14, fontWeight: 500, color: "white", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {car.name}
                    </p>
                    <p style={{ fontSize: 12, color: "var(--color-text-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {car.carId} · {car.type || "N/A"}
                    </p>
                  </div>
                  <span className={`cms-badge ${
                    car.status?.toLowerCase() === "active" || car.status?.toLowerCase() === "published"
                      ? "cms-badge-success"
                      : car.status?.toLowerCase() === "draft"
                      ? "cms-badge-warning"
                      : "cms-badge-default"
                  }`}>
                    {car.status || "draft"}
                  </span>
                  <span style={{ fontSize: 12, color: "var(--color-text-dim)", marginLeft: 16 }} className="hidden sm:block">
                    {car.createdAt ? formatDate(car.createdAt) : "—"}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
