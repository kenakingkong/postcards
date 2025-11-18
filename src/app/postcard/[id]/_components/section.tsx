import { ReactNode } from "react";

export default function Section({ children }: { children: ReactNode }) {
  return (
    <section className="p-4 py-6 md:p-8 md:py-12 bg-secondary rounded grid grid-cols-1 md:grid-cols-2 gap-4">
      {children}
    </section>
  );
}

Section.SuperTitle = function({ children }: { children: ReactNode }) {
  return <p className="text-xs md:text-sm font-bold">{children}</p>;
};

Section.Title = function ({ children }: { children: ReactNode }) {
  return <h3 className="text-xl md:text-2xl font-bold">{children}</h3>;
};

Section.Subtitle = function ({ children }: { children: ReactNode }) {
  return <p className="text-sm md:text-base">{children}</p>;
};

Section.Aside = function ({ children }: { children: ReactNode }) {
  return (
    <div className="col-span-1 flex flex-col items-start justify-start gap-4">
      {children}
    </div>
  );
};

Section.AsideContent =function ({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-start justify-start gap-2">
      {children}
    </div>
  );
};

Section.Content = function ({ children }: { children: ReactNode }) {
  return (
    <div className="col-span-1 flex flex-wrap items-center md:justify-end gap-2">
      {children}
    </div>
  );
};
