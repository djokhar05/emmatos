export interface Trainer {
  id: string;
  name: string;
  role: string;
  branch: string;
  branchColor: string;
  bio: string;
  specialties: string[];
  image: string;
  certifications: string;
  instagram: string;
}

export const trainers: Trainer[] = [
  {
    id: "kolade",
    name: "Kolade Adeyemi",
    role: "Head Strength Coach",
    branch: "Alagbado",
    branchColor: "#E6352B",
    bio: "10 years on the floor. Kolade has coached everyone from first-timers to competitive powerlifters. His programming is brutally simple and brutally effective.",
    specialties: ["Powerlifting", "Hypertrophy", "Injury rehab"],
    image: "/images/coach1.webp",
    certifications: "NSCA-CSCS · NPC Judge",
    instagram: "@kolade.lifts",
  },
  {
    id: "amaka",
    name: "Amaka Osei",
    role: "Performance & Conditioning",
    branch: "Ipaja",
    branchColor: "#FFC400",
    bio: "Former national sprinter turned conditioning coach. Amaka builds athletes who move fast, recover faster, and never skip a session.",
    specialties: ["HIIT", "Sprint mechanics", "Metabolic conditioning"],
    image: "/images/coach2.webp",
    certifications: "ACSM-CPT · Athletics Nigeria",
    instagram: "@amaka.runs",
  },
  {
    id: "tunde",
    name: "Tunde Fashola",
    role: "Functional Movement Specialist",
    branch: "Isashi",
    branchColor: "#2146F3",
    bio: "Tunde's sessions blend mobility, strength and mindset. He's the coach members come back to when everything else stops working.",
    specialties: ["Functional training", "Mobility", "Body recomposition"],
    image: "/images/coach3.webp",
    certifications: "NASM-CPT · FMS Level 2",
    instagram: "@tunde.moves",
  },
];
