import { deleteItem } from '../data/cart.js';
import { cart, updateCartQuantity } from '../data/cart.js';
import { products } from '../data/products.js';
import { toDollars } from './utils/money.js';

updateCartQuantity('.js-cart-quantity-checkout');

let cartSummary = ``;

cart.forEach((cartItem, index) => {
  const {productId} = cartItem;

  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId){
      matchingProduct = product;
    }
  })

  cartSummary += ` 
  <div class="cart-item-container js-cart-item-container-${matchingProduct.id}" id="${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${toDollars(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
            Quantity: <span class="quantity-label js-label-${matchingProduct.id}">${cartItem.quantity}
            </span>
            <span class="update-quantity-link link-primary js-update" data-name="${productId}">>
              Update
            </span>
            <input style="width: 30px" class="quantity-input quantity-input-${productId}">
            <span class="save-quantity-link" data-name="${productId}">
              Save
            </span>
            <span class="delete-quantity-link link-primary js-delete" data-name="${productId}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${productId}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${productId}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${productId}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
  `

})
document.querySelector('.order-summary').innerHTML = cartSummary;

document.querySelectorAll('.js-delete').forEach((element) => {
  element.addEventListener('click', () => {
    let productId = element.dataset.name;
    document.getElementById(productId).remove();
    deleteItem(productId);
    updateCartQuantity('.js-cart-quantity-checkout');
  }) 
})


document.querySelectorAll('.js-update').forEach(element => {
  element.addEventListener('click', () => {
    let id = element.dataset.name;
    const container = document.getElementById(id);
    container.classList.add('is-editing-quantity');

  })
})

document.querySelectorAll('.save-quantity-link').forEach(element => {
  element.addEventListener('click', () => {
    const id = element.dataset.name;
    const container = document.getElementById(id);
    container.classList.remove('is-editing-quantity');
    cart.forEach((a) => {
      if (id === a.productId){
        const input = document.querySelector(`.quantity-input-${id}`);
        console.log(input.value);
        a.quantity = Number(input.value);
        const label = document.querySelector(`.js-label-${id}`)
        label.innerHTML = a.quantity;

        updateCartQuantity('.js-cart-quantity-checkout');
      }
    })


  })
})