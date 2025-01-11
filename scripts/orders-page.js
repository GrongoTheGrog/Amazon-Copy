import { orders, deleteOrder } from "../data/orders.js";
import { cart } from "../data/cart.js";
import { products, loadProductsFetch } from "../data/products.js";

console.log(orders)
document.querySelector('.cart-quantity').innerHTML = cart.length;

const main = document.querySelector('.main');


export function getDate(date){
  date = new Date(date);

  let month = date.toLocaleString('en-US', {month: 'long'});
  let day = date.toLocaleString('en-US', {day: 'numeric'})

  return `${month} ${day}`;

}

loadProductsFetch().then(() => {
  renderPage();
});


function renderPage(){
  document.querySelector('.cart-quantity').innerHTML = cart.length;

  let htmlOrders = `<div class="page-title">Your Orders</div>`
  let htmlProducts = ``
  for (let i = 0; i < orders.length; i++){

    const order = orders[i];
    htmlProducts = `` 

    for(let y = 0; y < order.products.length; y++){
      const product =  order.products[y];

      console.log(product.productId)

      let matchingProduct = products.find((object) => {
        return product.productId === object.id;
      })

      htmlProducts += `
        <div class="product-image-container">
          <img src="${matchingProduct.image}">
        </div>

        <div class="product-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${getDate(product.estimatedDeliveryTime)}
          </div>
          <div class="product-quantity">
            Quantity: ${product.quantity}
          </div>
          <button class="buy-again-button button-primary">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html">
            <button class="track-package-button button-secondary" data-id="${product.productId}" data-order-id="${order.id}">
              Track package
            </button>
          </a>
        </div>

      `
    }


    let orderDate = getDate(orders[i].orderTime);

    htmlOrders += `
    <div class="orders-grid">
          <div class="order-container">
            
            <div class="order-header">
              <div class="order-header-left-section">
                <div class="order-date">
                  <div class="order-header-label">Order Placed:</div>
                  <div>${orderDate}</div>
                </div>
                <div class="order-total">
                  <div class="order-header-label">Total:</div>
                  <div>$${order.totalCostCents}</div>
                </div>
              </div>

              <div class="order-header-right-section">
                <div class="order-header-label">Order ID:</div>
                <div>${order.id}</div>
              </div>

              <button class="delete-button" data-id="${order.id}">
                Delete Order
              </button>
            </div>
            
            <div class="order-details-grid">
              ${htmlProducts}
            </div>
          </div>
    `

  }

  main.innerHTML = htmlOrders;

  document.querySelectorAll('.delete-button').forEach((button) => {
    button.addEventListener('click', () => {
      deleteOrder(button.dataset.id);
      renderPage();
    })
  })

  document.querySelectorAll('.track-package-button').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault()

      const url = new URL ('http://127.0.0.1:5500/tracking.html');
      const params = new URLSearchParams();
      
      params.append('orderId', button.dataset.orderId);
      params.append('productId', button.dataset.id);

      url.search = params.toString();

      window.location.href = url.toString();
    })
  })
}

