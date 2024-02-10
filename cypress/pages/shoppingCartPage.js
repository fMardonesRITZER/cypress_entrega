export class ShoppingCartPage {
  verifyProductExists(productName) {
    cy.get(`#productName[name="${productName}"]`).should('exist');
  }

  formatPrice(price) {
    return `$ ${parseFloat(price).toFixed(2)}`;
  }

  getPriceElement(productName) {
    return cy.get(`#productName[name="${productName}"]`).parent();
  }

  verifyPriceForProduct(productName, expectedPrice) {
    const formattedExpectedPrice = this.formatPrice(expectedPrice);
    const productElement = this.getPriceElement(productName);

    productElement.find('#unitPrice').invoke('text').should('include', formattedExpectedPrice);
  }

  verifyTotalPrice(productName, expectedTotalPrice) {
    const formattedExpectedTotalPrice = this.formatPrice(expectedTotalPrice);
    const productElement = this.getPriceElement(productName);

    productElement.find('#totalPrice').invoke('text').should('include', formattedExpectedTotalPrice);
  }

  verifyQuantity(productName, expectedQuantity) {
    const productElement = this.getPriceElement(productName);

    productElement.find('#productAmount').invoke('text').should('include', expectedQuantity);
  }

  clickShowTotalPrice() {
    cy.get('.css-n1d5pa > .chakra-button').click();
  }

  verifyQuantityTotal(expectedTotal) {
    cy.get('.css-1g7ucpo #price b')
      .invoke('text')
      .should('eq', expectedTotal);
  }


  checkOutPage() {
    cy.get('[data-cy="goCheckout"]').click();
  }
  
}