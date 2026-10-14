import d1 from "@/assets/d1.jpg";
import d2 from "@/assets/d2.jpg";
import d3 from "@/assets/d3.jpg";

export type Design = {
  id: string;
  title: string;
  designer: string;
  category: string;
  formats: string[];
  stitches: number;
  price: number;
  image: string;
};

export const categories = [
  { name: "Agbada", count: 412, image: d1 },
  { name: "Senator / Kaftan", count: 368, image: d3 },
  { name: "Dansiki", count: 194, image: d1 },
  { name: "Caps", count: 157, image: d2 },
  { name: "Women's", count: 231, image: d3 },
];

export const designs: Design[] = [
  { id: "agb-royal-neck", title: "Royal Agbada Neckline", designer: "Tunde Stitchworks", category: "Agbada", formats: [".DST", ".EMB"], stitches: 48200, price: 15000, image: d1 },
  { id: "cap-diamond", title: "Diamond Cap Band", designer: "Kano Thread Co.", category: "Caps", formats: [".DST"], stitches: 12400, price: 6500, image: d2 },
  { id: "sen-linear", title: "Linear Senator Chest", designer: "Ade Digitals", category: "Senator / Kaftan", formats: [".DST", ".EMB"], stitches: 21800, price: 9000, image: d3 },
  { id: "dan-heritage", title: "Heritage Dansiki Yoke", designer: "Tunde Stitchworks", category: "Dansiki", formats: [".EMB"], stitches: 36500, price: 12500, image: d1 },
  { id: "cap-crown", title: "Crown Fila Motif", designer: "Abuja Embroidery Lab", category: "Caps", formats: [".DST", ".EMB"], stitches: 9800, price: 5000, image: d2 },
  { id: "kaf-minimal", title: "Minimal Kaftan Placket", designer: "Ade Digitals", category: "Senator / Kaftan", formats: [".DST"], stitches: 17300, price: 8000, image: d3 },
  { id: "agb-grand", title: "Grand Agbada Pocket", designer: "Lagos Needle House", category: "Agbada", formats: [".DST", ".EMB"], stitches: 62100, price: 22000, image: d1 },
  { id: "gele-band", title: "Gele Accent Band", designer: "Kano Thread Co.", category: "Women's", formats: [".DST"], stitches: 14200, price: 7000, image: d2 },
];

export const formatNaira = (n: number) => "₦" + n.toLocaleString("en-NG");
