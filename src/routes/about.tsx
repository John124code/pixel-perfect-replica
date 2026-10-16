import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import { PageIntro } from "@/components/site-header";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — EMB Connect" },
      { name: "description", content: "EMB Connect links fashion brands and tailors directly with Africa's master digitizers." },
      { property: "og:title", content: "About — EMB Connect" },
      { property: "og:description", content: "Our mission for African embroidery craft." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <>
      <PageIntro eyebrow="About" title="Crafted for the tailors of Africa." />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-2">
        <img src={hero} alt="Detailed embroidery on dark fabric" loading="lazy" className="embroidery-image aspect-[4/3] rounded-lg object-cover" />
        <div className="space-y-5 text-muted-foreground">
          <p>EMB Connect connects fashion brands and tailors directly with professional digitizers — no middlemen, no guesswork.</p>
          <p>Every design is reviewed for stitch quality and machine compatibility before it reaches the marketplace, so what you download runs cleanly on your machine.</p>
        </div>
      </div>
    </>
  ),
});
