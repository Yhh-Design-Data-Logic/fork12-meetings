import zod from "zod";

if (typeof window !== "undefined") {
  throw new Error("env-validation.mjs should not be imported on the client-side!");
}

const envSchema = zod.object({
  NEXT_PUBLIC_API_URL: zod
    .string({
      errorMap: () => ({
        message: "Missing environment variable: NEXT_PUBLIC_API_URL",
      }),
    })
    .min(1),
});

if (!process.env.SKIP_VALIDATION)
  envSchema.parse({
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  });
