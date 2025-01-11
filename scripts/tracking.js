import { products, loadProductsFetch } from "../data/products.js";
import { orders } from "../data/orders.js";
import { cart } from "../data/cart.js";


loadProductsFetch().then(() => {
  loadTracking();
})

export function getDate(date){
  date = new Date(date);

  let month = date.toLocaleString('en-US', {month: 'long'});
  let day = date.toLocaleString('en-US', {day: 'numeric'});
  let weekday = date.toLocaleString('en-US', {weekday: 'long'})

  return `${weekday}, ${month} ${day}`;

}

const params = new URLSearchParams(window.location.search);

const productId = params.get('productId');
const orderId = params.get('orderId');

function loadTracking(){
  document.querySelector('.cart-quantity').innerHTML = cart.length;

  let matchingProduct = products.find((product) => {
    return product.id === productId;
  })

  let matchingOrder = orders.find((order) => {
    return order.id === orderId;
  })

  let matchingProductOrder = matchingOrder.products.find((product) => {
    return productId === product.productId;
  })


  let html = `
    <div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${getDate(matchingProductOrder.estimatedDeliveryTime)}
        </div>

        <div class="product-info">
          ${matchingProduct.name}
        </div>

        <div class="product-info">
          Quantity: ${matchingProductOrder.quantity}
        </div>

        <img class="product-image" src="${matchingProduct.image}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
      </div>
  `;

  function calculateDifferenceTime(value1, value2, firstOrdered){
    const startDate = new Date(value1);
    const endDate = new Date(value2);
    const newOrdered = new Date(firstOrdered);

    const difference = (endDate - startDate) / 60000;
    
    const differenceTotal = (endDate - newOrdered) / 60000;
    
    console.log(differenceTotal)
    console.log(difference)

    const perCent = (differenceTotal - difference) / differenceTotal * 100;

    console.log(perCent)

    document.querySelector('.progress-bar').style.width = `${perCent}%`
  }

  document.querySelector('.main').innerHTML = html;

  calculateDifferenceTime(dayjs().format(), matchingProductOrder.estimatedDeliveryTime, matchingOrder.orderTime);
}