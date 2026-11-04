import Link from "next/link";
import ExplorePages from "@/components/shared/explore-pages";

export default function NotFound() {
  return (
    <section className="layout bg-white pt-12 pb-16 md:pt-20 md:pb-24">
      {/* Decorative top bar */}
      <div className="mb-12 h-2 w-full rounded-full bg-brand-beige"></div>

      {/* Main content */}
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        {/* Wine glass icon/illustration */}
        <div className="relative mb-8">
          <div className="font-sub text-[120px] leading-none text-brand-primary opacity-10 select-none md:text-[180px]">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-16 w-16 text-brand-secondary md:h-24 md:w-24"
            >
              <path d="M8 22h8" />
              <path d="M12 11v11" />
              <path d="M5.5 2h13l-.5 7a6 6 0 1 1-12 0l-.5-7Z" />
              <path d="M6 2c.4 2.5 1 4.5 2 6" />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h1 className="mb-4 font-sub text-3xl text-brand-primary md:text-5xl">
          Hoppsan! Sidan hittades inte
        </h1>

        {/* Description */}
        <p className="mb-4 max-w-md text-lg text-brand-gray md:text-xl">
          Det verkar som att denna sida har tappat korken och rullat iväg.
        </p>
        <p className="mb-8 text-brand-gray">
          Oroa dig inte – det finns mycket mer att utforska i vår vinkällare!
        </p>

        {/* Action buttons */}
        <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
          <Link
            href="/"
            className="btn px-8 py-3 text-center"
            aria-label="Gå tillbaka till startsidan"
          >
            Till startsidan
          </Link>
          <Link
            href="/artiklar"
            className="btn-white border border-brand-secondary px-8 py-3 text-center"
            aria-label="Utforska våra artiklar"
          >
            Utforska artiklar
          </Link>
        </div>

        {/* Quick links */}
        <div className="mt-12 w-full border-t border-brand-light pt-8">
          <p className="mb-4 text-sm text-brand-gray">Populära sidor:</p>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link
              href="/dryckestips"
              className="text-brand-secondary transition-all hover:underline"
            >
              Dryckestips
            </Link>
            <Link
              href="/recept"
              className="text-brand-secondary transition-all hover:underline"
            >
              Recept
            </Link>
            <Link
              href="/vinskolan"
              className="text-brand-secondary transition-all hover:underline"
            >
              Vinskolan
            </Link>
            <Link
              href="/druvguiden"
              className="text-brand-secondary transition-all hover:underline"
            >
              Druvguiden
            </Link>
            <Link
              href="/vinatlas"
              className="text-brand-secondary transition-all hover:underline"
            >
              Vinatlas
            </Link>
          </nav>
        </div>
      </div>
    </section>
  );
}
