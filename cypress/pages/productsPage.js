export class ProductsPage {
    clickProductsPage() {
        cy.get('#onlineshoplink').click();
    }

    addProductsPage()  {
        cy.get('[data-cy="add-to-cart-1000"] > .tabler-icon').click();
        cy.get('#closeModal').click();
    }

    addProductsPages() {
        cy.get('[data-cy="add-to-cart-1006"] > .tabler-icon').click();
        cy.get('#closeModal').click();
    }

    buttonProductsPage () {
        cy.get('.css-1ktw94t > [data-cy="goShoppingCart"]').click();
    }
}