import type { ElementType, ReactNode } from "react";
import { Bubblor, Sparkle } from "@/components/Brand";

export function Heading({
  as: Tag = "h2",
  className = "",
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return <Tag className={className}>{children}</Tag>;
}

/** Markerat ord – gul understrykning (en riktig text-underline). */
export function Mark({ children, nowrap = false }: { children: ReactNode; nowrap?: boolean }) {
  return (
    <span
      className={`underline decoration-sun decoration-[0.09em] underline-offset-[0.12em] [text-decoration-skip-ink:none] ${
        nowrap ? "whitespace-nowrap" : ""
      }`}
    >
      {children}
    </span>
  );
}

/** Blå sidhuvudspanel för undersidor. Ligger under den svävande menyn. */
export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="-mt-16 p-3">
      <div className="panel-blue relative isolate overflow-hidden rounded-[2.25rem]">
        <Bubblor className="pointer-events-none absolute -right-10 bottom-[-3rem] -z-10 hidden w-72 opacity-90 sm:block lg:right-10 lg:w-96" />
        <Sparkle className="absolute top-40 right-[38%] -z-10 hidden size-6 text-sun lg:block" />
        <div className="container-page max-w-6xl pt-36 pb-16 sm:pt-44 sm:pb-24">
          <p className="inline-flex rounded-full bg-white/16 px-4 py-1.5 text-xs font-bold tracking-[0.14em] uppercase">
            {eyebrow}
          </p>
          <h1 className="mt-6 max-w-3xl text-[clamp(2.4rem,6vw,4.75rem)]">{title}</h1>
          {intro && <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/90">{intro}</p>}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
      </div>
    </section>
  );
}
