describe('Streak Diary E2E Tests', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('показує глобальну стрічку та обмежене меню для неавторизованого користувача', () => {
        // Перевірка логотипу
        cy.contains('Streak Diary').should('be.visible');

        // Перевірка, що в меню є тільки Глобальна
        cy.contains('button', 'Глобальна').should('be.visible');
        cy.contains('button', 'Головна').should('not.exist');
        cy.contains('button', 'Друзі').should('not.exist');
        cy.contains('button', 'Профіль').should('not.exist');

        // Перевірка кнопок Увійти та Зареєструватись у сайдбарі
        cy.contains('button', 'Увійти').should('be.visible');
        cy.contains('button', 'Зареєструватись').should('be.visible');

        // Перевірка карток глобальної стрічки
        cy.contains('Глобальна стрічка').should('be.visible');
        cy.contains('Запаліть свою власну серію звичок!').should('be.visible');
    });

    it('відкриває модальне вікно авторизації та дозволяє увійти', () => {
        // Клік на кнопку Увійти
        cy.contains('button', 'Увійти').first().click();

        // Відображення модального вікна
        cy.contains('Вхід у Streak Diary').should('be.visible');
        cy.get('input[type="email"]').should('be.visible');
        cy.get('input[type="password"]').should('be.visible');

        // Сабміт форми
        cy.get('form').submit();

        // Після входу меню розширюється
        cy.contains('button', 'Головна').should('be.visible');
        cy.contains('button', 'Друзі').should('be.visible');
        cy.contains('button', 'Профіль').should('be.visible');

        // Відображається кабінет з календарем активності
        cy.contains('Мій Щоденник Звичок').should('be.visible');
        cy.contains('Календар активності').should('be.visible');
    });
});