import 'cypress-xpath';
import { ProductsPage } from '../../pages/productsPage';
import { ShoppingCartPage } from '../../pages/shoppingCartPage';
import { LoginPage } from '../../pages/loginPage';


describe('PreEntrega', () => {
  let loginPage = new LoginPage();
  let productsPage = new ProductsPage();
  let shoppingCartPage = new ShoppingCartPage();
  let products;

  before(() => {
    cy.fixture('shopCart.json').then((data) => {
      products = data;
    });

    cy.visit('/');
  });

  beforeEach(() => {
    cy.visit('')
    cy.get('#registertoggle').dblclick();
    loginPage.escribirUsuario(Cypress.env().usuario)
    loginPage.escribirContraseña(Cypress.env().password)
    loginPage.clickLogIn();
});
  

  it('Unico Test', () => {
    productsPage.clickProductsPage();
    productsPage.addProductsPage();
    productsPage.addProductsPage();
    productsPage.addProductsPages();
    productsPage.buttonProductsPage();

    //Primer producto
    shoppingCartPage.verifyPriceForProduct('Buzo Negro', '23.76');
    shoppingCartPage.verifyTotalPrice('Buzo Negro', '47.52');
    shoppingCartPage.verifyQuantity('Buzo Negro', '2');

    // Para el segundo producto
    shoppingCartPage.verifyPriceForProduct('Patanlon Pijama Rojo', '12.23');
    shoppingCartPage.verifyTotalPrice('Patanlon Pijama Rojo', '12.23');
    shoppingCartPage.verifyQuantity('Patanlon Pijama Rojo', '1');

    shoppingCartPage.clickShowTotalPrice();
    shoppingCartPage.verifyQuantityTotal();
    
  });
});

