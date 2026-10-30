import type { BranchId } from "./branches.ts";

export interface CheckIn {
  id: string;
  name: string;
  branchId: BranchId;
  at: string;
  tag: "CHECK-IN" | "CLASS" | "RENEWAL" | "NEW MEMBER";
}

export const checkins: CheckIn[] = [
  { id: "c01", name: "Adaeze Okafor",      branchId: "alagbado", at: "05:12", tag: "CHECK-IN" },
  { id: "c02", name: "Emeka Nwosu",        branchId: "ipaja",    at: "05:15", tag: "CHECK-IN" },
  { id: "c03", name: "Chinedu Obi",        branchId: "alagbado", at: "05:44", tag: "CLASS" },
  { id: "c04", name: "Femi Adesina",       branchId: "isashi",   at: "05:52", tag: "CHECK-IN" },
  { id: "c05", name: "Tola Martins",       branchId: "ipaja",    at: "06:08", tag: "CHECK-IN" },
  { id: "c06", name: "Funke Balogun",      branchId: "alagbado", at: "06:17", tag: "CHECK-IN" },
  { id: "c07", name: "Yetunde Lawal",      branchId: "ipaja",    at: "06:23", tag: "RENEWAL" },
  { id: "c08", name: "Obinna Eze",         branchId: "isashi",   at: "06:31", tag: "CHECK-IN" },
  { id: "c09", name: "Segun Alabi",        branchId: "alagbado", at: "06:45", tag: "CHECK-IN" },
  { id: "c10", name: "Kunle Ajayi",        branchId: "ipaja",    at: "06:58", tag: "CLASS" },
  { id: "c11", name: "Simi Davies",        branchId: "isashi",   at: "07:05", tag: "NEW MEMBER" },
  { id: "c12", name: "Kehinde Fashola",    branchId: "alagbado", at: "07:13", tag: "CHECK-IN" },
  { id: "c13", name: "Fatima Bello",       branchId: "ipaja",    at: "07:22", tag: "CHECK-IN" },
  { id: "c14", name: "Lanre Gbajabiamila", branchId: "isashi",   at: "07:34", tag: "CHECK-IN" },
  { id: "c15", name: "Tunde Adeyemi",      branchId: "alagbado", at: "07:41", tag: "CHECK-IN" },
  { id: "c16", name: "Halima Jibril",      branchId: "ipaja",    at: "07:48", tag: "CHECK-IN" },
  { id: "c17", name: "Yewa Osundina",      branchId: "isashi",   at: "07:55", tag: "CLASS" },
  { id: "c18", name: "Ngozi Eze",          branchId: "alagbado", at: "08:02", tag: "CHECK-IN" },
  { id: "c19", name: "Rotimi Cole",        branchId: "ipaja",    at: "08:11", tag: "CHECK-IN" },
  { id: "c20", name: "Ife Ogunbor",        branchId: "isashi",   at: "08:18", tag: "CHECK-IN" },
  { id: "c21", name: "Bola Ogunleye",      branchId: "alagbado", at: "08:29", tag: "CHECK-IN" },
  { id: "c22", name: "Dele Osho",          branchId: "ipaja",    at: "08:36", tag: "RENEWAL" },
  { id: "c23", name: "Zara Kuti",          branchId: "isashi",   at: "08:44", tag: "CHECK-IN" },
  { id: "c24", name: "Chiamaka Umeh",      branchId: "ipaja",    at: "09:01", tag: "CHECK-IN" },
  { id: "c25", name: "Adaeze Okafor",      branchId: "alagbado", at: "09:12", tag: "CHECK-IN" },
];