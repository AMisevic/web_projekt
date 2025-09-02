document.addEventListener("DOMContentLoaded", () => {
  const sortDate = document.getElementById("sort-date");
  const sortValue = document.getElementById("sort-value");
  const applyBtn = document.getElementById("apply-filter");
  const resetBtn = document.getElementById("reset-filter");
  const list = document.getElementById("topup-list");

  const cards = Array.from(list.querySelectorAll(".topup-card"));
  const originalOrder = [...cards];

  function applyFilters() {
    let sorted = [...cards];

    // Sort by date if selected
    if (sortDate.value === "asc") {
      sorted.sort((a, b) => new Date(a.dataset.date) - new Date(b.dataset.date));
    } else if (sortDate.value === "desc") {
      sorted.sort((a, b) => new Date(b.dataset.date) - new Date(a.dataset.date));
    }

    // Sort by value if selected (applies after date sorting if both chosen)
    if (sortValue.value === "asc") {
      sorted.sort((a, b) => parseFloat(a.dataset.value) - parseFloat(b.dataset.value));
    } else if (sortValue.value === "desc") {
      sorted.sort((a, b) => parseFloat(b.dataset.value) - parseFloat(a.dataset.value));
    }

    list.innerHTML = "";
    sorted.forEach(card => list.appendChild(card));
  }

  applyBtn.addEventListener("click", applyFilters);

  resetBtn.addEventListener("click", () => {
    list.innerHTML = "";
    originalOrder.forEach(card => list.appendChild(card));
    sortDate.value = "";
    sortValue.value = "";
  });
});