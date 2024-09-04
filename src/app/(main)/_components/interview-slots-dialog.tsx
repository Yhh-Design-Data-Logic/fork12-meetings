"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
import { TimeInput } from "./time-input";

const FormSchema = z.object({
  interviewDate: z.string().min(1, {
    message: "Required",
  }),
  interviewDuration: z.string().min(4, {
    message: "Required",
  }),
});

export const InterviewSlotsDialog = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      interviewDate: "",
      interviewDuration: "",
    },
  });

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    console.log(values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg">Add Interview Slots</Button>
      </DialogTrigger>

      <DialogContent className="lg:max-w-[900px]">
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
              <div className="md:flex md:space-x-12">
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

              <div>
                <Button type="submit" className="w-full" size="lg">
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
