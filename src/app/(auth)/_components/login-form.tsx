"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import authApi from "@/api/auth";
import { isDirectusError, isZodError } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Required",
  }),
});

export const LoginForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: () => {
      router.push("/");
    },
    onError: (error) => {
      if (isZodError(error)) toast.error(error.errors[0].message);

      if (isDirectusError(error)) toast.error(error.errors[0].message);
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    loginMutation.mutate(values);
  }

  return (
    <div className="relative w-full max-w-md rounded-2xl bg-white p-5 shadow-md md:p-8">
      <h2 className="mb-7 px-4 text-center text-2xl font-bold text-secondary md:text-3xl">
        Login
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            size="lg"
            loading={loginMutation.isPending}
          >
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
};
