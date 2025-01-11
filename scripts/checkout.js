
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { products, loadProducts, loadProductsFetch } from "../data/products.js";
import '../data/backend-practice.js';

async function loadPage(){
  console.log('load page')

  try{
    await loadProductsFetch();

    const value = await new Promise ((resolve, reject) => {
      loadCart(() => {
        resolve();
      })
    });
  } catch (error){
    console.log('Unexpected error. Please try again later.')
  }

  renderOrderSummary();
  renderPaymentSummary();
}

loadPage().then(() => {
  console.log('next step');
  return 'value 2'
})


/*
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
