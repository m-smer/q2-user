// @ts-ignore
describe('Прохождение теста', () => {
    const quizHost = 'http://' + Cypress.env('quiz_host');

    it('passes, redirects', () => {
        cy.intercept('GET', '/v1/quiz/get?url_id=wt&domain=localhost*', {
            fixture: 'quiz.json',
        }).as('quiz/get');
        cy.intercept('POST', '/v1/session/add*', {
            fixture: 'sessionAdd.json',
        }).as('session/add');
        cy.visit(quizHost + '/wt?utm_source=cypress_test');
        cy.get('.checkbox_label').eq(1).click();
        cy.get('input[name="phone"]').click().type('9111111111');
        cy.get('button[type="submit"]').click();
        cy.url().should('not.contain', 'localhost');
    });

    it('refreshes session', () => {
        cy.intercept('GET', '/v1/quiz/get?url_id=wt&domain=localhost*', {
            fixture: 'quiz.json',
        }).as('quiz/get');
        cy.intercept('POST', '/v1/session/add*', {
            fixture: 'sessionAdd.json',
        }).as('session/add');
        cy.visit(quizHost + '/wt?utm_source=cypress_test');
        cy.get('.mainTitle').should('contain.text', 'Предлагаем рассмотреть');
        cy.get('.checkbox_label').eq(1).click();
        cy.reload();
        cy.get('.mainTitle').should('contain.text', 'Предлагаем рассмотреть');
    });

    it('not refreshes session', () => {
        cy.intercept('GET', '/v1/quiz/get?url_id=wt&domain=localhost*', {
            fixture: 'quizWithTenaciousSession.json',
        }).as('quiz/get');
        cy.intercept('POST', '/v1/session/add*', {
            fixture: 'sessionAdd.json',
        }).as('session/add');
        cy.visit(quizHost + '/wt?utm_source=cypress_test');
        cy.get('.mainTitle').should('contain.text', 'Предлагаем рассмотреть');
        cy.get('.checkbox_label').eq(1).click();
        cy.reload();
        cy.get('.mainTitle').should(
            'not.contain.text',
            'Предлагаем рассмотреть',
        );
    });
});
