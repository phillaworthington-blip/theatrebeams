// Simple schematic diagrams for each loading condition, drawn as inline SVG so
// they inherit the page's light/dark theme via currentColor / CSS variables.

function loadArrows(xStart, xEnd, topY, beamY, count) {
  const step = (xEnd - xStart) / (count - 1);
  let arrows = "";
  for (let i = 0; i < count; i++) {
    const x = xStart + step * i;
    arrows += `<line x1="${x}" y1="${topY}" x2="${x}" y2="${beamY - 3}" marker-end="url(#arrowhead)" />`;
  }
  arrows += `<line x1="${xStart}" y1="${topY}" x2="${xEnd}" y2="${topY}" />`;
  return arrows;
}

function spanDimension(xStart, xEnd, y) {
  return `
    <line x1="${xStart}" y1="${y}" x2="${xEnd}" y2="${y}" marker-start="url(#dimend)" marker-end="url(#dimend)" />
    <text x="${(xStart + xEnd) / 2}" y="${y + 16}" text-anchor="middle" class="diagram-label">L</text>
  `;
}

const DEFS = `
  <defs>
    <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="4" refY="7" orient="auto">
      <path d="M0,0 L8,0 L4,8 Z" fill="currentColor" />
    </marker>
    <marker id="dimend" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8" fill="none" stroke="currentColor" stroke-width="1" />
    </marker>
  </defs>
`;

function pinSupport(x, y) {
  return `
    <path d="M${x - 10},${y + 18} L${x},${y} L${x + 10},${y + 18} Z" fill="none" stroke="currentColor" stroke-width="2" />
    <line x1="${x - 14}" y1="${y + 18}" x2="${x + 14}" y2="${y + 18}" />
    ${hatch(x - 14, x + 14, y + 18)}
  `;
}

function hatch(xStart, xEnd, y) {
  let lines = "";
  for (let x = xStart; x < xEnd; x += 6) {
    lines += `<line x1="${x}" y1="${y}" x2="${x - 5}" y2="${y + 8}" />`;
  }
  return lines;
}

function fixedSupport(x, yTop, yBottom) {
  return `
    <line x1="${x}" y1="${yTop}" x2="${x}" y2="${yBottom}" stroke-width="3" />
    ${hatch(x, x, yTop).replace(/x1="\d+"/, `x1="${x}"`)}
    ${verticalHatch(x, yTop, yBottom)}
  `;
}

function verticalHatch(x, yTop, yBottom) {
  let lines = "";
  for (let y = yTop; y < yBottom; y += 8) {
    lines += `<line x1="${x}" y1="${y}" x2="${x - 8}" y2="${y + 8}" />`;
  }
  return lines;
}

const STYLE = `
  <style>
    line, path { stroke: currentColor; }
    .diagram-label { fill: currentColor; font-size: 13px; font-family: system-ui, sans-serif; }
  </style>
`;

export function simpleSpanDiagram() {
  const xStart = 40;
  const xEnd = 260;
  const beamY = 60;
  return `
    <svg viewBox="0 0 300 130" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Simple span with an evenly distributed load">
      ${STYLE}${DEFS}
      <g stroke-width="1.5" fill="none">
        ${loadArrows(xStart, xEnd, 22, beamY, 7)}
        <line x1="${xStart}" y1="${beamY}" x2="${xEnd}" y2="${beamY}" stroke-width="4" />
        ${pinSupport(xStart, beamY)}
        ${pinSupport(xEnd, beamY)}
        ${spanDimension(xStart, xEnd, 100)}
      </g>
    </svg>
  `;
}

export function cantileverDiagram() {
  const xStart = 40;
  const xEnd = 260;
  const beamY = 60;
  return `
    <svg viewBox="0 0 300 130" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cantilever with an evenly distributed load">
      ${STYLE}${DEFS}
      <g stroke-width="1.5" fill="none">
        ${loadArrows(xStart, xEnd, 22, beamY, 7)}
        <line x1="${xStart}" y1="${beamY}" x2="${xEnd}" y2="${beamY}" stroke-width="4" />
        ${fixedSupport(xStart, beamY - 30, beamY + 30)}
        ${spanDimension(xStart, xEnd, 100)}
      </g>
    </svg>
  `;
}

export function diagramFor(caseId) {
  return caseId === "cantilever" ? cantileverDiagram() : simpleSpanDiagram();
}

// Plain-language illustrations paired with the technical diagrams above, so a
// beginner has something concrete to anchor the abstraction to.

export function bridgeDiagram() {
  return `
    <svg viewBox="0 0 300 130" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A simple bridge deck resting on two piers">
      <rect x="20" y="88" width="260" height="22" fill="#bcd9ee" />
      <rect x="30" y="70" width="34" height="50" rx="3" fill="#8a97a3" stroke="#5c6672" stroke-width="2" />
      <rect x="236" y="70" width="34" height="50" rx="3" fill="#8a97a3" stroke="#5c6672" stroke-width="2" />
      <rect x="22" y="58" width="256" height="14" rx="3" fill="#3a3f44" stroke="#202427" stroke-width="2" />
      <line x1="34" y1="65" x2="266" y2="65" stroke="#e6c14a" stroke-width="2" stroke-dasharray="10 8" />
      <line x1="22" y1="58" x2="22" y2="46" stroke="#3a3f44" stroke-width="3" />
      <line x1="278" y1="58" x2="278" y2="46" stroke="#3a3f44" stroke-width="3" />
      <line x1="22" y1="46" x2="278" y2="46" stroke="#3a3f44" stroke-width="3" />
    </svg>
  `;
}

export function divingBoardDiagram() {
  return `
    <svg viewBox="0 0 300 130" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A diving board fixed to a platform at one end, free at the other">
      <rect x="20" y="80" width="260" height="30" fill="#bcd9ee" />
      <path d="M20,80 q10,-6 20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0 V130 H20 Z" fill="#bcd9ee" opacity="0.6" />
      <rect x="20" y="34" width="46" height="52" fill="#8a97a3" stroke="#5c6672" stroke-width="2" />
      <rect x="60" y="50" width="200" height="10" rx="3" fill="#f4f5f7" stroke="#5c6672" stroke-width="2" />
    </svg>
  `;
}

export function simplifiedDiagramFor(caseId) {
  return caseId === "cantilever" ? divingBoardDiagram() : bridgeDiagram();
}

export function simplifiedCaptionFor(caseId) {
  return caseId === "cantilever" ? "Think of it like a diving board" : "Think of it like a bridge";
}
