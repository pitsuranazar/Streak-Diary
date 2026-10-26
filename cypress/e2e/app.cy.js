describe('Streak Diary E2E Routing Tests', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('показує глобальну стрічку та обмежене меню для неавторизованого користувача на маршруті /', () => {
        cy.url().should('eq', `${Cypress.config().baseUrl}/`);
        cy.contains('Streak Diary').should('be.visible');

        // Перевірка навігації NavLink (тег a)
        cy.contains('a', 'Глобальна').should('be.visible');
        cy.contains('a', 'Головна').should('not.exist');
        cy.contains('a', 'Друзі').should('not.exist');
        cy.contains('a', 'Профіль').should('not.exist');

        // Кнопки авторизації в сайдбарі
        cy.contains('button', 'Увійти').should('be.visible');
        cy.contains('button', 'Зареєструватись').should('be.visible');
        cy.contains('Глобальна стрічка').should('be.visible');
    });

    it('захищає приватні маршрути (ProtectedRoute) і перенаправляє гостя на /', () => {
        // Спроба неавторизованого переходу на захищений маршрут
        cy.visit('/home');
        cy.url().should('eq', `${Cypress.config().baseUrl}/`);
        cy.contains('Вхід').should('be.visible');
    });

    it('авторизує користувача, перенаправляє на /home і дозволяє перемикати сторінки через react-router', () => {
        // Відкриття форми входу
        cy.contains('button', 'Увійти').first().click();
        cy.contains('Вхід').should('be.visible');
        cy.get('input[type="email"]').type('student@uzhnu.edu.ua');
        cy.get('input[type="password"]').type('password123');
        cy.get('form').submit();

        // Перевірка переходу на /home
        cy.url().should('include', '/home');
        cy.contains('a', 'Головна').should('be.visible');
        cy.contains('a', 'Друзі').should('be.visible');
        cy.contains('a', 'Профіль').should('be.visible');

        // Перехід на /friends через клік по NavLink
        cy.contains('a', 'Друзі').click();
        cy.url().should('include', '/friends');
        cy.contains('Підписки').should('be.visible');

        // Перехід на /profile
        cy.contains('a', 'Профіль').click();
        cy.url().should('include', '/profile');
        cy.contains('Користувач').should('be.visible');

        // Вихід із системи (Logout)
        cy.contains('button', 'Вийти').click();
        cy.url().should('eq', `${Cypress.config().baseUrl}/`);
        cy.contains('a', 'Головна').should('not.exist');
    });
});