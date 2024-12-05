export let cart = JSON.parse(localStorage.getItem('cart')) || [{
  productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity: 2
}, 

{
  productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity: 1
}
];


let cartNumber = document.querySelector('.cart-quantity');

!cartNumber ? cartNumber = 0 : cartNumber.innerHTML = cart.length;

export function addToCart(id){
  let matchingItem;

    const selectedNumber = document.querySelector(`.js-quantity-selector-${id}`).value;

    cartNumber = document.querySelector('.cart-quantity');

    cartNumber.innerHTML = Number(cartNumber.innerHTML) + Number(selectedNumber);





    cart.forEach((value) => {
      if (value.productId === id){
        matchingItem = value;
      }
    })

    if (matchingItem){
      matchingItem.quantity += Number(selectedNumber);
    }else{
      cart.push({
        productId: id,
        quantity: 1
      })
    }

    saveToStorage();

}

let timeoutsAddMessage = {};

export function addMessageCart(productId){
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
}

function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart))
}


export function deleteItem(id){
  let newCart = [];

  cart.forEach((element) => {
    if (element.productId !== id){
      newCart.push(element);
    }
  })

  localStorage.setItem('cart', JSON.stringify(cart));
  cart = newCart;
  console.log(cart);

  saveToStorage();
}

