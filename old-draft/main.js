// Edit this list to change what the shop sells. Prices are placeholders.
const PRODUCTS = [
  { id: "vanilla-chai", name: "Vanilla chai", notes: "Warm cardamom, cinnamon and creamy vanilla.", price: 499 },
  { id: "jasmine-night", name: "Jasmine night", notes: "Fresh jasmine with a soft musk base.", price: 549 },
  { id: "sandalwood", name: "Sandalwood", notes: "Smooth, woody and slightly sweet.", price: 599 },
  { id: "monsoon-rain", name: "Monsoon rain", notes: "Clean petrichor, green leaves and cool air.", price: 499 },
  { id: "orange-clove", name: "Orange and clove", notes: "Bright citrus peel with a spiced edge.", price: 479 }
];

const ORDER_EMAIL = "hello@example.com"; // replace with your real email
const CURRENCY = "₹";

const cart = {}; // id -> quantity

const $ = (id) => document.getElementById(id);
const money = (n) => CURRENCY + n.toLocaleString("en-IN");

function renderProducts() {
  $("product-list").innerHTML = PRODUCTS.map((p) => `
    <li class="item">
      <h3>${p.name}</h3>
      <span class="price">${money(p.price)}</span>
      <p class="notes">${p.notes}</p>
      <button class="btn" type="button" data-add="${p.id}">Add to order</button>
    </li>`).join("");
}

function renderCart() {
  const lines = PRODUCTS.filter((p) => cart[p.id]);
  const total = lines.reduce((sum, p) => sum + p.price * cart[p.id], 0);

  $("cart").innerHTML = lines.map((p) => `
    <li>
      <span>${p.name}</span>
      <span class="qty">
        <button type="button" data-dec="${p.id}" aria-label="Remove one ${p.name}">−</button>
        <span aria-live="polite">${cart[p.id]}</span>
        <button type="button" data-add="${p.id}" aria-label="Add one ${p.name}">+</button>
      </span>
      <span>${money(p.price * cart[p.id])}</span>
    </li>`).join("");

  const has = lines.length > 0;
  $("empty").hidden = has;
  $("total").hidden = !has;
  $("send").hidden = !has;
  $("total").textContent = "Total: " + money(total);

  const body = lines.map((p) => `${cart[p.id]} x ${p.name} (${money(p.price * cart[p.id])})`).join("\n")
    + `\n\nTotal: ${money(total)}\n\nName:\nDelivery address:\n`;
  $("send").href = `mailto:${ORDER_EMAIL}?subject=${encodeURIComponent("Candle order")}&body=${encodeURIComponent(body)}`;
}

document.addEventListener("click", (e) => {
  const add = e.target.closest("[data-add]");
  const dec = e.target.closest("[data-dec]");
  if (add) cart[add.dataset.add] = (cart[add.dataset.add] || 0) + 1;
  if (dec) {
    const id = dec.dataset.dec;
    cart[id] = (cart[id] || 1) - 1;
    if (cart[id] <= 0) delete cart[id];
  }
  if (add || dec) renderCart();
});

renderProducts();
renderCart();
