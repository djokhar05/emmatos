import type { BranchId } from "./branches.ts";

export interface Member {
  id: string;
  name: string;
  email: string;
  branchId: BranchId;
  plan: "DAY" | "MONTHLY" | "QUARTERLY" | "ANNUAL";
  status: "ACTIVE" | "EXPIRING" | "EXPIRED";
  checkInsMonth: number;
  lastCheckIn: string;
  memberSince: string;
  avatarInitial?: string;
}

export const members: Member[] = [
  // — Alagbado —
  { id: "m01", name: "Adaeze Okafor",       email: "adaeze.okafo@emmatos.ng",   avatarInitial: "A", branchId: "alagbado", plan: "MONTHLY",   status: "ACTIVE",   checkInsMonth: 18, lastCheckIn: "2026-10-28", memberSince: "2025-03-12" },
  { id: "m02", name: "Chinedu Obi",         email: "chinedu.obi@emmatos.ng",    avatarInitial: "C", branchId: "alagbado", plan: "ANNUAL",    status: "ACTIVE",   checkInsMonth: 22, lastCheckIn: "2026-10-28", memberSince: "2024-01-20" },
  { id: "m03", name: "Funke Balogun",       email: "funke.balogun@emmatos.ng",  avatarInitial: "F", branchId: "alagbado", plan: "MONTHLY",   status: "ACTIVE",   checkInsMonth: 14, lastCheckIn: "2026-10-27", memberSince: "2026-02-04" },
  { id: "m04", name: "Tunde Adeyemi",       email: "tunde.adeyemi@emmatos.ng",  avatarInitial: "T", branchId: "alagbado", plan: "QUARTERLY", status: "EXPIRING", checkInsMonth: 11, lastCheckIn: "2026-10-25", memberSince: "2026-06-01" },
  { id: "m05", name: "Ngozi Eze",           email: "ngozi.eze@emmatos.ng",      avatarInitial: "N", branchId: "alagbado", plan: "MONTHLY",   status: "ACTIVE",   checkInsMonth: 20, lastCheckIn: "2026-10-28", memberSince: "2025-11-10" },
  { id: "m06", name: "Segun Alabi",         email: "segun.alabi@emmatos.ng",    avatarInitial: "S", branchId: "alagbado", plan: "DAY",       status: "ACTIVE",   checkInsMonth:  2, lastCheckIn: "2026-10-26", memberSince: "2026-09-15" },
  { id: "m07", name: "Amina Yusuf",         email: "amina.yusuf@emmatos.ng",    avatarInitial: "A", branchId: "alagbado", plan: "MONTHLY",   status: "EXPIRED",  checkInsMonth:  6, lastCheckIn: "2026-10-01", memberSince: "2025-07-22" },
  { id: "m08", name: "Kehinde Fashola",     email: "kehinde.fashola@emmatos.ng",avatarInitial: "K", branchId: "alagbado", plan: "ANNUAL",    status: "ACTIVE",   checkInsMonth: 25, lastCheckIn: "2026-10-28", memberSince: "2024-06-30" },
  { id: "m09", name: "Bola Ogunleye",       email: "bola.ogunleye@emmatos.ng",  avatarInitial: "B", branchId: "alagbado", plan: "MONTHLY",   status: "EXPIRING", checkInsMonth:  9, lastCheckIn: "2026-10-24", memberSince: "2026-03-18" },
  // — Ipaja —
  { id: "m10", name: "Emeka Nwosu",         email: "emeka.nwosu@emmatos.ng",    avatarInitial: "E", branchId: "ipaja",    plan: "MONTHLY",   status: "ACTIVE",   checkInsMonth: 19, lastCheckIn: "2026-10-28", memberSince: "2025-09-01" },
  { id: "m11", name: "Tola Martins",        email: "tola.martins@emmatos.ng",   avatarInitial: "T", branchId: "ipaja",    plan: "ANNUAL",    status: "ACTIVE",   checkInsMonth: 28, lastCheckIn: "2026-10-28", memberSince: "2024-11-12" },
  { id: "m12", name: "Yetunde Lawal",       email: "yetunde.lawal@emmatos.ng",  avatarInitial: "Y", branchId: "ipaja",    plan: "MONTHLY",   status: "ACTIVE",   checkInsMonth: 15, lastCheckIn: "2026-10-27", memberSince: "2026-01-05" },
  { id: "m13", name: "Kunle Ajayi",         email: "kunle.ajayi@emmatos.ng",    avatarInitial: "K", branchId: "ipaja",    plan: "QUARTERLY", status: "ACTIVE",   checkInsMonth: 12, lastCheckIn: "2026-10-26", memberSince: "2025-08-14" },
  { id: "m14", name: "Fatima Bello",        email: "fatima.bello@emmatos.ng",   avatarInitial: "F", branchId: "ipaja",    plan: "MONTHLY",   status: "EXPIRING", checkInsMonth: 16, lastCheckIn: "2026-10-28", memberSince: "2026-05-20" },
  { id: "m15", name: "Rotimi Cole",         email: "rotimi.cole@emmatos.ng",    avatarInitial: "R", branchId: "ipaja",    plan: "DAY",       status: "ACTIVE",   checkInsMonth:  4, lastCheckIn: "2026-10-27", memberSince: "2026-08-03" },
  { id: "m16", name: "Chiamaka Umeh",       email: "chiamaka.umeh@emmatos.ng",  avatarInitial: "C", branchId: "ipaja",    plan: "ANNUAL",    status: "ACTIVE",   checkInsMonth: 21, lastCheckIn: "2026-10-28", memberSince: "2024-04-10" },
  { id: "m17", name: "Dele Osho",           email: "dele.osho@emmatos.ng",      avatarInitial: "D", branchId: "ipaja",    plan: "MONTHLY",   status: "EXPIRED",  checkInsMonth:  7, lastCheckIn: "2026-09-28", memberSince: "2025-12-01" },
  { id: "m18", name: "Halima Jibril",       email: "halima.jibril@emmatos.ng",  avatarInitial: "H", branchId: "ipaja",    plan: "MONTHLY",   status: "EXPIRING", checkInsMonth: 10, lastCheckIn: "2026-10-22", memberSince: "2026-07-15" },
  // — Isashi —
  { id: "m19", name: "Femi Adesina",        email: "femi.adesina@emmatos.ng",   avatarInitial: "F", branchId: "isashi",   plan: "MONTHLY",   status: "ACTIVE",   checkInsMonth: 17, lastCheckIn: "2026-10-28", memberSince: "2025-10-05" },
  { id: "m20", name: "Obinna Eze",          email: "obinna.eze@emmatos.ng",     avatarInitial: "O", branchId: "isashi",   plan: "ANNUAL",    status: "ACTIVE",   checkInsMonth: 24, lastCheckIn: "2026-10-28", memberSince: "2024-09-22" },
  { id: "m21", name: "Simi Davies",         email: "simi.davies@emmatos.ng",    avatarInitial: "S", branchId: "isashi",   plan: "MONTHLY",   status: "ACTIVE",   checkInsMonth: 13, lastCheckIn: "2026-10-27", memberSince: "2026-04-14" },
  { id: "m22", name: "Lanre Gbajabiamila",  email: "lanre.gbaja@emmatos.ng",    avatarInitial: "L", branchId: "isashi",   plan: "QUARTERLY", status: "ACTIVE",   checkInsMonth: 11, lastCheckIn: "2026-10-26", memberSince: "2025-06-30" },
  { id: "m23", name: "Yewa Osundina",       email: "yewa.osundina@emmatos.ng",  avatarInitial: "Y", branchId: "isashi",   plan: "MONTHLY",   status: "EXPIRING", checkInsMonth: 11, lastCheckIn: "2026-10-28", memberSince: "2026-08-10" },
  { id: "m24", name: "Kolawole Ajanaku",    email: "kola.ajanaku@emmatos.ng",   avatarInitial: "K", branchId: "isashi",   plan: "DAY",       status: "ACTIVE",   checkInsMonth:  3, lastCheckIn: "2026-10-25", memberSince: "2026-10-01" },
  { id: "m25", name: "Ife Ogunbor",         email: "ife.ogunbor@emmatos.ng",    avatarInitial: "I", branchId: "isashi",   plan: "ANNUAL",    status: "ACTIVE",   checkInsMonth: 20, lastCheckIn: "2026-10-28", memberSince: "2024-12-12" },
  { id: "m26", name: "Ebiowei Dappa",       email: "ebiowei.dappa@emmatos.ng",  avatarInitial: "E", branchId: "isashi",   plan: "MONTHLY",   status: "EXPIRED",  checkInsMonth:  5, lastCheckIn: "2026-09-15", memberSince: "2025-11-20" },
  { id: "m27", name: "Zara Kuti",           email: "zara.kuti@emmatos.ng",      avatarInitial: "Z", branchId: "isashi",   plan: "MONTHLY",   status: "ACTIVE",   checkInsMonth:  8, lastCheckIn: "2026-10-28", memberSince: "2026-05-01" },
];