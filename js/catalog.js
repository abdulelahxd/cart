/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
var cart = new Cart([]);

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {


  var selectElement = document.getElementById('items');
  for (var i = 0; i <Product.allProducts.length; i++) {
    var optionTag = document.createElement('option');
    optionTag.textContent = Product.allProducts[i].name;
    selectElement.appendChild(optionTag);
  }

}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {
  //  Prevent the page from reloading
  event.preventDefault();

  loadCart();
  // Do all the things ...
  addSelectedItemToCart();
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();

  document.getElementById('items').value = null;
  document.getElementById('quantity').value = null;
}

function loadCart() {
  var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cart = new Cart(cartItems);
}

//  Add the selected item and quantity to the cart
function addSelectedItemToCart() {
  // suss out the item picked from the select list

  var item = document.getElementById('items').value;

  var quantity = parseInt(document.getElementById('quantity').value);
  //  get the quantity
  // using those, add one item to the Cart
  cart.addItem(item, quantity);
  // console.log(cart);
}

//  Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
  document.getElementById('itemCount').textContent = "Numbers of Items in Cart: " + cart.items.length;
}

//  As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {

  var cartCont = document.getElementById('cartContents');
  cartCont.innerHTML ='';

  for(var i = 0; i <cart.items.length; i++){
    cartCont.textContent +=  `(${cart.items[i].product}, ${cart.items[i].quantity})`;
  }
}


var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();