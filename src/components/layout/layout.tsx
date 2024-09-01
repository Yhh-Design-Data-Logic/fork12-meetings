import { Sidebar } from "./sidebar";
import { Header } from "./header";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />

      <div className="min-h-screen md:flex">
        <Sidebar />

        <main className="mt-[var(--header-area-height)] md:grow">
          {children}
        </main>
      </div>
    </>
  );
};
