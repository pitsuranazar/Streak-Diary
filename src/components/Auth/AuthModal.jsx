import { useState } from 'react';
import styles from './AuthModal.module.css';

export default function AuthModal({ initialMode = 'login', onClose, onSuccessLogin }) {
    const [mode, setMode] = useState(initialMode);
    const [name, setName] = useState('Назар Піцура');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Імітація успішної авторизації (без бекенду за вимогами лаби)
        const initials = name
            ? name.split(' ').map((n) => n[0]).join('').toUpperCase()
            : 'НП';

        onSuccessLogin({
            name: mode === 'register' ? (name || 'Користувач') : 'Назар Піцура',
            initials: mode === 'register' ? initials : 'НП',
            email: email || 'student@uzhnu.edu.ua',
            streak: 7,
        });
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div
                className={styles.modal}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    className={styles.closeButton}
                    onClick={onClose}
                    aria-label="Закрити"
                >
                    ✕
                </button>

                <div className={styles.header}>
                    <div className={styles.flameIcon}>🔥</div>
                    <h2 className={styles.title}>
                        {mode === 'login' ? 'Вхід у Streak Diary' : 'Створення акаунту'}
                    </h2>
                    <p className={styles.subtitle}>
                        {mode === 'login'
                            ? 'Продовжуйте щоденні серії звичок'
                            : 'Почніть відстежувати свій прогрес сьогодні'}
                    </p>
                </div>

                <div className={styles.tabs}>
                    <button
                        type="button"
                        className={`${styles.tab} ${mode === 'login' ? styles.tabActive : ''}`}
                        onClick={() => setMode('login')}
                    >
                        Вхід
                    </button>
                    <button
                        type="button"
                        className={`${styles.tab} ${mode === 'register' ? styles.tabActive : ''}`}
                        onClick={() => setMode('register')}
                    >
                        Реєстрація
                    </button>
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                    {mode === 'register' && (
                        <div className={styles.fieldGroup}>
                            <label className={styles.label} htmlFor="auth-name">
                                Ваше ім&apos;я та прізвище
                            </label>
                            <input
                                id="auth-name"
                                type="text"
                                className={styles.input}
                                placeholder="Олександр Петренко"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    <div className={styles.fieldGroup}>
                        <label className={styles.label} htmlFor="auth-email">
                            Електронна пошта
                        </label>
                        <input
                            id="auth-email"
                            type="email"
                            className={styles.input}
                            placeholder="student@uzhnu.edu.ua"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.fieldGroup}>
                        <label className={styles.label} htmlFor="auth-password">
                            Пароль
                        </label>
                        <input
                            id="auth-password"
                            type="password"
                            className={styles.input}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                        {mode === 'login' ? 'Увійти' : 'Зареєструватися'}
                    </button>

                    <p className={styles.switchText}>
                        {mode === 'login' ? 'Немає акаунту?' : 'Вже маєте акаунт?'}
                        <span
                            className={styles.switchLink}
                            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                        >
                            {mode === 'login' ? 'Зареєструватись' : 'Увійти'}
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
}
