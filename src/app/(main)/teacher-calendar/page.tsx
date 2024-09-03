"use client";

import { Loader2Icon } from "lucide-react";

import { useAvailableInterviewSlots } from "@/hooks";

import { AvailableInterviewSlot } from "@/components/cards";
import { Button } from "@/components/ui/button";

export default function CalendarPage() {
  const { isLoading, data } = useAvailableInterviewSlots();

  return (
    <div className="container py-10">
      <div className="mb-8 flex justify-end">
        <Button size="lg">Add Interview Slots</Button>
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
                  onDelete={() => {}}
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
