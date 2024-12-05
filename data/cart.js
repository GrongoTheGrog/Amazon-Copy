export const cart = [];


export function addToCart(id){
  let matchingItem;

    const selectedNumber = document.querySelector(`.js-quantity-selector-${id}`).value;

    let cartNumber = document.querySelector('.cart-quantity')
      .innerHTML;

    cartNumber = Number(cartNumber) + Number(selectedNumber);



    cart.forEach((value) => {
      if (value.id === id){
        matchingItem = value;
      }
    })

    if (matchingItem){
      matchingItem.quantity += Number(selectedNumber);
    }else{
      cart.push({
        id,
        quantity: 1
      })
    }

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
