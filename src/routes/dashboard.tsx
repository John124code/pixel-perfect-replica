import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, Receipt, Heart, PenTool, MessageCircle } from "lucide-react";
import { PageIntro } from "@/components/site-header";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "My Dashboard — EMB Connect" },
      { name: "description", content: "Your downloads, orders, favorites and custom digitizing requests." },
      { property: "og:title", content: "My Dashboard — EMB Connect" },
      { property: "og:description", content: "Manage your embroidery files and orders." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Dashboard,
});

const cards = [
  { icon: Download, title: "My Downloads", stat: "14 files", desc: "Every design you own, always the latest version with secure file delivery." },
  { icon: Receipt, title: "Orders", stat: "9 orders", desc: "Purchase history and receipts." },
  { icon: Heart, title: "Favorites", stat: "23 saved", desc: "Saved wishlist items." },
  { icon: PenTool, title: "Custom digitizing", stat: "1 in progress", desc: "Turn custom artwork into machine-stitchable files.", to: "/digitizing" as const },
  { icon: MessageCircle, title: "Support", stat: "WhatsApp", desc: "Order issues and quick contact with our team.", href: "https://wa.me/" },
];

function Dashboard() {
  return (
    <>
      <PageIntro eyebrow="Buyer dashboard" title="Welcome back." sub="Everything you've purchased and requested, in one place." />
      <div className="mx-auto grid max-w-7xl gap-5 px-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ icon: Icon, title, stat, desc, to, href }) => {
          const inner = (
            <>
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-highlight-soft text-highlight"><Icon className="h-5 w-5" strokeWidth={1.3} /></span>
                <span className="text-xs text-muted-foreground">{stat}</span>
              </div>
              <h3 className="mt-8 text-2xl">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </>
          );
          const cls = "block rounded-2xl border p-7 transition duration-300 hover:-translate-y-1 hover:border-highlight/60 hover:shadow-soft";
          return to ? <Link key={title} to={to} className={cls}>{inner}</Link> : href ? <a key={title} href={href} target="_blank" rel="noreferrer" className={cls}>{inner}</a> : <div key={title} className={cls}>{inner}</div>;
        })}
      </div>
    </>
  );
}
