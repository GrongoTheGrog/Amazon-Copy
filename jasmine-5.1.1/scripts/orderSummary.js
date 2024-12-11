import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js"; 
import { updateCartQuantity, deleteItem } from '../../data/cart.js';


describe('renderOrderSummary', function() {
  let cart;
  let products;
  let deliveryOptions;
  let container;

  beforeEach(function() {
    cart = [
      { productId: '1', quantity: 2, deliveryOptionId: '1' },
      { productId: '2', quantity: 1, deliveryOptionId: '2' },
    ];
    products = [
      { id: '1', name: 'Product 1', priceCents: 1000, image: 'image1.jpg' },
      { id: '2', name: 'Product 2', priceCents: 2000, image: 'image2.jpg' },
    ];
    deliveryOptions = [
      { id: '1', deliveryDays: 3, priceCents: 500 },
      { id: '2', deliveryDays: 7, priceCents: 0 },
    ];
    container = document.createElement('div');
    container.classList.add('order-summary');
    document.body.appendChild(container);

    spyOn(window, 'updateCartQuantity').and.callFake(function() {});
    spyOn(window, 'renderPaymentSummary').and.callFake(function() {});
    spyOn(window, 'updateDeliveryOption').and.callFake(function() {});
  });

  afterEach(function() {
    document.body.removeChild(container);
  });

  it('should render the order summary correctly', function() {
    renderOrderSummary();

    const cartItems = container.querySelectorAll('.cart-item-container');
    expect(cartItems.length).toBe(2);
    const firstItem = cartItems[0];
    expect(firstItem.querySelector('.product-name').textContent).toBe('Product 1');
    expect(firstItem.querySelector('.product-price').textContent).toBe('$10.00');
  });

  it('should delete a product from the cart when clicked', function() {
    renderOrderSummary();

    const deleteButton = container.querySelector('.js-delete');
    deleteButton.click();

    expect(window.deleteItem).toHaveBeenCalledWith('1');
    const cartItems = container.querySelectorAll('.cart-item-container');
    expect(cartItems.length).toBe(1);
  });

  it('should update the quantity of the product when save is clicked', function() {
    renderOrderSummary();

    const inputField = container.querySelector('.quantity-input-1');
    inputField.value = '5';

    const saveButton = container.querySelector('.save-quantity-link');
    saveButton.click();

    const quantityLabel = container.querySelector('.js-label-1');
    expect(quantityLabel.textContent).toBe('5');

    expect(window.updateCartQuantity).toHaveBeenCalled();
    expect(window.renderPaymentSummary).toHaveBeenCalled();
  });

  it('should update the delivery option when selected', function() {
    renderOrderSummary();

    const deliveryOptionButton = container.querySelector('.js-delivery-option');
    deliveryOptionButton.click();

    expect(window.updateDeliveryOption).toHaveBeenCalledWith('1', '1');
    expect(window.renderOrderSummary).toHaveBeenCalled();
    expect(window.renderPaymentSummary).toHaveBeenCalled();
  });
});