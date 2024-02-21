export class  ReciptPage {
    constructor () {
        this.firstNameInput = '[data-cy="name"]'
        this.firstNameInput = '[data-cy="name"]'
        this.cardNumberInput = '[data-cy="creditCard"]'
        this.costTotal = '[data-cy="totalPrice"]'
    };

    getCheckRecipt(nombre,apellido,tarjeta,total){
        cy.get(this.firstNameInput).should('include.text',nombre);
        cy.get(this.firstNameInput).should('include.text',apellido);
        cy.get(this.cardNumberInput).should('include.text',tarjeta);
        cy.get(this.costTotal).should('include.text',total)
    }
    getProductRecipt(producto) {
        cy.contains('p',producto).should('exist');
    }

    getButtonRecipt() {
        cy.get('[data-cy="thankYou"]').click();
    }
}