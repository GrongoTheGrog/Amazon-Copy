import { Product } from "../../data/products.js"
import { Clothing } from "../../data/products.js"
import { Applience } from "../../data/products.js";


describe('Classes of Products', () => {
  describe('Class default "Products":', () => {
    let containerTest;
  
    beforeEach(() => {
      document.querySelector('.js-test-container').innerHTML = '';
      containerTest = document.querySelector('.js-test-container');
    })
  
    const product = new Product(
      {
        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        image: "images/products/athletic-cotton-socks-6-pairs.jpg",
        name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
        rating: {
          stars: 4.5,
          count: 87
        },
        priceCents: 1090,
        keywords: [
          "socks",
          "sports",
          "apparel"
        ]
      }
    ); 
  
  
    it('Passing variables correctly', () => {
      expect(product.name).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');
    })
  
    it('Not showing any extra info in HTML', () => {
      containerTest.innerHTML = product.extraInfoHTML();
      expect(containerTest.innerHTML).toEqual('');
    })
  })
  
  
  describe('Class "Clothing":', () => {
  let containerTest;
  
    beforeEach(() => {
      document.querySelector('.js-test-container').innerHTML = '';
      containerTest = document.querySelector('.js-test-container');
    })
  
  
    const product = new Clothing(
      {
        id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
        image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
        name: "Adults Plain Cotton T-Shirt - 2 Pack",
        rating: {
          stars: 4.5,
          count: 56
        },
        priceCents: 799,
        keywords: [
          "tshirts",
          "apparel",
          "mens"
        ],
        type: "clothing",
        sizeChartLink: "images/clothing-size-chart.png"
      }
    );
  
  
  
    it('Passing variables correctly', () => {
      expect(product.name).toEqual('Adults Plain Cotton T-Shirt - 2 Pack');
    })
  
    it('Showing the extra clothing info in HTML', () => {
      containerTest.innerHTML = product.extraInfoHTML();
      expect(containerTest.innerHTML.trim()).toEqual(`<a href="images/clothing-size-chart.png" target="_blank">Size Chart</a>
      `.trim())
    })
  })
  
  
  
  describe('Class "Appliance":', () => {
    let containerTest;
    
      beforeEach(() => {
        document.querySelector('.js-test-container').innerHTML = '';
        containerTest = document.querySelector('.js-test-container');
      })
    
    
      const product = new Applience(
        {
          id: "54e0eccd-8f36-462b-b68a-8182611d9add",
    image: "images/products/black-2-slot-toaster.jpg",
    name: "2 Slot Toaster - Black",
    rating: {
      stars: 5,
      count: 2197
    },
    priceCents: 1899,
    keywords: [
      "toaster",
      "kitchen",
      "appliances"
    ],
  
    instructionsLink: 'images/appliance-instructions.png',
    warrantyLink: 'images/appliance-warranty.png'
        }
      );
    
    
    
      it('Passing variables correctly', () => {
        expect(product.name).toEqual('2 Slot Toaster - Black');
      })
    
      it('Showing the extra clothing info in HTML', () => {
        containerTest.innerHTML = product.extraInfoHTML();
        expect(containerTest.innerHTML.trim()).toEqual(`
      <a href="images/appliance-warranty.png" target="_blank">Warranty</a>
      <a href="images/appliance-instructions.png" target="_blank">Instructions Link</a>
      `.trim())
      })
    })
})
