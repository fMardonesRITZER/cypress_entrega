import 'cypress-xpath';
import { ProductsPage } from '../../pages/productsPage';
import { ShoppingCartPage } from '../../pages/shoppingCartPage';
import { LoginPage } from '../../pages/loginPage';
import { CheckoutPage } from '../../pages/checkoutPage';
import { ReciptPage } from '../../pages/reciptPage';

describe('PreEntrega', () => {
  let loginPage = new LoginPage();
  let productsPage = new ProductsPage();
  let shoppingCartPage = new ShoppingCartPage();
  let checkoutPage = new CheckoutPage();
  let reciptPage = new ReciptPage();
  let checkout;
  let products;
  const baseUrl = 'https://pushing-it.onrender.com';
  let token;

  before(() => {
    cy.fixture('shopCart.json').then((data) => {
      products = data;
    });
    cy.fixture('checkout.json').then((check) =>{
      checkout = check;
    }) 

    cy.visit('/');
    //Enviar una petición HTTP que registre un nuevo usuario
    cy.request({
      method: "POST",
      url: `${baseUrl}/api/register`,
      headers: {
          "authorization": `Bearer ${token}`
      },
      body:
      {
          username: 'Mardones' + Math.floor(Math.random() * 1000),
          password: '1234567!',
          gender:'Male',
          year: '1995',
          month: '4',
          day: '24'
      },
    }).then(response => {
      cy.log(response);
      expect(response.status).to.be.equal(201);
      expect(`${response.body.newUser.username}`).exist;

      //Enviar una petición HTTP que haga login con el nuevo usuario
      cy.request({
        method: "POST",
        url: `${baseUrl}/api/login`,
        headers: {
          "authorization": `Bearer ${token}`,
        },
        body:
        {
          "username": `${response.body.newUser.username}`,
          "password": "1234567!",
        },
      }).then((response) => {
        cy.log(response);
        window.localStorage.setItem('token', response.body.token);
        window.localStorage.setItem('username', response.body.user.username);
        window.localStorage.setItem('userId', response.body.user._id);
        expect(response.status).to.equal(201)
        expect(`${response.body.user.username}`).exist

      });
      
      cy.reload();
      productsPage.clickProductsPage();
    });
  });

  it('Unico Test', () => {
    productsPage.addProduct(products.product1.name);
    productsPage.addProduct(products.product1.name);
    productsPage.addProduct(products.product2.name);
    productsPage.buttonProductsPage();

    shoppingCartPage.verifyPriceForProduct(
      products.product1.name,
      products.product1.price
    );

    shoppingCartPage.verifyTotalPrice(
      products.product1.name,
      (parseFloat(products.product1.price) * products.product1.quantity).toFixed(2)
    );

    shoppingCartPage.verifyQuantity(
      products.product1.name,
      products.product1.quantity.toString()
    );

    shoppingCartPage.verifyPriceForProduct(
      products.product2.name,
      products.product2.price
    );

    shoppingCartPage.verifyTotalPrice(
      products.product2.name,
      (parseFloat(products.product2.price) * products.product2.quantity).toFixed(2)
    );

    shoppingCartPage.verifyQuantity(
      products.product2.name,
      products.product2.quantity.toString()
    );

    shoppingCartPage.clickShowTotalPrice();
    shoppingCartPage.verifyQuantityTotal(
      (parseFloat(products.product1.price) * products.product1.quantity +
      parseFloat(products.product2.price) * products.product2.quantity).toFixed(2)
    );

    shoppingCartPage.checkOutPage();
    checkoutPage.completarFormulario(checkout.firstName, checkout.lastName, checkout.cardNumber);

    reciptPage.getCheckRecipt(checkout.firstName, checkout.lastName , checkout.cardNumber,checkout.costTotal);
    reciptPage.getProductRecipt(products.product1.name);
    reciptPage.getProductRecipt(products.product2.name);
    reciptPage.getButtonRecipt();
  });
});
