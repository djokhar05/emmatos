import { members, type Member } from "../data/members.ts";

export const MEMBER_PIN = "gym2026";

const KEY = "emmatos.member";

export function getSignedInMember(): Member | null {
  try {
    const id = sessionStorage.getItem(KEY);
    if (!id) return null;
    return members.find((m) => m.id === id) ?? null;
  } catch {
    return null;
  }
}

export function memberSignIn(email: string, pin: string): Member | null {
  if (pin !== MEMBER_PIN) return null;
  const member = members.find((m) => m.email.toLowerCase() === email.trim().toLowerCase());
  if (!member) return null;
  try {
    sessionStorage.setItem(KEY, member.id);
  } catch {
    /* ignore */
  }
  return member;
}

export function memberSignOut() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}