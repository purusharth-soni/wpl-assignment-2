document.addEventListener("DOMContentLoaded", () => {
  const dateElement = document.getElementById("datetime");
  const now = new Date();
  dateElement.textContent = now.toLocaleString();
});
