/// <reference types="cypress" />

const baseApiUrl = 'http://localhost:5000';
const body = {
    name: 'comeback kid - wake the dead',
    youtubeLink: 'https://www.youtube.com/watch?v=2NTyyCwwDfY'
}

describe('Recommendations', () => {
    it('validate recommendation fields', () => {
        cy.get('.recommendation-name').should('not.be.empty');
        cy.get('.recommendation-url').should('not.be.empty');
    });
    it('should make a successful recommendation', () => {
        cy.visit('http://localhost:3000');
        cy.get('.recommendation-name').type(body.name);
        cy.get('.recommendation-url').type(body.youtubeLink);
        cy.get('.submit-recommendation').click();
    });
    it('request test api success', () => {
        cy.request('POST', `${baseApiUrl}/`, body).then(({status}) => {
            expect(status).to.equal(201);
        });
    });
    it('request test api fail', () => {
        cy.request('POST', `${baseApiUrl}/`, body).then((response) => {
            console.log(response);
        });
    });
});