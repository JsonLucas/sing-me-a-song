/// <reference types="cypress" />

describe('up votes', () => {
    it('should increment vote', () => {
        cy.get('.up-vote').click();
        cy.request('POST', 'http://localhost:5000/1/upvote').then(({status}) => {
            expect(status).to.equal(200);
        });
    });
    it('should decrement vote', () => {
        cy.get('.down-vote').click();
        cy.request('POST', 'http://localhost:5000/1/downvote').then(({status}) => {
            expect(status).to.equal(200);
        });
    });
});