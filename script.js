const candle = document.getElementById("candle");
const hint = document.getElementById("hint");

candle.addEventListener("click", () => {
  const lit = document.body.classList.toggle("lit");
  candle.setAttribute("aria-pressed", String(lit));
  candle.setAttribute("aria-label", lit ? "Blow out the candle" : "Light the candle");
  hint.textContent = lit ? "Tap again to blow it out" : "Tap the candle to light it";
});
