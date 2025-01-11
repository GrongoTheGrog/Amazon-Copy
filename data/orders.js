export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
  orders.unshift(order);
  saveToLocalStorage();
}

export function deleteOrder(id) {
  orders.forEach((order, index) => {
    if (order.id === id){
      orders.splice(index, 1);
    }
  })
  console.log(orders)
  saveToLocalStorage();
}

function saveToLocalStorage(){
  localStorage.setItem('orders', JSON.stringify(orders))
}

