

// menu
const menu = [
  {
    menuName: "Caldereta",
    category: "beef",
    price: 1000,
    imageUrl: "images/caldereta.webp",
    description: "A rich and hearty Filipino beef stew simmered with tomatoes, liver spread, and vegetables."
  },
  {
    menuName: "Cassava Cake",
    category: "dessert",
    price: 500,
    imageUrl: "images/cassava_cake.webp",
    description: "A chewy, coconut-flavored Filipino dessert made from grated cassava and creamy custard topping."
  },
  {
    menuName: "Chicken Barbecue",
    category: "chicken",
    price: 500,
    imageUrl: "images/chicken_bbq.webp",
    description: "Tender chicken skewers marinated in a sweet and savory Filipino-style barbecue sauce."
  },
  {
    menuName: "Cinnamon Rolls",
    category: "bread",
    price: 500,
    imageUrl: "images/cinnamon_rolls.webp",
    description: "Soft, fluffy rolls swirled with cinnamon sugar and topped with creamy icing."
  },
  {
    menuName: "Dinuguan",
    category: "pork",
    price: 1000,
    imageUrl: "images/dinuguan.webp",
    description: "A savory Filipino stew made with pork and pig's blood, simmered in vinegar and spices."
  },
  {
    menuName: "Empanada",
    category: "bread",
    price: 500,
    imageUrl: "images/empanada.webp",
    description: "Golden-fried pastry filled with savory ground meat, potatoes, and vegetables."
  },
  {
    menuName: "Ensaymada",
    category: "bread",
    price: 500,
    imageUrl: "images/ensaymada.webp",
    description: "A soft, buttery brioche topped with sugar, cheese, and sometimes grated coconut."
  },
  {
    menuName: "Halo halo",
    category: "dessert",
    price: 500,
    imageUrl: "images/halo-halo.webp",
    description: "A popular Filipino shaved ice dessert with mixed fruits, jellies, beans, leche flan, and ice cream."
  },
  {
    menuName: "Hamburger",
    category: "bread",
    price: 500,
    imageUrl: "images/hamburger.webp",
    description: "A classic beef burger with lettuce, tomato, and condiments in a soft bun."
  },
  {
    menuName: "Lechon Paksiw",
    category: "pork",
    price: 500,
    imageUrl: "images/lechon_paksiw.webp",
    description: "Leftover roasted pork simmered in a savory-sweet vinegar and liver sauce."
  },
  {
    menuName: "Pandesal",
    category: "bread",
    price: 500,
    imageUrl: "images/pandesal.webp",
    description: "Soft, slightly sweet Filipino bread rolls commonly enjoyed for breakfast."
  },
  {
    menuName: "Yema Cake",
    category: "dessert",
    price: 500,
    imageUrl: "images/yema_cake.webp",
    description: "A fluffy chiffon cake topped with rich yema custard and grated cheese."
  }
];
if (location.pathname.endsWith("menu.html")){
  // Function to display menus
  function displayMenus(menuArray = menu) {
    const cardsContainer = document.querySelector('.cards-container');
    cardsContainer.innerHTML = ""; // Clear previous content
    menuArray.forEach((menu, index) => {
      const menuCards = `
        <section class="cards">
          <img src="${menu.imageUrl}" alt="${menu.menuName}" loading="lazy">
          <h3 class="menu-name">${menu.menuName}</h3>
          <p>Price: $${menu.price}</p>
          <a class=" order-now button" data-id="${index}">Order now</a>
        </section>`;
      cardsContainer.innerHTML += menuCards;
    });

    
  // Add event listeners after DOM is updated
  document.querySelectorAll('.order-now').forEach(button => {
    button.addEventListener('click', () => {
      const menuId = button.getAttribute('data-id');
      const selectedMenu = menuArray.find((item, index) => (item.id || index).toString() === menuId);

      let cart = JSON.parse(localStorage.getItem('cart')) || {};

      if (cart[menuId]) {
        cart[menuId].quantity += 1;
      } else {
        cart[menuId] = {
          ...selectedMenu,
          quantity: 1
        };
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      displayModal(selectedMenu)
    });
  });
   
  } 
  
  function displayModal(selectedMenu) {
    const dialog = document.querySelector('#cart-dialog');
      dialog.innerHTML =  `
      <button id="closeModal">×</button>
      <p class="message">${selectedMenu.menuName} added to cart!</p> `;
  
      dialog.showModal();
      dialog.querySelector('#closeModal').addEventListener('click', () => {
            console.log("closing")
            dialog.close();
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

  // Event listeners
  document.querySelector('.all').addEventListener('click', () => {
    displayMenus(menu); // Display all menus
  });

  document.querySelector('.beef').addEventListener('click', () => {
    removeActiveClass()
    const list = document.querySelector('.beef');
    const beefMenu = filterMenu(menu, 'beef'); // Use filterMenu function
    list.classList.add('active_list');
    displayMenus(beefMenu); // Display filtered menus
  });

  document.querySelector('.chicken').addEventListener('click', () => {
    removeActiveClass()
    const list = document.querySelector('.chicken');
    const newLists = filterMenu(menu, 'chicken'); // Use filterMenu function
    list.classList.add('active_list');
    displayMenus(newLists); // Display filtered menus
  });

  document.querySelector('.pork').addEventListener('click', () => {
    removeActiveClass()
    const list = document.querySelector('.pork');
    const newLists = filterMenu(menu, 'pork'); // Use filterMenu function
    list.classList.add('active_list');
    displayMenus(newLists); // Display filtered menus
  });

  document.querySelector('.dessert').addEventListener('click', () => {
    removeActiveClass()
    const list = document.querySelector('.dessert');
    const newLists = filterMenu(menu, 'dessert'); // Use filterMenu function
    list.classList.add('active_list');
    displayMenus(newLists); // Display filtered menus
  });

  document.querySelector('.bread').addEventListener('click', () => {
    removeActiveClass()
    const list = document.querySelector('.bread');
    const newLists = filterMenu(menu, 'bread'); // Use filterMenu function
    list.classList.add('active_list');
    displayMenus(newLists); // Display filtered menus
  });


  displayMenus(menu)

}

// Handle inquiries counter on thank_you.html
if (location.pathname.endsWith("thank_you.html")) {
  const count = document.querySelector('.count');
  let inquireCount = localStorage.getItem("inquireCount") || 0;
  inquireCount++;
  if (inquireCount === 1) {
    count.innerHTML = 'You have inquired for the first time.'
  }else {
    count.innerHTML = `You have inquired ${inquireCount} times.`
  }
  localStorage.setItem("inquireCount", inquireCount);
}

