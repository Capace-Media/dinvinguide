import Link from "next/link";
import ExplorePages from "./_components/ExplorePages";

export default function NotFound() {
  return (
    <section className="layout bg-white pt-12 pb-16 md:pt-20 md:pb-24">
      {/* Decorative top bar */}
      <div className="w-full h-2 bg-brand-beige rounded-full mb-12"></div>

      {/* Main content */}
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
        {/* Wine glass icon/illustration */}
        <div className="relative mb-8">
          <div className="text-[120px] md:text-[180px] leading-none select-none opacity-10 font-sub text-brand-primary">
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
              className="w-16 h-16 md:w-24 md:h-24 text-brand-secondary"
            >
              <path d="M8 22h8" />
              <path d="M12 11v11" />
              <path d="M5.5 2h13l-.5 7a6 6 0 1 1-12 0l-.5-7Z" />
              <path d="M6 2c.4 2.5 1 4.5 2 6" />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h1 className="font-sub text-3xl md:text-5xl text-brand-primary mb-4">
          Hoppsan! Sidan hittades inte
        </h1>

        {/* Description */}
        <p className="text-brand-gray text-lg md:text-xl mb-4 max-w-md">
          Det verkar som att denna sida har tappat korken och rullat iväg.
        </p>
        <p className="text-brand-gray mb-8">
          Oroa dig inte – det finns mycket mer att utforska i vår vinkällare!
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
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
        <div className="mt-12 pt-8 border-t border-brand-light w-full">
          <p className="text-sm text-brand-gray mb-4">Populära sidor:</p>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link
              href="/dryckestips"
              className="text-brand-secondary hover:underline transition-all"
            >
              Dryckestips
            </Link>
            <Link
              href="/recept"
              className="text-brand-secondary hover:underline transition-all"
            >
              Recept
            </Link>
            <Link
              href="/vinskolan"
              className="text-brand-secondary hover:underline transition-all"
            >
              Vinskolan
            </Link>
            <Link
              href="/druvguiden"
              className="text-brand-secondary hover:underline transition-all"
            >
              Druvguiden
            </Link>
            <Link
              href="/vinatlas"
              className="text-brand-secondary hover:underline transition-all"
            >
              Vinatlas
            </Link>
          </nav>
        </div>
      </div>
    </section>
  );
}
