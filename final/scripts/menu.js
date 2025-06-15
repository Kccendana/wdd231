const menuUrl = 'data/menu.json';
const cardsContainer = document.querySelector('.cards-container');

// Helper functions
function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function addToCart(menu) {
  let cart = getLocalStorage("cart") || [];
  let item = cart.find(item => item.id === menu.id);

  if (item) {
    item.quantity = (item.quantity || 1) + 1;
  } else {
    cart.push({ ...menu, quantity: 1 });
  }

  setLocalStorage("cart", cart);
}

// Fetch menu data
async function getMenuData() {
  try {
    const response = await fetch(menuUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.menus;
  } catch (error) {
    console.error("Error fetching menu data:", error);
  }
}

// Display menu cards and attach event listeners
getMenuData().then((menus) => {
  displayMenuCards(menus, cardsContainer);
  // Event listeners
  document.querySelector('.all').addEventListener('click', () => {
    displayMenuCards(menus, cardsContainer); // Display all menus
  });

  document.querySelector('.beef').addEventListener('click', () => {
    removeActiveClass()
    const list = document.querySelector('.beef');
    const beefMenu = filterMenu(menus, 'beef'); // Use filterMenu function
    list.classList.add('active_list');
    displayMenuCards(beefMenu, cardsContainer); // Display filtered menus
  });

  document.querySelector('.chicken').addEventListener('click', () => {
    removeActiveClass()
    const list = document.querySelector('.chicken');
    const newLists = filterMenu(menus, 'chicken'); // Use filterMenu function
    list.classList.add('active_list');
    displayMenuCards(newLists, cardsContainer); // Display filtered menus
  });

  document.querySelector('.pork').addEventListener('click', () => {
    removeActiveClass()
    const list = document.querySelector('.pork');
    const newLists = filterMenu(menus, 'pork'); // Use filterMenu function
    list.classList.add('active_list');
    displayMenuCards(newLists, cardsContainer); // Display filtered menus
  });

  document.querySelector('.dessert').addEventListener('click', () => {
    removeActiveClass()
    const list = document.querySelector('.dessert');
    const newLists = filterMenu(menus, 'dessert'); // Use filterMenu function
    list.classList.add('active_list');
    displayMenuCards(newLists, cardsContainer); // Display filtered menus
  });

  document.querySelector('.bread').addEventListener('click', () => {
    removeActiveClass()
    const list = document.querySelector('.bread');
    const newLists = filterMenu(menus, 'bread'); // Use filterMenu function
    list.classList.add('active_list');
    displayMenuCards(newLists, cardsContainer); // Display filtered menus
  });

 
});

function displayMenuCards(menuList, elementCon) {
  elementCon.innerHTML = "";
  menuList.forEach((menu) => {
    const menuCard = `
      <section class="cards">
        <img src="${menu.imageUrl}" alt="${menu.menuName}" loading="lazy">
        <h3 class="menu-name">${menu.menuName}</h3>
        <p>Price: ¥${menu.price}</p>
        <button class="order-now button" data-id="${menu.id}">Order now</button>
      </section>`;
    elementCon.innerHTML += menuCard;
  });
   // Attach event listeners to "Order Now" buttons
  document.querySelectorAll('.order-now').forEach(button => {
    button.addEventListener('click', () => {
      const menuId = parseInt(button.getAttribute('data-id'));
      const selectedMenu = menuList.find(menu => menu.id === menuId);

      if (selectedMenu) {
        addToCart(selectedMenu);
        displayModal(selectedMenu);
      }
    });
  });
}

function displayModal(selectedMenu) {
  const modal = document.querySelector("#dialog");
  modal.innerHTML = `
    <button id="closeModal">×</button>
    <p class="sub">You added <strong>${selectedMenu.menuName}</strong> to your cart.</p>
  `;

  modal.showModal();

  modal.querySelector("#closeModal").addEventListener("click", () => {
    modal.close();
  });
}

function removeActiveClass() {
    const listItems = document.querySelectorAll('.menu_lists li'); // Select all list items
    const hasActive = Array.from(listItems).some(item => item.classList.contains('active_list'));
  
    if (hasActive) {
      listItems.forEach(item => item.classList.remove('active_list'));
    }
  }
  

  // Function to filter menu
  function filterMenu(menuArray = menu, category) {
    return menuArray.filter(menu => menu.category === category);
  }

  