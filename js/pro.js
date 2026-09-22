// Entitlement state for the paid tier (unlocks Steel/Aluminum, hides ads).
//
// This is a placeholder: `isPro()` just reads a localStorage flag. Wiring it
// to a real purchase means, on a successful Stripe Checkout (or similar)
// redirect back to this app, calling `setPro(true)` — and ideally verifying
// the purchase against a server rather than trusting the client alone.

const STORAGE_KEY = "theatrebeams.isPro";

export function isPro() {
  return localStorage.getItem(STORAGE_KEY) === "true";
}

export function setPro(value) {
  localStorage.setItem(STORAGE_KEY, value ? "true" : "false");
}
