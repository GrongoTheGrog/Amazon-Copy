import { cart } from "../../data/cart.js";
import { products, loadProducts } from "../../data/products.js";
import { deliveryOptions } from "../../data/delivery-options.js";


new Promise((resolve) => {
  loadProducts(() => {
    resolve();
  })
}).then(() => {
  renderPaymentSummary();
})
 

export function renderPaymentSummary(){
  let productPriceCents = 0;
  let shippingPriceCents = 0;;

  cart.forEach((item) => {
    const {quantity, deliveryOptionId, productId} = item;

    let price = 0;
    products.forEach((product) => {                             /// CHECKING WITCH PRODUCT IT IS ON THE PRODUCTS DATA FILE
      if (product.id === productId){
        price = product.priceCents;
      }
    })

    let deliveryOption;

    deliveryOptions.forEach((option) => {                        //// GETTING THE SHIPPING OPTION 
      if (option.id === item.deliveryOptionId){
        deliveryOption = option;
      }
    })

    shippingPriceCents += deliveryOption.priceCents;             /// SUM OF THE SHIPPING 

    productPriceCents += price * quantity;                       /// SUM OF THE PAYMENT 
  })

  const total = (shippingPriceCents + productPriceCents) / 100;
  const tax = (shippingPriceCents + productPriceCents) / 100 * 0.1;

  let add = 0;

  cart.forEach(object => {
    add += object.quantity;
  })



  const html = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div class="cart-quantity-payment">Items (${add}):</div>
      <div class="payment-summary-money">$${(productPriceCents / 100).toFixed(2)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${(shippingPriceCents / 100).toFixed(2)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${total.toFixed(2)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${tax.toFixed(2)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${(total + tax).toFixed(2)}</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `;
  const container = document.querySelector('.payment-summary');
  container.innerHTML = html;

}
