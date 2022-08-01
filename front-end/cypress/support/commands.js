const baseApiUrl = 'http://localhost:5000/recommendations';

Cypress.Commands.add('createRecommendation', (recommendation) => {
    cy.intercept('POST', `${baseApiUrl}/`).as('recommendation');
    cy.get('.recommendation-name').type(recommendation.name).should('have.value', recommendation.name);
    cy.get('.recommendation-url').type(recommendation.youtubeLink).should('have.value', recommendation.youtubeLink);
    cy.get('.submit-recommendation').click();
    cy.wait('@recommendation').its('response.statusCode').should('be.oneOf', [201, 404, 409, 422]);
});

Cypress.Commands.add('getRecommendations', () => {
    cy.request('GET', `${baseApiUrl}/`).should((res) => {
        expect(res.status).to.equal(200); // 'id', 'name', 'youtubeLink', 'score'
    });
});

Cypress.Commands.add('getRecommendationById', (id) => {
    cy.request('GET', `${baseApiUrl}/${id}`).should((res) => {
        id !== 0 ? expect(res.status).to.equal(200) : expect(res.status).to.equal(404);
    }) ;
});

Cypress.Commands.add('upVote', (id) => {
    cy.intercept('POST', `${baseApiUrl}/${id}/upvote`).as('upVote');
    cy.get('.up-vote').click();
    cy.wait('@upVote').its('response.statusCode').should('be.oneOf', [200, 404]);
});

Cypress.Commands.add('downVote', (id) => {
    cy.intercept('POST', `${baseApiUrl}/${id}/downvote`).as('downVote');
    cy.get('.down-vote').click();
    cy.wait('@downVote').its('response.statusCode').should('be.oneOf', [200, 404]);
});