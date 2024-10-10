import { Skeleton } from "@/components/ui/skeleton";
import { MeetingCardSkeleton } from "@/components/meeting";

export const MeetingsPageSkeleton = () => (
  <>
    {Array.from({ length: 3 }).map((_, idx) => (
      <div className="mb-8" key={idx}>
        <Skeleton className="mb-2 h-5 w-20" />

        <ul className="space-y-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <MeetingCardSkeleton key={idx} />
          ))}
        </ul>
      </div>
    ))}
  </>
);

export const ParentBookMeetingPageSkeletons = () => {
  return (
    <>
      <div className="mb-5 h-full rounded-xl border border-neutral-100 bg-white p-6 xl:mb-0 xl:mr-5 xl:shrink-0 xl:basis-1/4">
        <Skeleton className="mb-1 h-5 w-full" />
        <Skeleton className="mb-6 h-5 w-3/4" />

        <div className="sm:grid sm:grid-cols-2 sm:gap-5 xl:grid-cols-1 [&>li:last-child]:mb-0">
          {Array.from({ length: 3 }).map((_, idx) => (
            <Skeleton className="w-ful h-20 rounded-xl" key={idx} />
          ))}
        </div>
      </div>
      <div className="h-full space-y-6 rounded-xl border border-neutral-100 bg-white px-6 pt-6 xl:flex-auto xl:basis-3/4 xl:overflow-auto">
        <Skeleton className="mb-6 h-5 w-full" />

        <Skeleton className="mb-3 h-6 w-24" />
        <Skeleton className="mb-6 h-14 w-full" />

        <Skeleton className="h-96 w-full" />
      </div>
    </>
  );
};
