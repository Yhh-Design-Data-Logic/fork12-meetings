"use client";

import { Loader2Icon } from "lucide-react";

import { useParentKids } from "@/hooks";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ParentInterviewBookingDialog } from "../_components";

export default function Page() {
  const { isLoading, data } = useParentKids();

  return (
    <div className="container py-10">
      <section>
        <h2 className="mb-6 text-xl text-heading underline">My Kids</h2>

        {isLoading ? (
          <div className="mt-16 flex justify-center">
            <Loader2Icon size={56} className="animate-spin text-primary" />
          </div>
        ) : data ? (
          <Accordion
            type="single"
            defaultValue={data[0].name}
            className="w-full"
            collapsible
          >
            {data.map((kid) => (
              <AccordionItem key={kid.name} value={kid.name}>
                <AccordionTrigger>{kid.name}</AccordionTrigger>
                <AccordionContent className="space-y-3">
                  {kid.teachers.map((teacher) => (
                    <div
                      key={teacher.id}
                      className="flex max-w-xl justify-between divide-x rounded-xl border border-zinc-200 bg-white p-3 md:p-4"
                    >
                      <div className="flex flex-col pr-4">
                        <span className="block text-xs uppercase tracking-widest text-green-800 md:text-sm">
                          Teacher
                        </span>

                        <h3 className="font-medium text-heading">
                          {teacher.name}
                        </h3>
                      </div>

                      <div className="flex items-center pl-6">
                        <ParentInterviewBookingDialog
                          key={teacher.id}
                          teacherId={teacher.id}
                          teacherName={teacher.name}
                          trigger={<Button>Book </Button>}
                        />
                      </div>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <p></p>
        )}
      </section>
    </div>
  );
}
