export const DEMO_EMAIL = "admin@emmatos.ng";
export const DEMO_PASSWORD = "front-desk";

const KEY = "emmatos.admin";

export function isAuthed(): boolean {
  try {
    return sessionStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

export function signIn(email: string, password: string): boolean {
  const ok = email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD;
  if (ok) {
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* ignore storage errors */
    }
    return true;
  }
  return false;
}

export function signOut() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}