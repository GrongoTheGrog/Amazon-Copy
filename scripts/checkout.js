import { updateHTML } from './utils/update-HTML.js';
import { deleteItem } from '../data/cart.js';


updateHTML();

document.querySelectorAll('.js-delete').forEach((element) => {
  element.addEventListener('click', () => {
    let productId = element.dataset.name;
    deleteItem(productId);
  }) 
})