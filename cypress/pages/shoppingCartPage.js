export class ShoppingCartPage {
    verifyProduct(productName) {
      cy.get(`#productName[name="${productName}"]`).should('exist');
    }
  
    formatPrice(price) {
      return `$ ${parseFloat(price).toFixed(2)}`;
    }
  
    verifyPriceForProduct(productName, expectedPrice) {
      const formattedExpectedPrice = this.formatPrice(expectedPrice);
  
      this.verifyProduct(productName);
  
      cy.get(`#productName[name="${productName}"]`)
        .parent() 
        .find('#unitPrice') 
        .invoke('text')
        .should('include', formattedExpectedPrice);
    }
  
    verifyTotalPrice(productName, expectedTotalPrice) {
      const formattedExpectedTotalPrice = this.formatPrice(expectedTotalPrice);
  
      this.verifyProduct(productName);
  
      cy.get(`#productName[name="${productName}"]`)
        .parent() 
        .find('#totalPrice')
        .invoke('text')
        .should('include', formattedExpectedTotalPrice);
    }
  
    verifyQuantity(productName, expectedQuantity) {
      this.verifyProduct(productName);
  
      cy.get(`#productName[name="${productName}"]`)
        .parent() 
        .find('#productAmount') 
        .invoke('text')
        .should('include', expectedQuantity);
    }

    verifyAccumulatedPrice(expectedAccumulatedPrice) {
        // Utiliza el selector adecuado para el precio acumulado
        cy.get('.css-n1d5pa > .chakra-button').click();
        
        cy.get('.css-1g7ucpo > :nth-child(1) > b')
          .invoke('text')
          .then(($text) => {
            const actualAccumulatedPrice = ($text || '').trim();
            expect(actualAccumulatedPrice).to.equal(expectedAccumulatedPrice.trim());
          });
      }
    
      clickShowTotalPrice() {
        cy.get('.css-n1d5pa > .chakra-button').click();
      }
    }
  
  