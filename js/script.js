// Define ingredients
var ingredients = [
    { id: 1, name: 'Patty', price: 70 },
    { id: 2, name: 'Tomatoes', price: 30 },
    { id: 3, name: 'Cheese', price: 30 },
    { id: 4, name: 'Onions', price: 20 },
    { id: 5, name: 'Lettuce', price: 40 },
];

// Get DOM elements
var ingredientList = document.getElementById('ingredient-list');
var createBurgerButton = document.getElementById('create-burger');
var cartItemsContainer = document.getElementById('cart-items');
var cartTotal = document.getElementById('cart-total');
var clearCartButton = document.getElementById('clear-cart');
const modal=document.querySelector('.modal');
const modaldiv=document.querySelector('.modalAlert')
const closeButton=document.querySelector('.close-button')

// Initialize cart
var cart = [];

// Display the list of ingredients
function displayIngredients() {
    ingredientList.innerHTML = ingredients
        .map(ingredient => `<label><input type="checkbox" value="${ingredient.id}">${ingredient.name} (&#8377;${ingredient.price})</label><br>`)
        .join('');
}

// Calculate the total price of selected ingredients
function calculateTotalPrice(selectedIngredients) {
    return selectedIngredients.reduce((total, ingredientId) => {
        var selectedIngredient = ingredients.find(ingredient => ingredient.id === parseInt(ingredientId));
        return total + (selectedIngredient ? selectedIngredient.price : 0);
    }, 0);
}

// Handle "Create Burger" button click
createBurgerButton.addEventListener('click', () => {
    var selectedIngredients = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(input => parseInt(input.value));
    if (selectedIngredients.length === 0) {
         modaldiv.textContent='Your cart is empty'
        modal.style.display='block'
        return;
    } else {
        var selectedIngredients = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(input => input.value);
        var totalPrice = calculateTotalPrice(selectedIngredients);
        modaldiv.textContent=`Your custom burger with selected ingredients cost INR ${totalPrice.toFixed(2)}. Enjoy your meal!`
        modal.style.display='block'
        cartCount++;
        updateCartCount();
    }
});

// Update cart UI
function updateCartUI() {
    cartItemsContainer.innerHTML = cart
        .map(item => `<div>${item.name} - INR ${item.price.toFixed(2)}</div>`)
        .join('');

    var total = cart.reduce((total, item) => total + item.price, 0);
    cartTotal.textContent = `${total.toFixed(2)}`;
}

// Handle "Add to Cart" button click
createBurgerButton.addEventListener('click', () => {
    const selectedIngredients = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(input => parseInt(input.value));

    if (selectedIngredients.length === 0) {
        modaldiv.textContent='Please select ingredients before creating a burger.'
        modal.style.display='block'

        return;
    }
    const selectedItems = ingredients.filter(ingredient => selectedIngredients.includes(ingredient.id));
    const totalPrice = calculateTotalPrice(selectedIngredients);

    cart.push(...selectedItems);

    updateCartUI();
    
    modaldiv.textContent='Your custom burger with selected ingredients has been added to the cart!'
    modal.style.display='block'
});

// Handle "Clear Cart" button click
clearCartButton.addEventListener('click', () => {
    cart = [];
    updateCartUI();
    cartCount = 0;
    updateCartCount();
});

displayIngredients();

// Function to scroll back to the top of the page smoothly
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Add a click event listener to the "Back to Top" button
document.addEventListener("DOMContentLoaded", function () {
    const backButton = document.getElementById("back-to-top");

    // Show the button when the user scrolls down 300px from the top
    window.addEventListener("scroll", function () {
        if (window.scrollY >= 300) {
            backButton.style.display = "block";
        } else {
            backButton.style.display = "none";
        }
    });

    // Scroll to the top when the button is clicked
    backButton.addEventListener("click", function () {
        scrollToTop();
    });
});

// JavaScript for toggling the navigation menu
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const navList = document.querySelector("header ul");

    menuToggle.addEventListener("click", function () {
        // Toggle the visibility of the navigation menu
        if (navList.style.display === "none" || navList.style.display === "") {
            navList.style.display = "flex";
        } else {
            navList.style.display = "none";
        }
    });
});

// Function to add an item to the cart
function addItemToCart(item) {
    cart.push(item);
    updateCartUI();
}

// Function to remove an item from the cart
function removeItemFromCart(itemId) {
    const index = cart.findIndex(item => item.id === itemId);
    if (index !== -1) {
        cart.splice(index, 1);
        updateCartUI();
        if (cartCount > 0) {
            cartCount--;
            updateCartCount();
        }
    }
}

// Function to update the cart UI
function updateCartUI() {
    cartItemsContainer.innerHTML = cart
        .map(item => `
      <div>
        ${item.name} - INR ${item.price.toFixed(2)}
        <button onclick="removeItemFromCart(${item.id})"style="color: #fff; border: none; padding: 3px 6px; cursor: pointer; border-radius:50%">X</button>
      </div>
    `)
        .join('');

    const total = cart.reduce((total, item) => total + item.price, 0);
    cartTotal.textContent = `${total.toFixed(2)}`;
}
// Function to handle adding items to the cart
function addToCart(name, price) {
    cart.push({ name, price });
    updateCartUI();
    updateCartCount()

  }
  
  // Add event listeners to "Add to Cart" buttons
  var addToCartButtons = document.querySelectorAll('.add-to-cart-button');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function () {
      var productName = this.getAttribute('data-name');
      var productPrice = parseFloat(this.getAttribute('data-price'));
      addToCart(productName, productPrice);
      modaldiv.textContent=`${productName} has been added to your cart!`
      modal.style.display='block'
      
    });
  });
// Assuming you have a variable named cartCount for keeping track of the cart count.
let cartCount = 0;

// Function to update the cart count 
function updateCartCount() {
    var cartCountElement = document.getElementById("cartCount");
 cartCountElement.textContent = cartCount;
}

// Find the elements with the class "add-to-cart-button" and attach a click event listener to each of them.
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("add-to-cart-button")) {
        cartCount++;
        updateCartCount();
    }
});
closeButton.addEventListener('click',()=>{
    modal.style.display='none'
})



