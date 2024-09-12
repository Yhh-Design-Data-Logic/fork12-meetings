"use client";

import { ErrorBoundary } from "react-error-boundary";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";

import { useAvailableMeetingSlots } from "@/hooks";
import timeslotsApi from "@/api/timeslots";

import { ErrorBoundaryPageFallback } from "@/components/error";
import { AvailableInterviewSlot } from "@/components/cards";

import { InterviewSlotsDialog } from "../_components";

function CalendarPageComponent() {
  const { isLoading, data } = useAvailableMeetingSlots();

  const queryClient = useQueryClient();
  const deleteTimeslotMutation = useMutation({
    mutationFn: timeslotsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["available-timeslots"] });
    },
  });

  return (
    <div className="container py-10">
      <div className="mb-8 flex justify-end">
        <InterviewSlotsDialog />
      </div>

      <section>
        <h2 className="mb-6 text-xl text-heading underline">
          Available Interview Slots
        </h2>

        {isLoading ? (
          <div className="mt-16 flex justify-center">
            <Loader2Icon size={56} className="animate-spin text-primary" />
          </div>
        ) : data ? (
          <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
            {data.map((slot) => (
              <li key={slot.id}>
                <AvailableInterviewSlot
                  from={slot.from}
                  to={slot.to}
                  onDelete={() => deleteTimeslotMutation.mutate(slot.id)}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p></p>
        )}
      </section>
    </div>
  );
}

export default function CalendarPage() {
  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryPageFallback}>
      <CalendarPageComponent />
    </ErrorBoundary>
  );
}
