import { products } from "./products.js";
import { deliveryOptions } from "./delivery-options.js";

let cartNumber = document.querySelector('.cart-quantity');

!cartNumber ? cartNumber = 0 : updateCartQuantity('.cart-quantity');

let timeoutsAddMessage = {};



export const cart = {
  cartItems: undefined,


  loadFromStorage(){
    this.cartItems = JSON.parse(localStorage.getItem('cart-oop')) || [{
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId: '1'
    }, 
  
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId: '2'
    }
    ];
  }, 


  saveToStorage(){
    localStorage.setItem('cart-oop', JSON.stringify(this.cartItems));
  },

  addToCart(id){
    let matchingItem;
  
      const selectedNumber = document.querySelector(`.js-quantity-selector-${id}`).value;
  
  
      this.cartItems.forEach((value) => {    //  IF ID ALREDY EXISTS IN CART, JUST ADD THE SELECTED NUMBER TO ITS QUANTITY
        if (value.productId === id){
          matchingItem = value;
        }
      })
  
      if (matchingItem){
        matchingItem.quantity += Number(selectedNumber);
      }else{
        cart.push({     //   PUSH TO CART 
          productId: id,
          quantity: Number(selectedNumber),
          deliveryOptionId: '1'
        })
      }
  
      updateCartQuantity('.cart-quantity');
      this.saveToStorage();
  
  },

  deleteItem(id){
    let newCart = [];
  
    this.cartItems.forEach((element) => {
      if (element.productId !== id){
        newCart.push(element);
      }
    })
  
    localStorage.setItem('cart', JSON.stringify(cart));
    cart = newCart;
    console.log(cart);
  
    this.saveToStorage();
  }, 

  addMessageCart(productId){
    const addMessage = document.querySelector(`.added-to-cart-${productId}`);
    addMessage.classList.add(`added-to-cart-appear`)
    
    if (timeoutsAddMessage[productId]){
      clearTimeout(timeoutsAddMessage[productId]);
    } 
  
    const timeoutid = setTimeout(() => {
      addMessage.classList.remove(`added-to-cart-appear`)
      console.log('appear')
    }, 2000)
  
    timeoutsAddMessage[productId] = timeoutid;
  },

  updateCartQuantity(a){
    let add = 0;
    const element = document.querySelector(a);
  
    this.cartItems.forEach(object => {
      add += object.quantity;
    })
  
    element.innerHTML = add;
  },

  updateCartQuantity(a){
    let add = 0;
    const element = document.querySelector(a);
  
    this.cartItem.forEach(object => {
      add += object.quantity;
    })
  
    element.innerHTML = add;
  },

  updateDeliveryOption(productId, deliveryOptionId){
    let matchingItem;
  
    cart.forEach((cartItem) => {
      if (cartItem.productId === productId){
        matchingItem = cartItem;
  
      }
    })
  
    matchingItem.deliveryOptionId = deliveryOptionId;
  
    saveToStorage();
  },



  
}



cart.loadFromStorage();

