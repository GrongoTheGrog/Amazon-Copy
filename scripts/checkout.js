
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { products, loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
import '../data/backend-practice.js';

Promise.all([
  loadProductsFetch(),

  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })
]).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
})

/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve();
  })
}).then(() => {
  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })
}).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
})


/*
loadProducts(render);

function render(){
  renderOrderSummary();
  renderPaymentSummary();
}
*/
