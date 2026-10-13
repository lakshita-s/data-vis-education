// jump to first section button
document.getElementById("exploreButton").addEventListener("click", function () {
  document.getElementById("school-experience").scrollIntoView({
    behavior: "smooth",
  });
});

// used claude for help
// compare button to show combined chart
const compareButton = document.getElementById("compareButton");
const combinedChartContainer = document.getElementById(
  "combinedChartContainer",
);

compareButton.addEventListener("click", function () {
  combinedChartContainer.hidden = false;

  compareButton.textContent = "Comparison shown ✓";

  combinedChartContainer.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
});

// toggle insight sections
const insightSections = document.querySelectorAll(".insight-section");

insightSections.forEach((section) => {
  const button = section.querySelector(".insight-button");
  const text = section.querySelector(".insight-text");

  button.addEventListener("click", () => {
    const isHidden = text.hidden;

    text.hidden = !isHidden;
    button.setAttribute("aria-expanded", String(isHidden));
  });
});
