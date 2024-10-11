"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ErrorBoundary } from "react-error-boundary";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useChildren, useMeetings } from "@/hooks";
import meetingsApi from "@/api/meetings";
import { getUserSessionFromStorage } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { UserType } from "@/types";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { ErrorBoundaryPageFallback } from "@/components/error";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDate, hasTimeConflict, isSameDay } from "@/lib/date";
import { Icons } from "@/components/icons";

import { CalendarStrip } from "../_components/calendar";
import { ParentBookMeetingPageSkeletons } from "../_components/skeletons";

const today = new Date();

function ParentCalendarPageComponent() {
  const router = useRouter();

  const [selectedChild, setSelectedChild] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selections, setSelections] = useState<
    {
      child: { id: number; name: string; grade: string };
      teacher: { id: number; name: string; subject: string };
      timeslot: { id: number; from: Date; to: Date };
    }[]
  >([]);
  const [openPreviewDialog, setOpenPreviewDialog] = useState(false);

  const queryClient = useQueryClient();

  const { status, data: children } = useChildren();

  const { data: meetings } = useMeetings();

  const createMeetingsMutation = useMutation({
    mutationFn: meetingsApi.bulkCreate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meetings"] });
      queryClient.invalidateQueries({
        queryKey: ["teacher-available-timeslots"],
      });

      router.push("/");
      setOpenPreviewDialog(false);
    },
  });

  const userSession = getUserSessionFromStorage();

  const createMeetings = (data: typeof selections) => {
    if (!("parent" in userSession)) return;

    // check for time conflict among parent existing meetings
    if (meetings) {
      if (
        data.some((d) => {
          return meetings.some((m) =>
            hasTimeConflict(
              new Date(d.timeslot.from),
              new Date(d.timeslot.to),
              new Date(m.startDate),
              new Date(m.endDate)
            )
          );
        })
      ) {
        toast.error("There's a Conflict with your current meetings.");

        return;
      }
    }

    createMeetingsMutation.mutate(
      data.map((d) => ({
        parentId: userSession.parent,
        teacherId: d.teacher.id,
        timeslotId: d.timeslot.id,
        childId: d.child.id,
      }))
    );
  };

  if (userSession.type !== UserType.PARENT) {
    router.replace("/");
    return null;
  }

  return (
    <div className="container relative py-20 pt-5">
      <div className="mb-5 flex flex-col justify-between gap-5 md:mb-8 lg:flex-row lg:items-center">
        <h1 className="text-2xl font-semibold text-[#171725]">Book Meeting</h1>
      </div>

      <div className="mb-12 xl:mb-16 xl:flex">
        {status === "pending" ? (
          <ParentBookMeetingPageSkeletons />
        ) : status === "error" ? (
          <p>An Error Occured.</p>
        ) : (
          <>
            {/* children */}
            <div className="mb-5 h-full rounded-xl border border-neutral-100 bg-white p-6 xl:mb-0 xl:mr-5 xl:shrink-0 xl:basis-1/4">
              <p className="mb-6 font-medium">
                Please select the a child or more to book meetings with their
                teachers
              </p>

              <ul className="space-y-5 sm:grid sm:grid-cols-2 sm:gap-5 sm:space-y-0 xl:grid-cols-1 [&>li:last-child]:mb-0">
                {children.map((child) => (
                  <li
                    className={cn(
                      "relative rounded-xl border border-neutral-100 p-6 hover:border-transparent hover:ring-2 hover:ring-primary",
                      selectedChild === child.id && "ring-2 ring-primary"
                    )}
                    key={child.name}
                    tabIndex={0}
                    role="button"
                    onClick={() => setSelectedChild(child.id)}
                  >
                    <div className="flex items-center space-x-1.5">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="font-semibold">
                          {child.name[0]}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex flex-col">
                        <h4 className="font-semibold">Child {child.name}</h4>
                        <span className="">{child.grade}</span>
                      </div>
                    </div>

                    {selections.findIndex(
                      (selection) => selection.child.id === child.id
                    ) > -1 && (
                      <div className="mt-4 flex items-center space-x-2 text-sm font-medium text-secondary-600">
                        <Icons.CalendarCheck className="shrink-0" />
                        <span className="">
                          Selected{" "}
                          {
                            selections.filter(
                              (selection) => selection.child.id === child.id
                            ).length
                          }{" "}
                          appointment
                        </span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* teachers */}
            <div className="h-full space-y-6 rounded-xl border border-neutral-100 bg-white pt-6 xl:flex-auto xl:basis-3/4 xl:overflow-auto">
              <p className="px-6 font-medium">
                Please select the a child or more to book meetings with their
                teachers
              </p>

              <CalendarStrip
                className="px-6"
                startDate={undefined}
                endDate={undefined}
                defaultSelectedDate={today}
                onSelect={setSelectedDate}
              />

              <div className="min-h-80 sm:grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                {(
                  children.find((ch) => ch.id === selectedChild)?.teachers ?? []
                ).map((teacher) => (
                  <div
                    className="flex flex-col border-neutral-100"
                    key={teacher.name}
                  >
                    {/* teacher info */}
                    <div className="border p-6">
                      <Badge className="mb-2">{teacher.subject}</Badge>

                      <div className="flex items-center space-x-1.5">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="font-semibold">
                            {teacher.name[0]}
                          </AvatarFallback>
                        </Avatar>

                        <h5 className="font-semibold text-neutral-600">
                          {teacher.name}
                        </h5>
                      </div>
                    </div>

                    {/* teacher timeslots */}
                    <ul className="grow space-y-2.5 border p-6 pb-10">
                      {teacher.timeslots
                        .filter((ts) =>
                          isSameDay(ts.from, selectedDate ?? today)
                        )
                        .map((timeslot) => (
                          <li key={timeslot.id}>
                            <button
                              className={cn(
                                "block w-full rounded-xl border border-primary px-6 py-3 text-center font-semibold text-primary hover:bg-primary-100",
                                selections.find(
                                  (selection) =>
                                    selection.timeslot.id === timeslot.id
                                ) &&
                                  "bg-primary-100 text-primary-900 ring-2 ring-primary",
                                selections.find(
                                  (selection) =>
                                    selection.timeslot.id === timeslot.id &&
                                    selection.child.id !== selectedChild
                                ) &&
                                  "border-neutral-200 bg-neutral-100 text-neutral-500 ring-0 hover:bg-neutral-100"
                              )}
                              onClick={() =>
                                setSelections((prevState) =>
                                  // remove if already selected
                                  prevState.findIndex(
                                    (selection) =>
                                      selection.timeslot.id === timeslot.id
                                  ) === -1
                                    ? [
                                        {
                                          child: children.find(
                                            (ch) => ch.id === selectedChild
                                          )!,
                                          teacher,
                                          timeslot,
                                        },
                                        ...prevState,
                                      ]
                                    : prevState.filter(
                                        (selection) =>
                                          selection.timeslot.id !== timeslot.id
                                      )
                                )
                              }
                              disabled={
                                selections.findIndex(
                                  (selection) =>
                                    selection.timeslot.id === timeslot.id &&
                                    selection.child.id !== selectedChild
                                ) > -1
                              }
                            >
                              {formatDate(timeslot.from, "HH:mm")} -{" "}
                              {formatDate(timeslot.to, "HH:mm")}
                            </button>
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 flex justify-end bg-white p-5">
        <Button
          className="mr-6"
          variant="secondary"
          onClick={() => router.push("/")}
        >
          Cancel
        </Button>

        <Button
          disabled={selections.length === 0}
          onClick={() => setOpenPreviewDialog(true)}
        >
          Review Appointments
        </Button>
      </div>

      <Dialog open={openPreviewDialog} onOpenChange={setOpenPreviewDialog}>
        <DialogContent
          className="gap-8 lg:max-w-3xl lg:p-8 2xl:max-w-4xl"
          onInteractOutside={(e) =>
            createMeetingsMutation.isPending ? e.preventDefault() : void 0
          }
        >
          <DialogHeader>
            <DialogTitle className="text-neutral-1000 text-center text-2xl font-semibold">
              Review Your Appointments
            </DialogTitle>
            <DialogDescription className="text-center text-sm font-normal text-neutral-600">
              Please review your selected meeting times with your childs&apos;
              teachers before confirming.
            </DialogDescription>
          </DialogHeader>

          <div className="max-h-[50vh] overflow-auto">
            <table className="w-full text-start text-neutral-600">
              <thead>
                <tr className="bg-secondary-100 py-px text-xs">
                  <th className="rounded-tl-lg px-4 py-2 text-start">
                    Teacher
                  </th>
                  <th className="px-4 py-2 text-start">Subject</th>
                  <th className="px-4 py-2 text-start">Child</th>
                  <th className="rounded-tr-lg px-4 py-2 text-start">
                    Date&Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {selections.map((selection, idx) => (
                  <tr className="border-b border-neutral-100" key={idx}>
                    <td className="p-4">
                      <div className="flex items-center space-x-2.5">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="font-semibold">
                            {selection.teacher.name[0]}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex flex-col">
                          <h5 className="font-semibold">
                            {selection.teacher.name}
                          </h5>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="flex items-center space-x-2.5">
                        <Icons.Book />
                        <span className="text-base font-semibold">English</span>
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="flex items-center space-x-2.5">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="font-semibold">
                            {selection.child.name[0]}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex flex-col">
                          <h5 className="font-semibold">
                            {selection.child.name}
                          </h5>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="flex items-center space-x-2.5">
                        <Icons.Clock />

                        <div className="flex flex-col">
                          <span className="text-base font-medium">
                            {formatDate(selection.timeslot.from, "HH:mm")} -{" "}
                            {formatDate(selection.timeslot.to, "HH:mm")}
                          </span>
                          <span className="text-sm font-medium text-neutral-500">
                            {formatDate(
                              selection.timeslot.from,
                              "MMMM DD, YYYY"
                            )}
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <DialogFooter className="space-y-5 space-y-reverse sm:justify-center sm:space-x-6 sm:space-y-0">
            <Button
              variant="secondary"
              size="xl"
              onClick={() => setOpenPreviewDialog(false)}
            >
              Edit Appointments
            </Button>

            <Button
              size="lg"
              loading={createMeetingsMutation.isPending}
              onClick={() => createMeetings(selections)}
            >
              Confirm Appointments
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function ParentCalendarPage() {
  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryPageFallback}>
      <ParentCalendarPageComponent />
    </ErrorBoundary>
  );
}
