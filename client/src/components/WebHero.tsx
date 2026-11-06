import "../font.css";
import { Eye, Star, ArrowRight } from "lucide-react";

interface Props {
  IMG: string;
  description: string;
  view: number;
  ranging: number; // Rating value (e.g. 4.8)
}

function WebHero({ props }: { props: Props }) {
  const { IMG, description, view, ranging } = props;

  return (
    <section className="relative overflow-hidden bg-sky-100">
      {/* Background Glow / Ambiance */}
      <div className="absolute top-2/10 left-2/10 w-80 h-80 bg-amber-500/60 rotate-45"></div>

      <div className="relative mx-auto flex max-w-7xl flex-col-reverse items-center justify-between gap-12 px-6 py-16 sm:px-8 lg:flex-row lg:py-24">
        {/* Content Column */}
        <div className="flex w-full flex-col items-center text-center lg:w-1/2 lg:items-start lg:text-left">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/80 px-3.5 py-1 text-xs font-semibold tracking-wider text-neutral-300 uppercase backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Streetwear Evolved
          </div>

          {/* Main Heading */}
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl ">
            Welcome to{" "}
            <span className="amarante-regular block bg-gradient-to-r from-stone-900 via-stone-600 to-blue-400 bg-clip-text text-transparent">
              SEAL T-SHIRT
            </span>
          </h1>

          {/* Description */}
          <p className="mt-4 max-w-xl text-base leading-relaxed text-neutral-600 sm:text-lg text-shadow-sm">
            {description}
          </p>

          {/* Social Proof / Metrics */}
          <div className="mt-8 flex items-center gap-6 divide-x divide-neutral-800">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400">
                <Eye className="h-4 w-4" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold">{view.toLocaleString()}</p>
                <p className="text-xs text-neutral-500">Views</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 pl-6">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-900 border border-neutral-800 text-amber-400">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold">{ranging} / 5.0</p>
                <p className="text-xs text-neutral-500">Rating</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-black transition-all hover:bg-neutral-200 hover:shadow-lg hover:shadow-white/10 active:scale-[0.98]">
              <span>Shop Collection</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Hero Image Column */}
        <div className="relative flex w-full max-w-md items-center justify-center lg:max-w-none lg:w-1/2">
          <div className="relative aspect-square w-full max-w-lg overflow-hidden rounded-3xl border border-neutral-800/80 bg-neutral-900/50 p-4 shadow-2xl backdrop-blur-sm">
            <img
              src={IMG}
              alt="Seal T-Shirt Featured Item"
              className="h-full w-full object-cover object-center rounded-2xl transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default WebHero;