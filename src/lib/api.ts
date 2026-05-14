import axios from "axios";
import type { Car, CarFormData, DeleteResponse } from "@/types/car";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ─── Cars API ────────────────────────────────────────────────

export const carsApi = {
  getAll: async (): Promise<Car[]> => {
    const { data } = await api.get<Car[]>("/cars");
    return data;
  },

  getById: async (id: string): Promise<Car> => {
    const { data } = await api.get<Car>(`/cars/${id}`);
    return data;
  },

  create: async (carData: CarFormData): Promise<Car> => {
    const { data } = await api.post<Car>("/cars", carData);
    return data;
  },

  update: async (id: string, carData: Partial<CarFormData>): Promise<Car> => {
    const { data } = await api.put<Car>(`/cars/${id}`, carData);
    return data;
  },

  delete: async (id: string): Promise<DeleteResponse> => {
    const { data } = await api.delete<DeleteResponse>(`/cars/${id}`);
    return data;
  },
};

export default api;
