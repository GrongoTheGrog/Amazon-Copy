
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import '../data/cart-oop.js';
import { cart } from "../data/cart-oop.js";


renderOrderSummary();
renderPaymentSummary();


console.log(cart)