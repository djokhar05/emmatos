export type BranchId = "alagbado" | "ipaja" | "isashi";
export type BranchIdOrAll = BranchId | "all";

export interface Branch {
  id: BranchId;
  name: string;
  zone: string;
  tagline: string;
  color: string;
  address: string;
  phone: string;
  hours: string;
  capacity: number;
  features: { label: string; detail: string }[];
}

export const BRANCH_COLORS: Record<BranchId, string> = {
  alagbado: "#E6352B",
  ipaja: "#FFC400",
  isashi: "#2146F3",
};

export const BRANCH_COLOR_NAMES: Record<BranchId, string> = {
  alagbado: "red",
  ipaja: "yellow",
  isashi: "blue",
};

export const branchesMeta: Record<BranchId, { name: string; zone: string; tagline: string }> = {
  alagbado: { name: "Alagbado", zone: "Alagbado, Lagos", tagline: "The forge" },
  ipaja: { name: "Ipaja", zone: "Ipaja, Lagos", tagline: "The engine room" },
  isashi: { name: "Isashi", zone: "Isashi, Lagos", tagline: "The new standard" },
};

export const branches: Branch[] = [
  {
    id: "alagbado",
    name: "Alagbado",
    zone: "Alagbado, Lagos",
    tagline: "The forge",
    color: "#E6352B",
    address: "3 Olu Street, off Lagos–Abeokuta Rd, Alagbado",
    phone: "+234 803 123 4567",
    hours: "05:00 – 22:00  ·  Mon–Sat • 07:00 – 18:00 Sun",
    capacity: 320,
    features: [
      { label: "Titan Stack", detail: "40+ stations" },
      { label: "Free Weights", detail: "2–50 kg dumb bells" },
      { label: "Group Classes", detail: "Yoga · Zumba · HIIT" },
    ],
  },
  {
    id: "ipaja",
    name: "Ipaja",
    zone: "Ipaja, Lagos",
    tagline: "The engine room",
    color: "#FFC400",
    address: "17 Ipaja Road, off Lagos–Badagry Express, Ipaja",
    phone: "+234 803 765 4321",
    hours: "24 hrs  ·  7 days  ·  365",
    capacity: 480,
    features: [
      { label: "Iron Yard", detail: "plate-loaded & machines" },
      { label: "Cardio Deck", detail: "35+ treamills + bikes" },
      { label: "Recovery Lounge", detail: "sauna · cold plunge" },
    ],
  },
  {
    id: "isashi",
    name: "Isashi",
    zone: "Isashi, Lagos",
    tagline: "The new standard",
    color: "#2146F3",
    address: "42 Freedom Way, Isashi, Lagos",
    phone: "+234 813 555 0199",
    hours: "05:30 – 21:00  ·  Mon–Sat • 08:00 – 17:00 Sun",
    capacity: 260,
    features: [
      { label: "Performance Rig", detail: "16 power racks" },
      { label: "Turf + Sled", detail: "30 m training floor" },
      { label: "PT Suites", detail: "3 private training rooms" },
    ],
  },
];