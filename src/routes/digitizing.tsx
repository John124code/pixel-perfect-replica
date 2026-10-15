import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Upload, Check } from "lucide-react";
import { formatNaira } from "@/lib/data";
import { PageIntro } from "@/components/site-header";

export const Route = createFileRoute("/digitizing")({
  head: () => ({
    meta: [
      { title: "Custom Digitizing — EMB Connect" },
      { name: "description", content: "Upload your artwork or logo and get a tailored quote for a machine-ready embroidery file." },
      { property: "og:title", content: "Custom Digitizing — EMB Connect" },
      { property: "og:description", content: "Turn your artwork into machine-stitchable DST and EMB files." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Digitizing,
});

const steps = ["Artwork", "Details", "Quote"];
const base: Record<string, number> = { Agbada: 25000, "Senator / Kaftan": 15000, Dansiki: 18000, Caps: 8000, "Women's": 12000, Logo: 10000 };

function Digitizing() {
  const [step, setStep] = useState(0);
  const [file, setFile] = useState<string>("");
  const [garment, setGarment] = useState("Agbada");
  const [size, setSize] = useState(20);
  const [rush, setRush] = useState(false);
  const quote = Math.round((base[garment] * (size / 20) * (rush ? 1.5 : 1)) / 500) * 500;

  return (
    <>
      <PageIntro eyebrow="Custom digitizing" title="Your artwork, stitch-perfect." sub="Three steps to a tailored quote from our master digitizers." />
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-10 flex items-center gap-3">
          {steps.map((s, i) => (
            <div key={s} className="flex flex-1 items-center gap-3">
              <span className={`grid h-8 w-8 place-items-center rounded-full border text-xs ${i <= step ? "border-gold bg-gold text-primary-foreground" : ""}`}>{i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}</span>
              <span className={`text-sm ${i === step ? "" : "text-muted-foreground"}`}>{s}</span>
              {i < steps.length - 1 && <span className="h-px flex-1 bg-border" />}
            </div>
          ))}
        </div>
        <div className="rounded-2xl border p-8">
          {step === 0 && (
            <label className="flex cursor-pointer flex-col items-center rounded-xl border border-dashed p-14 text-center hover:border-gold">
              <Upload className="h-6 w-6 text-gold" strokeWidth={1.3} />
              <span className="mt-3">{file || "Upload reference artwork or logo"}</span>
              <span className="mt-1 text-xs text-muted-foreground">PNG, JPG, PDF, AI · up to 20MB</span>
              <input type="file" className="hidden" onChange={(e) => setFile(e.target.files?.[0]?.name ?? "")} />
            </label>
          )}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <p className="mb-3 text-sm">Garment</p>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(base).map((g) => (
                    <button key={g} onClick={() => setGarment(g)} className={`rounded-full border px-4 py-1.5 text-xs ${garment === g ? "border-gold bg-gold text-primary-foreground" : ""}`}>{g}</button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-3 text-sm">Approx. size: {size} cm</p>
                <input type="range" min={5} max={60} value={size} onChange={(e) => setSize(+e.target.value)} className="w-full accent-[var(--gold)]" />
              </div>
              <label className="flex items-center gap-3 text-sm"><input type="checkbox" checked={rush} onChange={(e) => setRush(e.target.checked)} className="accent-[var(--gold)]" /> Rush delivery (24 hours)</label>
              <textarea placeholder="Notes for the digitizer (thread colours, fabric...)" className="w-full rounded-xl border p-4 text-sm outline-none focus:border-gold" rows={3} />
            </div>
          )}
          {step === 2 && (
            <div className="text-center">
              <p className="eyebrow">Estimated quote</p>
              <p className="mt-4 font-display text-6xl">{formatNaira(quote)}</p>
              <p className="mt-3 text-sm text-muted-foreground">{garment} · {size} cm · {rush ? "24h rush" : "3–5 days"}. A digitizer will confirm within 2 hours.</p>
            </div>
          )}
          <div className="mt-8 flex justify-between">
            <button disabled={step === 0} onClick={() => setStep(step - 1)} className="text-sm text-muted-foreground disabled:opacity-0">← Back</button>
            {step < 2 ? (
              <button disabled={step === 0 && !file} onClick={() => setStep(step + 1)} className="rounded-full bg-gold px-7 py-3 text-sm text-primary-foreground hover:shadow-gold disabled:opacity-40">Continue</button>
            ) : (
              <button onClick={() => setStep(0)} className="rounded-full bg-gold px-7 py-3 text-sm text-primary-foreground hover:shadow-gold">Submit request</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
