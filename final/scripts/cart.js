function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// renderCartContents();
// removeListeners()
function renderCartContents() {
  const cartItems = getLocalStorage("cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  addTotal();
}

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <img src="${item.imageUrl}" alt="${item.menuName}" />
    <h2 class="card__name">${item.menuName}</h2>
    <div class="quantity-container">
      <button class="decrement" data-id="${item.id}">-</button>
      <span class="cart-card__quantity">${item.quantity}</span>
      <button class="increment" data-id="${item.id}">+</button>
    </div>
    <p class="cart-card__price">¥${item.price}</p>
    <button class="remove-item" data-id="${item.id}">X</button>
  </li>`;
}

function addTotal() {
  const items = getLocalStorage("cart") || [];
  const footer = document.querySelector(".cart-footer");

  if (items.length > 0) {
    footer.classList.remove("hide");
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.querySelector(".cart-total").textContent = `Total: ¥${total.toFixed(2)}`;
  } else {
    footer.classList.add("hide");
  }
}

function removeItem(itemId) {
  let cartItems = getLocalStorage("cart") || [];
  cartItems = cartItems.filter((item) => item.id != itemId);
  console.log(cartItems)
  setLocalStorage("cart", cartItems);
  renderCartContents();
}

function incrementQuantity(id) {
  const items = getLocalStorage("cart") || [];
  const index = items.findIndex((item) => item.id === Number(id));
  console.log(index)
    console.log(items[index])
  if (index != -1) {
    items[index].quantity += 1;
    setLocalStorage("cart", items);
    renderCartContents();
  }
}

function decrementQuantity(id) {
  const items = getLocalStorage("cart") || [];
  const index = items.findIndex((item) => item.id === Number(id));

  if (index != -1) {
    if (items[index].quantity === 1) {
      removeItem(id);
    } else {
      items[index].quantity -= 1;
      setLocalStorage("cart", items);
      renderCartContents();
    }
  }
}

// ✅ Single event listener handles all click events
document.addEventListener("click", (event) => {
  const target = event.target;
  const itemId = target.dataset.id;
  console.log("Clicked element:", target.className, "itemId:", itemId);

  if (target.classList.contains("increment")) {
    console.log("Increment clicked", itemId);
    incrementQuantity(itemId);
  }

  if (target.classList.contains("decrement")) {
    console.log("Decrement clicked", itemId);
    decrementQuantity(itemId);
  }

  if (target.classList.contains("remove-item")) {
    console.log("Remove clicked", itemId);
    removeItem(itemId);
  }
});


// Initialize
renderCartContents();
