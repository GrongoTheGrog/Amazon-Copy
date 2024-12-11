import { cart, updateCartQuantity, updateDeliveryOption } from '../../data/cart.js';
import { deleteItem } from '../../data/cart.js';
import { products } from '../../data/products.js';
import { toDollars } from './../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions} from '../../data/delivery-options.js'
import {renderPaymentSummary} from './paymentSummary.js'




const today = dayjs();
const deliveyDate = today.add(7, 'days');

updateCartQuantity('.js-cart-quantity-checkout');

export function renderOrderSummary(){

  let cartSummary = ``;

  cart.forEach((cartItem) => {
    const {productId} = cartItem;

    let matchingProduct;

    products.forEach((product) => {
      if (product.id === productId){
        matchingProduct = product;
      }
    })

    const options = deliveryOptionsHTML(matchingProduct.id, cartItem);

    const deliveryOptionId = cartItem.deliveryOptionId;

    let deliveryOption;

    deliveryOptions.forEach((option) => {
      if (option.id === deliveryOptionId){
        deliveryOption = option;
      }
    })

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'day');

    const dateString = deliveryDate.format('dddd, MMMM DD');




    cartSummary += ` 
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}" id="${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
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

            ${options}

          </div>
        </div>
    </div>
    `

  })


  function deliveryOptionsHTML(a, cartItem){
    let HTML = ``;

    deliveryOptions.forEach((deliveryOption) => {

      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'day');

      const dateString = deliveryDate.format('dddd, MMMM DD');



      const price = deliveryOption.priceCents ? `$${toDollars(deliveryOption.priceCents)}` : 'FREE';

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;


      HTML += `
      <div class="delivery-option js-delivery-option"
      data-product-id="${a}"
      data-delivery-id="${deliveryOption.id}">
        <input type="radio"
          class="delivery-option-input"
          name="delivery-option-${a}"
          ${isChecked ? 'checked' : ''}>
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${price} - Shipping
          </div>
        </div>
      </div>
      `
    })

    return HTML;
  }


  document.querySelector('.order-summary').innerHTML = cartSummary;

  document.querySelectorAll('.js-delete').forEach((element) => {
    element.addEventListener('click', () => {
      let productId = element.dataset.name;
      document.getElementById(productId).remove();
      deleteItem(productId);
      updateCartQuantity('.js-cart-quantity-checkout');
      renderOrderSummary();
      renderPaymentSummary();
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
          renderPaymentSummary();
          renderOrderSummary();
        }
      })
    })
  })


  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const productId = element.dataset.productId;
      console.log(productId);
      const deliveryOptionId = element.dataset.deliveryId;
      console.log(deliveryOptionId);

      updateDeliveryOption(productId, deliveryOptionId);

      renderOrderSummary();
      renderPaymentSummary();
    })
  })

}

renderOrderSummary();