"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Settings as SettingsIcon, Globe, Database, Palette } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Settings</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Manage your CMS configuration
        </p>
      </div>

      <div className="grid gap-6">
        {/* API Configuration */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Globe className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <CardTitle>API Configuration</CardTitle>
                <p className="text-xs text-zinc-500 mt-0.5">Configure your backend API connection</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>API Base URL</Label>
              <Input
                value={process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api"}
                disabled
                className="opacity-60"
              />
              <p className="text-xs text-zinc-600">
                Set via NEXT_PUBLIC_API_BASE_URL environment variable
              </p>
            </div>
          </CardContent>
        </Card>

        {/* General */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <SettingsIcon className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <CardTitle>General</CardTitle>
                <p className="text-xs text-zinc-500 mt-0.5">Application settings</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Application Name</Label>
              <Input value="BYD Admin CMS" disabled className="opacity-60" />
            </div>
            <div className="space-y-2">
              <Label>Version</Label>
              <Input value="1.0.0" disabled className="opacity-60" />
            </div>
          </CardContent>
        </Card>

        {/* Theme */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <Palette className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <CardTitle>Appearance</CardTitle>
                <p className="text-xs text-zinc-500 mt-0.5">Customize the look and feel</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-white">Dark Mode</p>
                <p className="text-xs text-zinc-500">Currently active</p>
              </div>
              <div className="h-6 w-11 rounded-full bg-blue-600 relative cursor-pointer">
                <div className="h-5 w-5 rounded-full bg-white absolute right-0.5 top-0.5 shadow-md" />
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-white">Accent Color</p>
                <p className="text-xs text-zinc-500">Blue</p>
              </div>
              <div className="flex gap-2">
                {["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444"].map((color) => (
                  <div
                    key={color}
                    className="h-6 w-6 rounded-full border-2 cursor-pointer transition-transform hover:scale-110"
                    style={{
                      backgroundColor: color,
                      borderColor: color === "#3b82f6" ? "white" : "transparent",
                    }}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Database */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <Database className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <CardTitle>Database</CardTitle>
                <p className="text-xs text-zinc-500 mt-0.5">MongoDB connection status</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 py-2">
              <div className="h-3 w-3 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50 animate-pulse" />
              <span className="text-sm text-zinc-300">Connected via backend API</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
