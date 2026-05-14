"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { carsApi } from "@/lib/api";
import type { CarFormData } from "@/types/car";

export const carKeys = {
  all: ["cars"] as const,
  lists: () => [...carKeys.all, "list"] as const,
  detail: (id: string) => [...carKeys.all, "detail", id] as const,
};

export function useCars() {
  return useQuery({
    queryKey: carKeys.lists(),
    queryFn: carsApi.getAll,
  });
}

export function useCar(id: string) {
  return useQuery({
    queryKey: carKeys.detail(id),
    queryFn: () => carsApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateCar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CarFormData) => carsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: carKeys.lists() });
    },
  });
}

export function useUpdateCar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CarFormData> }) =>
      carsApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: carKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: carKeys.detail(variables.id),
      });
    },
  });
}

export function useDeleteCar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => carsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: carKeys.lists() });
    },
  });
}
