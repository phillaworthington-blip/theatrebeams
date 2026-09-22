// Actual (dressed, S4S) dimensions for standard softwood dimensional lumber, in inches.
const ACTUAL_WIDTH = {
  3: 2.5,
  4: 3.5,
  5: 4.5,
  6: 5.5,
  8: 7.25,
  10: 9.25,
  12: 11.25,
  14: 13.25,
  16: 15.25,
};

const CATEGORIES = [
  { label: "1x", thickness: 0.75, sizes: [3, 4, 6, 8, 10, 12] },
  { label: "5/4x", thickness: 1.0, sizes: [3, 4, 6, 8, 10, 12] },
  { label: "2x", thickness: 1.5, sizes: [3, 4, 6, 8, 10, 12, 14] },
  { label: "3x", thickness: 2.5, sizes: [3, 4, 5, 6, 8, 10, 12, 14, 16] },
  { label: "4x", thickness: 3.5, sizes: [4, 5, 6, 8, 10, 12, 14] },
  { label: "6x", thickness: 5.5, sizes: [6, 8, 10, 12, 14, 16] },
];

function momentOfInertia(thickness, width) {
  return (thickness * width ** 3) / 12;
}

// For a required moment of inertia, return the smallest adequate size in
// each dimensional-lumber category (a beam can be built from any category
// that fits, so several options are shown side by side).
export function recommendSizes(requiredInertia) {
  const recommendations = [];

  CATEGORIES.forEach((category, index) => {
    const isLargestCategory = index === CATEGORIES.length - 1;
    const options = category.sizes.map((size) => ({
      size,
      inertia: momentOfInertia(category.thickness, ACTUAL_WIDTH[size]),
    }));
    const smallest = options[0];
    const largest = options[options.length - 1];

    if (requiredInertia <= smallest.inertia) {
      recommendations.push({
        category: category.label,
        text: `Use a ${category.label}${smallest.size} or larger`,
      });
      return;
    }

    if (requiredInertia > largest.inertia) {
      if (isLargestCategory) {
        recommendations.push({
          category: category.label,
          text: "Beyond typical dimensional lumber — consult a structural engineer",
        });
      }
      return;
    }

    const fit = options.find((option) => option.inertia >= requiredInertia);
    const text =
      fit.size === largest.size
        ? `Use a ${category.label}${fit.size} or larger`
        : `Could use a ${category.label}${fit.size}`;
    recommendations.push({ category: category.label, text });
  });

  return recommendations;
}
