import Image from "next/image";

import backgroundImg from "../../../../public/assets/images/auth-background.png";

export const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative lg:flex min-h-screen">
      <div className="absolute top-0 left-0 right-0 h-1/2 lg:h-auto lg:relative lg:basis-1/2 lg:flex lg:items-end">
        <div className="hidden lg:block lg:sticky lg:bottom-0 lg:mx-8 lg:pb-4 lg:text-white lg:z-10">
          <Image
            src="https://cdn.fork12.com/website/whiteFork.svg"
            className="w-40 h-auto mb-5"
            alt="fork-12"
            width={160}
            height={77}
          />
          <p className="text-3xl font-bold mb-5">
            Your only solution to manage every step of the school application
            process for schools and parents, making it a stress-free experience.
          </p>
        </div>

        <Image
          className="object-cover"
          src={backgroundImg}
          alt=""
          fill
          placeholder="blur"
        />

        <div className="absolute inset-0 bg-secondary/60" aria-hidden="true" />
      </div>

      <div className="flex px-5 pt-10 md:pt-20 lg:basis-1/2 flex-col justify-center items-center">
        {children}
      </div>
    </div>
  );
};
