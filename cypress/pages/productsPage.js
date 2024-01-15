export class ProductsPage {
  clickProductsPage() {
    cy.get('#onlineshoplink').click();
  }

  addProduct(productName) {
    cy.get(`[data-cy="add-to-cart-${productName}"] > .tabler-icon`).click();
    cy.get('#closeModal').click();
  }

  buttonProductsPage() {
    cy.get('.css-1ktw94t > [data-cy="goShoppingCart"]').click();
  }
}

  
  