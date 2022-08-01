/// <reference types="cypress" />

const baseApiUrl = 'http://localhost:5000/recommendations';
const body = {
    name: 'comeback kid - wake the dead',
    youtubeLink: 'https://www.youtube.com/watch?v=2NTyyCwwDfY'
}

before(() => { cy.resetDatabase(); })
beforeEach(() => {
    cy.visit('http://localhost:3000');
});

describe('Recommendations', () => {
    it('should make a recommendation', () => {
        cy.createRecommendation(body);
    });
    it('should get recommendations', () => {
        cy.getRecommendations();
    });
    it('should get recommendation by id', () => {
        cy.getRecommendationById(1);
    });
    it('should increment vote', () => {
        cy.upVote(1);
    });
    it('should decrement vote', () => {
        cy.downVote(1);
    });
    it('should get amount of recommendations', () => {
        const amount = Math.floor((Math.random() * 100) + 1);
        cy.getAmountOfRecommendations(amount);
    });
    it('should get a random recommendation', () => {
        cy.getRandomRecommendation();
    });
});