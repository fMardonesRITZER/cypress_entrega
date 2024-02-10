import 'cypress-xpath';
import { ProductsPage } from '../../pages/productsPage';
import { ShoppingCartPage } from '../../pages/shoppingCartPage';
import { LoginPage } from '../../pages/loginPage';
import { CheckoutPage } from '../../pages/checkoutPage';

describe('PreEntrega', () => {
  let loginPage = new LoginPage();
  let productsPage = new ProductsPage();
  let shoppingCartPage = new ShoppingCartPage();
  let checkoutPage = new CheckoutPage();
  let products;

  before(() => {
    cy.fixture('shopCart.json').then((data) => {
      products = data;
    });

    cy.visit('/');
  });

  beforeEach(() => {
    cy.visit('/');
    cy.get('#registertoggle').dblclick();
    loginPage.escribirUsuario(Cypress.env().usuario);
    loginPage.escribirContraseña(Cypress.env().password);
    loginPage.clickLogIn();
  });


it('Unico Test', () => {
  productsPage.clickProductsPage();
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
checkoutPage.completarFormulario('test', 'test' , '1234561234567891')



});
});