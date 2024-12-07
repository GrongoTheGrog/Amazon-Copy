export let cart = JSON.parse(localStorage.getItem('cart')) || [{
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


let cartNumber = document.querySelector('.cart-quantity');

!cartNumber ? cartNumber = 0 : updateCartQuantity('.cart-quantity');

export function addToCart(id){
  let matchingItem;

    const selectedNumber = document.querySelector(`.js-quantity-selector-${id}`).value;


    cart.forEach((value) => {    //  IF ID ALREDY EXISTS IN CART, JUST ADD THE SELECTED NUMBER TO ITS QUANTITY
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

export function updateCartQuantity(a){
  let add = 0;
  const element = document.querySelector(a);

  cart.forEach(object => {
    add += object.quantity;
  })

  element.innerHTML = add;
}
