/// <reference types="cypress" />

const baseApiUrl = 'http://localhost:5000/recommendations';
const body = {
    name: 'comeback kid - wake the dead',
    youtubeLink: 'https://www.youtube.com/watch?v=2NTyyCwwDfY'
}

describe('Recommendations', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });
    it('should make a recommendation', () => {
        cy.createRecommendation(body);
    });
    it('should get recommendations', () => {
        cy.getRecommendations();
    });
    it('should get recommendation by id', () => {
        cy.getRecommendationById(5);
    });
    it('should increment vote', () => {
        cy.upVote(5);
    });
    it('should decrement vote', () => {
        cy.downVote(5);
    });
});