import type { BranchId } from "./branches.ts";

export interface GymClass {
  id: string;
  name: string;
  type: "HIIT" | "Yoga" | "Spinning" | "Boxing" | "Zumba" | "Pilates";
  branchId: BranchId;
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";
  time: string;
  instructor: string;
  capacity: number;
  booked: number;
}

export const gymClasses: GymClass[] = [
  { id: "cl01", name: "Morning HIIT",       type: "HIIT",     branchId: "alagbado", day: "Monday",    time: "06:30", instructor: "Tunde",   capacity: 24, booked: 18 },
  { id: "cl02", name: "Power Yoga",          type: "Yoga",     branchId: "ipaja",    day: "Wednesday", time: "07:00", instructor: "Simi",    capacity: 20, booked: 14 },
  { id: "cl03", name: "Evening Spin",        type: "Spinning", branchId: "isashi",   day: "Friday",    time: "17:30", instructor: "Zara",    capacity: 18, booked: 16 },
  { id: "cl04", name: "Boxing Circuit",       type: "Boxing",   branchId: "alagbado", day: "Tuesday",   time: "18:00", instructor: "Chinedu", capacity: 16, booked: 12 },
  { id: "cl05", name: "Zumba Flow",          type: "Zumba",    branchId: "ipaja",    day: "Monday",    time: "07:30", instructor: "Funke",   capacity: 30, booked: 22 },
  { id: "cl06", name: "Pilates Reformer",    type: "Pilates",  branchId: "isashi",   day: "Thursday",  time: "06:00", instructor: "Ngozi",   capacity: 16, booked: 10 },
  { id: "cl07", name: "HIIT Express",        type: "HIIT",     branchId: "ipaja",    day: "Saturday",  time: "08:00", instructor: "Tunde",   capacity: 20, booked: 15 },
  { id: "cl08", name: "Yoga Unwind",         type: "Yoga",     branchId: "isashi",   day: "Tuesday",   time: "18:30", instructor: "Yewa",    capacity: 20, booked: 19 },
  { id: "cl09", name: "Friday Night Ride",   type: "Spinning", branchId: "alagbado", day: "Friday",    time: "18:00", instructor: "Kolawole",capacity: 18, booked: 18 },
  { id: "cl10", name: "Weekend Warrior HIIT",type: "HIIT",     branchId: "isashi",   day: "Saturday",  time: "09:00", instructor: "Obinna",  capacity: 24, booked: 20 },
];