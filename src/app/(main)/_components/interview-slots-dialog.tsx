"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useAvailableMeetingSlots } from "@/hooks";
import timeslotsApi from "@/api/timeslots";
import { getUserSessionFromStorage } from "@/lib/auth";
import { isSameDay } from "@/lib/date";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TimeInput, TimePicker } from "./time-input";

const FormSchema = z
  .object({
    interviewDate: z.string().min(1, {
      message: "Required",
    }),
    interviewDuration: z.string().min(4, {
      message: "Required",
    }),
    breakTime: z.coerce.number(),
    fromTime: z.string().min(4, {
      message: "Required",
    }),
    toTime: z.string().min(4, {
      message: "Required",
    }),
  })
  .superRefine((data, ctx) => {
    const [fromH, fromM] = data.fromTime.split(":");
    const [toH, toM] = data.toTime.split(":");

    if (+fromH > +toH) {
      ctx.addIssue({
        code: "custom",
        message: "To must be after From.",
        path: ["toTime"],
      });
    }

    if (+fromH === +toH && +fromM >= +toM) {
      ctx.addIssue({
        code: "custom",
        message: "To must be after From.",
        path: ["toTime"],
      });
    }

    if (data.breakTime < 0 || data.breakTime % 1 !== 0) {
      ctx.addIssue({
        code: "custom",
        message: "Invalid",
        path: ["breakTime"],
      });
    }

    if (data.breakTime >= (+toH - +fromH) * 60 + (+toM - +fromM)) {
      ctx.addIssue({
        code: "custom",
        message: "Too much",
        path: ["breakTime"],
      });
    }
  });

function addMinutes(time: string, minsToAdd: string) {
  function D(J: number) {
    return (J < 10 ? "0" : "") + J;
  }
  const piece = time.split(":");
  const mins = +piece[0] * 60 + +piece[1] + +minsToAdd;

  return D(((mins % (24 * 60)) / 60) | 0) + ":" + D(mins % 60);
}

export const InterviewSlotsDialog = () => {
  const [open, setOpen] = useState(false);

  const userSession = getUserSessionFromStorage();

  const queryClient = useQueryClient();
  const createTimeslotsMutation = useMutation({
    mutationFn: timeslotsApi.bulkCreate,
    onSuccess: () => {
      setOpen(false);

      queryClient.invalidateQueries({ queryKey: ["available-timeslots"] });
    },
  });

  const { data: availableMeetingSlots } = useAvailableMeetingSlots();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      interviewDate: "",
      interviewDuration: "",
      breakTime: 5,
    },
  });

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    if (!("teacher" in userSession)) return;

    const maxEndDate = new Date(`${values.interviewDate}T${values.toTime}:00`);

    const [durationH, durationM, _] = values.interviewDuration.split(":");
    const totalDurationInMinutes = +durationH * 60 + +durationM;
    const [fromH, fromM] = values.fromTime.split(":");
    const [toH, toM] = values.toTime.split(":");
    const totalMinutesDuration = (+toH - +fromH) * 60 + (+toM - +fromM);
    const numOfSlots = Math.floor(
      totalMinutesDuration / totalDurationInMinutes
    );

    const data = [];

    for (let i = 0; i < numOfSlots; i++) {
      const startDate = new Date(
        `${values.interviewDate}T${addMinutes(values.fromTime, `${totalDurationInMinutes * i + i * values.breakTime} `)}:00`
      );

      const endDate = new Date(
        `${values.interviewDate}T${addMinutes(
          values.fromTime,
          `${totalDurationInMinutes * (i + 1) + i * values.breakTime} `
        )}:00`
      );

      if (endDate.getTime() <= maxEndDate.getTime()) {
        data.push({
          teacherId: userSession.teacher,
          startDate: startDate,
          endDate: endDate,
        });
      }
    }

    if (data.length === 0) return;

    if (data[0].startDate.getTime() < Date.now()) {
      toast.error("Can't create timeslots in the past");
      return;
    }

    let hasConflictWithExistingAvailableTimeslots = false;

    if (availableMeetingSlots) {
      hasConflictWithExistingAvailableTimeslots = data.some((newTs) =>
        availableMeetingSlots.some((ts, idx) => {
          return (
            isSameDay(newTs.startDate, ts.to) &&
            newTs.startDate.getTime() >= new Date(ts.from).getTime() &&
            newTs.startDate.getTime() <= new Date(ts.to).getTime()
          );
        })
      );
    }

    if (hasConflictWithExistingAvailableTimeslots) {
      toast.error("There's a Conflict with your current available timeslots.");

      return;
    }

    createTimeslotsMutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg">Add Interview Slots</Button>
      </DialogTrigger>

      <DialogContent className="">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-secondary-500 text-xl font-semibold lg:text-2xl">
            Interview Slots
          </DialogTitle>
          <DialogDescription className="text-sm font-normal text-body-light">
            Please, Select your weekly working time and interview slot duration
          </DialogDescription>
        </DialogHeader>

        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="md:grid md:grid-cols-2 md:gap-x-16">
                <FormField
                  control={form.control}
                  name="interviewDuration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Interview Slot Duration</FormLabel>
                      <FormControl>
                        <TimeInput fullWidth {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="interviewDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          className="rounded-none border-0 border-b focus-visible:ring-0 focus-visible:ring-offset-0"
                          min={new Date().toISOString().split("T")[0]}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="md:grid md:grid-cols-2 md:gap-x-16">
                <FormField
                  control={form.control}
                  name="breakTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Break Time</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type="number"
                            className="h-10 rounded-none border-0 border-b pe-12 focus-visible:ring-0 focus-visible:ring-offset-0"
                            min={0}
                            step={1}
                            {...field}
                          />
                        </FormControl>
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm">
                          Mins
                        </span>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="md:grid md:grid-cols-2 md:gap-x-16">
                <FormField
                  control={form.control}
                  name="fromTime"
                  render={({ field }) => (
                    <FormItem className="min-w-36">
                      <FormLabel>From</FormLabel>
                      <FormControl>
                        <TimePicker defaultTime="10:00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="toTime"
                  render={({ field }) => (
                    <FormItem className="min-w-36">
                      <FormLabel>To</FormLabel>
                      <FormControl>
                        <TimePicker defaultTime="12:00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  loading={createTimeslotsMutation.isPending}
                >
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
