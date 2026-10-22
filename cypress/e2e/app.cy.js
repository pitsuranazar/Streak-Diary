describe('Streak Diary E2E Tests', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('показує глобальну стрічку та обмежене меню для неавторизованого користувача', () => {
        cy.contains('Streak Diary').should('be.visible');
        cy.contains('button', 'Глобальна').should('be.visible');
        cy.contains('button', 'Головна').should('not.exist');
        cy.contains('button', 'Друзі').should('not.exist');
        cy.contains('button', 'Профіль').should('not.exist');
        cy.contains('button', 'Увійти').should('be.visible');
        cy.contains('button', 'Зареєструватись').should('be.visible');
        cy.contains('Глобальна стрічка').should('be.visible');
    });

    it('відкриває модальне вікно авторизації та дозволяє увійти', () => {
        cy.contains('button', 'Увійти').first().click();
        cy.contains('Вхід').should('be.visible');
        cy.get('input[type="email"]').should('be.visible');
        cy.get('input[type="password"]').should('be.visible');
        cy.get('form').submit();
        cy.contains('button', 'Головна').should('be.visible');
        cy.contains('button', 'Друзі').should('be.visible');
        cy.contains('button', 'Профіль').should('be.visible');
        cy.contains('Жовтень 2026').should('be.visible');
    });
});