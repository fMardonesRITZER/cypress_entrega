export class ProductsPage {
  clickProductsPage() {
    cy.get('#onlineshoplink').click();
  }

  addProduct(producto) {
    cy.get(`[name="${producto}"]`).click();
    cy.get('#closeModal').click();
  }
  buttonProductsPage() {
    cy.get('.css-1ktw94t > [data-cy="goShoppingCart"]').click();
  }
}

  
  