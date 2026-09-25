// Beam case formulas after Sammler & Holden, "Structural Design for the Stage."
// All lengths in inches, loads in pounds, E (modulus of elasticity) in psi.

export const MATERIALS = {
  pine: { id: "pine", label: "Pine", E: 1200000, tier: "free" },
  // poplar: { id: "poplar", label: "Poplar", E: 1580000, tier: "free" },
  douglasFir: { id: "douglasFir", label: "Doug Fir No. 2", E: 1600000, tier: "free" },
  steel: { id: "steel", label: "Steel", E: 29000000, tier: "pro" },
  aluminum: { id: "aluminum", label: "Aluminum", E: 10100000, tier: "pro" },
};

export const LOAD_CASES = {
  simple: {
    id: "simple",
    label: "Simple span, evenly distributed load",
    spanFieldLabel: "Span (inches); how wide is your bridge?",
    deflectionRatio: 240,
    requiredInertia(pli, spanIn, E, deflectionIn) {
      return (5 * pli * spanIn ** 4) / (384 * E * deflectionIn);
    },
  },
  cantilever: {
    id: "cantilever",
    label: "Cantilever, evenly distributed load",
    spanFieldLabel: "Span: How long is your overhang?",
    deflectionRatio: 360,
    requiredInertia(pli, spanIn, E, deflectionIn) {
      return (pli * spanIn ** 4) / (8 * E * deflectionIn);
    },
  },
};

// A floor/deck load in pounds per square foot, spread over a beam spaced
// `spacingIn` inches on center, converted to pounds per linear inch of beam.
export function pliFromFloorLoad(psf, spacingIn) {
  const plf = psf * (spacingIn / 12);
  return plf / 12;
}

export function solveRequiredInertia({ caseId, spanIn, pli, E }) {
  const loadCase = LOAD_CASES[caseId];
  const deflectionIn = spanIn / loadCase.deflectionRatio;
  return loadCase.requiredInertia(pli, spanIn, E, deflectionIn);
}
