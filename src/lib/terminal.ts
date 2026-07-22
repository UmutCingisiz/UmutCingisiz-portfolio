/** Shared portfolio terminal open/toggle API (replaces synthetic Ctrl+` dispatch). */

export const TERMINAL_EVENT = "portfolio:terminal";

export type TerminalEventDetail =
  | { action: "open" }
  | { action: "close" }
  | { action: "toggle" };

function dispatch(detail: TerminalEventDetail) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<TerminalEventDetail>(TERMINAL_EVENT, { detail }));
}

export function openTerminal() {
  dispatch({ action: "open" });
}

export function closeTerminal() {
  dispatch({ action: "close" });
}

export function toggleTerminal() {
  dispatch({ action: "toggle" });
}
