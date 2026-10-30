export interface Product {
  id: string;
  name: string;
  image: string;
  imageAlt: string;
  price: number;
  category: string;
  tagline: string;
  color: string; // brand accent
}

export const products: Product[] = [
  {
    id: "belt",
    name: "Premium Gym Belt",
    image: "/images/products/belt.jpg",
    imageAlt: "Athlete securing a weightlifting belt before a strength workout",
    price: 18500,
    category: "Strength",
    tagline: "10mm neoprene — core stability for heavy lifts",
    color: "#E6352B",
  },
  {
    id: "lifting-gloves",
    name: "Lifting Gloves",
    image: "/images/products/lifting-gloves.jpg",
    imageAlt: "Pair of lifting gloves with dumbbells ready for training",
    price: 9200,
    category: "Accessories",
    tagline: "Padded palm with ventilated back & wrist support",
    color: "#FFC400",
  },
  {
    id: "boxing-gloves",
    name: "Boxing Gloves",
    image: "/images/products/boxing-gloves.jpg",
    imageAlt: "Boxing gloves resting beside a gym ring",
    price: 28500,
    category: "Combat",
    tagline: "12 oz synthetic leather with quick‑lace system",
    color: "#2146F3",
  },
  {
    id: "bands",
    name: "Resistance Bands Set",
    image: "/images/products/bands.jpg",
    imageAlt: "Resistance bands and training straps arranged with gym shoes",
    price: 12400,
    category: "Recovery",
    tagline: "5 levels — light to extra‑heavy, includes carry bag",
    color: "#E6352B",
  },
  {
    id: "jump-rope",
    name: "Speed Jump Rope",
    image: "/images/products/jump-rope.jpg",
    imageAlt: "Jump ropes laid out on a gym floor",
    price: 4100,
    category: "Cardio",
    tagline: "Ball‑bearing handles, adjustable 10‑foot cable",
    color: "#FFC400",
  },
  {
    id: "towel",
    name: "Gym Towel",
    image: "/images/products/towel.jpg",
    imageAlt: "Athlete resting after a workout with a gym towel",
    price: 3200,
    category: "Essentials",
    tagline: "50×100 cm microfibre — quick‑dry & anti‑odour",
    color: "#2146F3",
  },
  {
    id: "shaker",
    name: "Shaker Bottle",
    image: "/images/products/shaker.jpg",
    imageAlt: "Protein shaker bottle set on gym equipment",
    price: 3600,
    category: "Nutrition",
    tagline: "700 ml BPA‑free with mixing ball & drip‑proof lid",
    color: "#E6352B",
  },
  {
    id: "wrist-wraps",
    name: "Wrist Wraps",
    image: "/images/products/wrist-wraps.jpg",
    imageAlt: "Athlete tightening a wrist wrap before strength training",
    price: 5800,
    category: "Accessories",
    tagline: "30 cm elastic with thumb loop & velcro closure",
    color: "#FFC400",
  },
  {
    id: "straps",
    name: "Lifting Straps",
    image: "/images/products/straps.jpg",
    imageAlt: "Athlete preparing lifting straps before a workout",
    price: 4800,
    category: "Strength",
    tagline: "Cotton webbing — 55 cm, 600 kg tensile strength",
    color: "#2146F3",
  },
  {
    id: "gym-bag",
    name: "Gym Duffel",
    image: "/images/products/gym-bag.jpg",
    imageAlt: "Gym duffel bag ready for a training session",
    price: 22400,
    category: "Essentials",
    tagline: "40 L ripstop nylon with separate shoe compartment",
    color: "#E6352B",
  },
];