"use client";

import { useRouter, useParams } from "next/navigation";
import { useCar, useUpdateCar } from "@/hooks/use-cars";
import { CarForm } from "@/components/car-form/car-form";
import { PageLoader } from "@/components/ui/spinner";
import type { CarFormValues } from "@/lib/validations";
import { toast } from "sonner";
import { Car } from "lucide-react";

export default function EditCarPage() {
  const router = useRouter();
  const params = useParams();
  const carId = params.id as string;

  const { data: car, isLoading, error } = useCar(carId);
  const updateCar = useUpdateCar();

  const handleSubmit = async (data: CarFormValues) => {
    try {
      await updateCar.mutateAsync({ id: carId, data });
      toast.success(`"${data.name}" updated successfully!`);
      router.push("/cars");
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error?.response?.data?.message || "Failed to update car");
    }
  };

  if (isLoading) return <PageLoader />;

  if (error || !car) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="h-16 w-16 rounded-2xl bg-red-500/10 flex items-center justify-center mb-4">
          <Car className="h-8 w-8 text-red-400" />
        </div>
        <p className="text-sm font-medium text-red-400">Car not found</p>
        <p className="text-xs text-zinc-600 mt-1">
          The car you&apos;re looking for doesn&apos;t exist or was deleted
        </p>
      </div>
    );
  }

  return (
    <CarForm
      mode="edit"
      initialData={car}
      onSubmit={handleSubmit}
      isSubmitting={updateCar.isPending}
    />
  );
}
