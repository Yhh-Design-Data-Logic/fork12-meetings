"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { z } from "zod";

import { useAvailableInterviewSlotsForTeacher } from "@/hooks";
import { formatDate } from "@/lib/date";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const FormSchema = z.object({
  date: z.string().min(1, {
    message: "Required",
  }),
  interviewSlot: z.string().min(1, {
    message: "Required",
  }),
});

export const ParentInterviewBookingDialog = ({
  teacherId,
  teacherName,
  trigger,
}: {
  teacherId: string;
  teacherName: string;
  trigger: React.ReactElement;
}) => {
  const { isLoading, data } = useAvailableInterviewSlotsForTeacher(teacherId);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      date: "",
      interviewSlot: "",
    },
  });

  const availableDate = form.watch("date");

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    console.log(values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="md:max-w-xl">
        <DialogHeader className="mb-4 border-b border-zinc-200 pb-2">
          <DialogTitle className="text-xl font-semibold text-heading lg:text-2xl">
            Book a Meeting <br /> <span className="text-primary">with</span>{" "}
            {teacherName}
          </DialogTitle>
        </DialogHeader>

        <div>
          {isLoading ? (
            <div className="mt-3 flex justify-center">
              <Loader2Icon size={40} className="animate-spin text-primary" />
            </div>
          ) : data && Object.keys(data).length > 0 ? (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="md:flex md:space-x-12 md:[&>*]:basis-1/2">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="rounded-none border-0 border-b focus:border-black focus:ring-0 focus:ring-offset-0">
                              <SelectValue placeholder="Select a date" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.keys(data).map((date) => (
                              <SelectItem key={date} value={date}>
                                {formatDate(date, "ddd, DD MMM")}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="interviewSlot"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="rounded-none border-0 border-b focus:border-black focus:ring-0 focus:ring-offset-0">
                              <SelectValue placeholder="Select a duration" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {(data[availableDate] ?? []).map(
                              ({ id, from, to }) => (
                                <SelectItem key={id} value={id}>
                                  {formatDate(from, "HH:mm")} -{" "}
                                  {formatDate(to, "HH:mm")}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <Button type="submit" className="w-full" size="lg">
                    Submit
                  </Button>
                </div>
              </form>
            </Form>
          ) : (
            <p>No available meeting slots found.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
