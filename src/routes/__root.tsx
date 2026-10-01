import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-8xl text-brand">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Sidan finns inte</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Sidan du letar efter finns inte eller har flyttats.
        </p>
        <div className="mt-6">
          <Link to="/" className="btn-base btn-blue">
            Till startsidan
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Sidan kunde inte laddas
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Något gick fel hos oss. Prova att ladda om sidan eller gå till startsidan.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-base btn-blue"
          >
            Försök igen
          </button>
          <a href="/" className="btn-base btn-outline">
            Till startsidan
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Zanea AB – Städfirma i Bromma & Stockholm" },
      {
        name: "description",
        content:
          "Professionell lokalvård och hemstädning i Stockholm & Bromma. RUT-avdrag direkt på fakturan, ansvarsförsäkring och nöjd-kund-garanti. Få fri offert.",
      },
      { property: "og:site_name", content: "Zanea AB" },
      { name: "theme-color", content: "#1d5ed8" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "sv_SE" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HomeAndConstructionBusiness",
          additionalType: "https://schema.org/CleaningService",
          name: "Zanea AB",
          description:
            "Städ- och lokalvårdsbolag i Bromma. Hemstädning, flytt- och storstädning, företagsstädning samt bygg- och feststädning i Stockholm och Bromma.",
          foundingDate: "2024",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Stenhammarsvägen 2A",
            postalCode: "168 58",
            addressLocality: "Bromma",
            addressCountry: "SE",
          },
          areaServed: ["Stockholm", "Bromma"],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="sv">
      <head>
        <HeadContent />
      </head>
      <body className="bg-white">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main id="innehall" className="flex-1 overflow-x-clip">
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
