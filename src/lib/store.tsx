import { useEffect, useState } from "react";
import type { BranchId, BranchIdOrAll } from "../data/branches.ts";

export interface BranchStore {
  branch: BranchIdOrAll;
  set(b: BranchIdOrAll): void;
}

/* ── Global state ─────────────────────────────────── */
let _branch: BranchIdOrAll = "all";
const _listeners = new Set<() => void>();

export function getBranch(): BranchIdOrAll {
  return _branch;
}

export function setBranch(b: BranchIdOrAll): void {
  if (b === _branch) return;
  _branch = b;
  _listeners.forEach((fn) => fn());
}

function subscribe(fn: () => void): () => void {
  _listeners.add(fn);
  return () => void _listeners.delete(fn);
}

/* ── React hook ───────────────────────────────────── */
export function useBranch(): BranchStore {
  const [branch, setLocal] = useState<BranchIdOrAll>(_branch);
  useEffect(() => {
    const unsub = subscribe(() => setLocal(_branch));
    return unsub;
  }, []);
  return {
    branch,
    set: (b: BranchIdOrAll) => setBranch(b),
  };
}

/* ── Helpers ──────────────────────────────────────── */
export const BRANCH_ORDER: BranchId[] = ["alagbado", "ipaja", "isashi"];

export function branchOf(b: BranchIdOrAll): BranchId | undefined {
  return b === "all" ? undefined : b;
}