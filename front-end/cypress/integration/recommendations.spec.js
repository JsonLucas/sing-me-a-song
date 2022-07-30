/// <reference types="cypress" />

const baseApiUrl = 'http://localhost:5000';
describe('Recommendations', () => {
    it('should make a successful recommendation', () => {
        cy.visit('http://localhost:3000');
        cy.get('input[type="text"]').type('recommendation');
        cy.get('input[type="url"]').type('https://www.youtube.com/watch?v=2NTyyCwwDfY');
        cy.get('.submit-recommendation').click();
    });
});