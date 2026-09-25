import { MATERIALS, LOAD_CASES, pliFromFloorLoad, solveRequiredInertia } from "./beamMath.js";
import { recommendSizes } from "./lumber.js";
import { STEEL_SHAPES, ALUMINUM_SHAPES, recommendMetalSizes } from "./metalShapes.js";
import { isPro, setPro } from "./pro.js";
import { diagramFor, simplifiedDiagramFor, simplifiedCaptionFor } from "./diagrams.js";

const form = document.getElementById("beam-form");
const materialField = document.getElementById("material-field");
const results = document.getElementById("results");
const resultsBody = document.getElementById("results-body");
const errorBox = document.getElementById("form-error");
const adSlot = document.getElementById("ad-slot");
const proToggle = document.getElementById("pro-dev-toggle");
const proBadgeArea = document.getElementById("pro-status");
const caseSelect = document.getElementById("load-case");
const caseDiagram = document.getElementById("case-diagram");
const caseDiagramSimple = document.getElementById("case-diagram-simple");
const caseDiagramCaption = document.getElementById("case-diagram-caption");

function renderCaseDiagram() {
  caseDiagram.innerHTML = diagramFor(caseSelect.value);
  caseDiagramSimple.innerHTML = simplifiedDiagramFor(caseSelect.value);
  caseDiagramCaption.textContent = simplifiedCaptionFor(caseSelect.value);
}

caseSelect.addEventListener("change", renderCaseDiagram);

function renderMaterialOptions() {
  materialField.innerHTML = "";
  Object.values(MATERIALS).forEach((material) => {
    const locked = material.tier === "pro" && !isPro();
    const label = document.createElement("label");
    label.className = "material-option" + (locked ? " material-option--locked" : "");

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "material";
    input.value = material.id;
    input.disabled = locked;
    if (material.id === "pine") input.checked = true;

    const span = document.createElement("span");
    span.textContent = material.label + (locked ? " (Pro)" : "");

    label.appendChild(input);
    label.appendChild(span);
    materialField.appendChild(label);
  });
}

function renderProStatus() {
  proBadgeArea.textContent = isPro() ? "Pro unlocked — Steel & Aluminum available, ads off" : "Free version";
  adSlot.hidden = isPro();
  proToggle.checked = isPro();
  renderMaterialOptions();
}

proToggle.addEventListener("change", () => {
  setPro(proToggle.checked);
  renderProStatus();
});

function showError(message) {
  errorBox.textContent = message;
  errorBox.hidden = !message;
}

function parsePositiveNumber(value, fieldLabel) {
  const num = Number(value);
  if (!value || Number.isNaN(num) || num <= 0) {
    throw new Error(`${fieldLabel} must be a number greater than zero.`);
  }
  return num;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  showError("");

  const data = new FormData(form);
  const materialId = data.get("material");
  const caseId = data.get("loadCase");

  try {
    const spanIn = parsePositiveNumber(data.get("span"), "Span");
    const psf = parsePositiveNumber(data.get("floorLoad"), "Floor load");
    const spacingIn = parsePositiveNumber(data.get("spacing"), "Beam spacing");

    const material = MATERIALS[materialId];
    if (material.tier === "pro" && !isPro()) {
      throw new Error("That material is part of the Pro version.");
    }

    const pli = pliFromFloorLoad(psf, spacingIn);
    const requiredInertia = solveRequiredInertia({ caseId, spanIn, pli, E: material.E });
    const deflectionLimit = spanIn / LOAD_CASES[caseId].deflectionRatio;
    const recommendations =
      materialId === "steel"
        ? recommendMetalSizes(STEEL_SHAPES, requiredInertia)
        : materialId === "aluminum"
        ? recommendMetalSizes(ALUMINUM_SHAPES, requiredInertia)
        : recommendSizes(requiredInertia).map((rec) => ({ category: rec.category, text: rec.text }));

    renderResults({ material, caseId, spanIn, pli, requiredInertia, deflectionLimit, recommendations });
  } catch (err) {
    results.hidden = true;
    showError(err.message);
  }
});

function renderResults({ material, caseId, spanIn, pli, requiredInertia, deflectionLimit, recommendations }) {
  const loadCase = LOAD_CASES[caseId];

  const summary = document.createElement("p");
  summary.className = "results-summary";
  summary.textContent =
    `${material.label}, ${loadCase.label.toLowerCase()}, ${spanIn}" span: ` +
    `requires I ≥ ${requiredInertia.toFixed(3)} in⁴ ` +
    `(deflection limit L/${loadCase.deflectionRatio} = ${deflectionLimit.toFixed(3)}", ` +
    `${pli.toFixed(3)} lb/in distributed load).`;

  resultsBody.innerHTML = "";
  resultsBody.appendChild(summary);

  const list = document.createElement("ul");
  list.className = "size-list";
  recommendations.forEach((rec) => {
    const item = document.createElement("li");
    const category = rec.grade ? `${rec.category} (${rec.grade})` : rec.category;
    item.textContent = `${category}: ${rec.text}`;
    list.appendChild(item);
  });
  resultsBody.appendChild(list);

  if (material.tier === "pro") {
    const note = document.createElement("p");
    note.className = "results-note";
    note.textContent =
      "Sizes are drawn from a curated catalog of common shapes, not a full mill catalog — verify availability with your supplier.";
    resultsBody.appendChild(note);
  }

  results.hidden = false;
}

renderProStatus();
renderCaseDiagram();

if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}
