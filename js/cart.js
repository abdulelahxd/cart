/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
var table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
var cart;
var tBody = document.getElementsByTagName('tbody')[0];
var tFoot = document.getElementsByTagName('tfoot')[0];

function loadCart() {
  var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

//  Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  tBody.innerHTML = '';
}


function showCart() {

  for(var i = 0; i < cart.items.length; i++){
    var newRow = addElement('tr', tBody);
    addElement('td', newRow, 'x', i);
    addElement('td', newRow, cart.items[i].quantity);
    addImage(addElement('td', newRow), cart.items[i].product);
  }
}

function addImage (parent, cartItem) {

  var imgElement = document.createElement('img');

  for (var i = 0; i < Product.allProducts.length; i++ ) {

    if (Product.allProducts[i].name ===  cartItem) {

      imgElement.setAttribute('src', Product.allProducts[i].filePath);

    }

  }

  parent.appendChild(imgElement);

}
function addElement(element, parent, value, id = -1){

  var newElement = document.createElement(element);
  newElement.textContent = value;

  if (id !== -1){
    newElement.setAttribute('id', id);
  }

  parent.appendChild(newElement);

  return newElement;
}

function removeItemFromCart(event) {
  event.preventDefault();

  if (event.target.textContent === 'x') {
    cart.items.splice(event.target.id, 1);
  }

  cart.saveToLocalStorage();

  renderCart();

}

// This will initialize the page and draw the cart on screen
renderCart();