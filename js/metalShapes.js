// Curated shape catalogs for steel and aluminum, adapted from the appendices of
// Holden & Sammler, "Structural Design for the Stage," 2nd ed. (Focal Press).
// Steel tables adapted from the AISC Steel Construction Manual; aluminum tables
// adapted from the Aluminum Association's Aluminum Design Manual (2010).
//
// Each shape's `Fy` (yield strength, psi) is carried for reference/labeling only —
// this app currently checks deflection, not bending/shear strength.
//
// `I` is the strong-axis moment of inertia, in^4, at that size.

export const STEEL_SHAPES = {
  pipe: {
    label: "Pipe",
    grade: "ASTM A53 Grade A, Std. Weight (Sch. 40)",
    Fy: 30000,
    sizes: [
      { designation: '1/2" STD', I: 0.016 },
      { designation: '3/4" STD', I: 0.035 },
      { designation: '1" STD', I: 0.083 },
      { designation: '1-1/4" STD', I: 0.184 },
      { designation: '1-1/2" STD', I: 0.293 },
      { designation: '2" STD', I: 0.627 },
      { designation: '2-1/2" STD', I: 1.45 },
      { designation: '3" STD', I: 2.85 },
      { designation: '3-1/2" STD', I: 4.52 },
      { designation: '4" STD', I: 6.82 },
    ],
  },
  roundTube: {
    label: "Round Mechanical Tube",
    grade: "ASTM A513, Type MT1010",
    Fy: 32000,
    sizes: [
      { designation: "0.500 OD x 0.065 wall", I: 0.002 },
      { designation: "0.625 OD x 0.065 wall", I: 0.004 },
      { designation: "0.750 OD x 0.065 wall", I: 0.008 },
      { designation: "0.875 OD x 0.065 wall", I: 0.013 },
      { designation: "1.000 OD x 0.065 wall", I: 0.020 },
      { designation: "1.125 OD x 0.065 wall", I: 0.030 },
      { designation: "1.250 OD x 0.083 wall", I: 0.052 },
      { designation: "1.375 OD x 0.083 wall", I: 0.070 },
      { designation: "1.500 OD x 0.083 wall", I: 0.093 },
    ],
  },
  angle: {
    label: "Angle",
    grade: "ASTM A36",
    Fy: 36000,
    sizes: [
      { designation: "L2 x 2 x 1/8", I: 0.189 },
      { designation: "L2-1/2 x 2 x 3/16", I: 0.511 },
      { designation: "L3 x 2 x 3/16", I: 0.847 },
      { designation: "L3 x 3 x 3/16", I: 0.948 },
      { designation: "L3-1/2 x 3 x 1/4", I: 1.92 },
      { designation: "L4 x 3 x 1/4", I: 2.75 },
      { designation: "L4 x 4 x 1/4", I: 3.00 },
    ],
  },
  channel: {
    label: "C-Channel",
    grade: "ASTM A36",
    Fy: 36000,
    sizes: [
      { designation: "C3 x 3.5", I: 1.57 },
      { designation: "C3 x 4.1", I: 1.65 },
      { designation: "C3 x 5", I: 1.85 },
      { designation: "C3 x 6", I: 2.07 },
      { designation: "C4 x 4.5", I: 3.65 },
      { designation: "C4 x 5.4", I: 3.85 },
      { designation: "C5 x 6.7", I: 7.48 },
    ],
  },
  sBeam: {
    label: "S I-Beam",
    grade: "ASTM A36",
    Fy: 36000,
    sizes: [
      { designation: "S3 x 5.7", I: 2.50 },
      { designation: "S3 x 7.5", I: 2.91 },
      { designation: "S4 x 7.7", I: 6.05 },
      { designation: "S4 x 9.5", I: 6.76 },
      { designation: "S5 x 10", I: 12.3 },
      { designation: "S6 x 12.5", I: 22.0 },
    ],
  },
  wBeam: {
    label: "W I-Beam",
    grade: "ASTM A992",
    Fy: 50000,
    sizes: [
      { designation: "W4 x 13", I: 11.3 },
      { designation: "W5 x 16", I: 21.4 },
      { designation: "W5 x 19", I: 26.3 },
      { designation: "W6 x 8.5", I: 14.9 },
      { designation: "W6 x 12", I: 22.1 },
      { designation: "W8 x 10", I: 30.8 },
    ],
  },
};

export const ALUMINUM_SHAPES = {
  roundTube: {
    label: "Round Tube",
    grade: "6061-T6 extrusion",
    Fy: 35000,
    sizes: [
      { designation: "0.500 OD x 0.049 wall", I: 0.002 },
      { designation: "0.750 OD x 0.049 wall", I: 0.007 },
      { designation: "1.000 OD x 0.065 wall", I: 0.021 },
      { designation: "1.250 OD x 0.063 wall", I: 0.041 },
      { designation: "1.500 OD x 0.063 wall", I: 0.073 },
      { designation: "2.000 OD x 0.063 wall", I: 0.179 },
      { designation: "2.500 OD x 0.063 wall", I: 0.356 },
      { designation: "3.000 OD x 0.063 wall", I: 0.622 },
    ],
  },
  squareTube: {
    label: "Square Tube",
    grade: "6061-T6 extrusion",
    Fy: 35000,
    sizes: [
      { designation: "0.75 x 0.75 x 0.065", I: 0.0141 },
      { designation: "1 x 1 x 0.065", I: 0.0356 },
      { designation: "1.25 x 1.25 x 0.065", I: 0.0723 },
      { designation: "1.5 x 1.5 x 0.065", I: 0.128 },
      { designation: "2 x 2 x 0.095", I: 0.439 },
      { designation: "2.5 x 2.5 x 0.125", I: 1.12 },
      { designation: "3 x 3 x 0.125", I: 1.98 },
      { designation: "4 x 4 x 0.125", I: 4.85 },
    ],
  },
  rectangularTube: {
    label: "Rectangular Tube",
    grade: "6061-T6 extrusion",
    Fy: 35000,
    sizes: [
      { designation: "1 x 2 x 1/8 (bending about the 2-in side)", I: 0.332 },
      { designation: "1.5 x 2 x 1/8 (bending about the 2-in side)", I: 0.442 },
      { designation: "1.5 x 3 x 1/8 (bending about the 3-in side)", I: 1.21 },
      { designation: "2 x 3 x 1/8 (bending about the 3-in side)", I: 1.47 },
      { designation: "2 x 4 x 1/8 (bending about the 4-in side)", I: 2.98 },
      { designation: "3 x 4 x 1/8 (bending about the 4-in side)", I: 3.92 },
      { designation: "3 x 4 x 1/4 (bending about the 4-in side)", I: 7.07 },
      { designation: "4 x 6 x 1/8 (bending about the 6-in side)", I: 12.6 },
    ],
  },
  iBeam: {
    label: "I-Beam",
    grade: "6061-T6 extrusion, Aluminum Association standard",
    Fy: 35000,
    sizes: [
      { designation: "3 x 1.64", I: 2.24 },
      { designation: "3 x 2.03", I: 2.71 },
      { designation: "4 x 2.31", I: 5.62 },
      { designation: "4 x 2.79", I: 6.71 },
      { designation: "5 x 3.70", I: 13.9 },
      { designation: "6 x 4.03", I: 22.0 },
    ],
  },
  pipe: {
    label: "Pipe",
    grade: "6063-T6, Schedule 40",
    Fy: 25000,
    sizes: [
      { designation: '1/2" Sch. 40', I: 0.0171 },
      { designation: '3/4" Sch. 40', I: 0.0370 },
      { designation: '1" Sch. 40', I: 0.0873 },
      { designation: '1-1/4" Sch. 40', I: 0.195 },
      { designation: '1-1/2" Sch. 40', I: 0.310 },
      { designation: '2" Sch. 40', I: 0.666 },
      { designation: '2-1/2" Sch. 40', I: 1.53 },
      { designation: '3" Sch. 40', I: 3.02 },
      { designation: '4" Sch. 40', I: 7.23 },
    ],
  },
};

// For a required moment of inertia, return the smallest adequate size in each
// shape family of the given catalog (mirrors lumber.js's recommendSizes).
export function recommendMetalSizes(catalog, requiredInertia) {
  return Object.values(catalog).map((family) => {
    const fit = family.sizes.find((size) => size.I >= requiredInertia);
    const largest = family.sizes[family.sizes.length - 1];
    const text = fit
      ? `${fit.designation} (I = ${fit.I} in⁴)`
      : `Beyond this catalog's largest ${largest.designation} — check a full mill catalog or an engineer`;
    return { category: family.label, grade: family.grade, text };
  });
}
