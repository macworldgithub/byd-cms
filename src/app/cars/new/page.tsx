"use client";

import { useRouter } from "next/navigation";
import { useCreateCar } from "@/hooks/use-cars";
import { CarForm } from "@/components/car-form/car-form";
import type { CarFormValues } from "@/lib/validations";
import { toast } from "sonner";

export default function NewCarPage() {
  const router = useRouter();
  const createCar = useCreateCar();

  const handleSubmit = async (data: CarFormValues) => {
    try {
      await createCar.mutateAsync(data);
      toast.success(`"${data.name}" created successfully!`);
      router.push("/cars");
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error?.response?.data?.message || "Failed to create car");
    }
  };

  return (
    <CarForm
      mode="create"
      onSubmit={handleSubmit}
      isSubmitting={createCar.isPending}
    />
  );
}
