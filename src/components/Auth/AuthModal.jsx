import { useState } from 'react';
import styles from './AuthModal.module.css';

export default function AuthModal({ initialMode = 'login', onClose, onSuccessLogin }) {
    const [mode, setMode] = useState(initialMode);

    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (mode === 'register' && password !== confirmPassword) {
            alert('Паролі не співпадають!');
            return;
        }

        onSuccessLogin();
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
                    <h2 className={styles.title}>
                        {mode === 'login' ? 'Вхід' : 'Реєстрація'}
                    </h2>
                    <p className={styles.subtitle}>
                        {mode === 'login'
                            ? 'Введіть дані для входу'
                            : 'Створіть свій обліковий запис'}
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
                        <>
                            {/* Ім'я та Прізвище (необов'язкові) */}
                            <div className={styles.rowTwoCols}>
                                <div className={styles.fieldGroup}>
                                    <label className={styles.label} htmlFor="reg-first-name">
                                        Ім&apos;я <span className={styles.optionalTag}>(необов&apos;язково)</span>
                                    </label>
                                    <input
                                        id="reg-first-name"
                                        type="text"
                                        className={styles.input}
                                        placeholder="Олександр"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>

                                <div className={styles.fieldGroup}>
                                    <label className={styles.label} htmlFor="reg-last-name">
                                        Прізвище <span className={styles.optionalTag}>(необов&apos;язково)</span>
                                    </label>
                                    <input
                                        id="reg-last-name"
                                        type="text"
                                        className={styles.input}
                                        placeholder="Шевченко"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Нікнейм (обов'язковий) */}
                            <div className={styles.fieldGroup}>
                                <label className={styles.label} htmlFor="reg-nickname">
                                    Нікнейм
                                </label>
                                <input
                                    id="reg-nickname"
                                    type="text"
                                    className={styles.input}
                                    placeholder="username"
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)}
                                    required
                                />
                            </div>
                        </>
                    )}

                    {/* Пошта */}
                    <div className={styles.fieldGroup}>
                        <label className={styles.label} htmlFor="auth-email">
                            Електронна пошта
                        </label>
                        <input
                            id="auth-email"
                            type="email"
                            className={styles.input}
                            placeholder="email@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Пароль */}
                    <div className={styles.fieldGroup}>
                        <label className={styles.label} htmlFor="auth-password">
                            Пароль
                        </label>
                        <input
                            id="auth-password"
                            type={showPassword ? 'text' : 'password'}
                            className={styles.input}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Підтвердження пароля (тільки при реєстрації) */}
                    {mode === 'register' && (
                        <div className={styles.fieldGroup}>
                            <label className={styles.label} htmlFor="auth-confirm-password">
                                Повторіть пароль
                            </label>
                            <input
                                id="auth-confirm-password"
                                type={showPassword ? 'text' : 'password'}
                                className={styles.input}
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    {/* Галочка: Показати пароль */}
                    <div className={styles.checkboxRow}>
                        <input
                            id="show-password"
                            type="checkbox"
                            className={styles.checkboxInput}
                            checked={showPassword}
                            onChange={(e) => setShowPassword(e.target.checked)}
                        />
                        <label htmlFor="show-password" className={styles.checkboxLabel}>
                            Показати пароль
                        </label>
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                        {mode === 'login' ? 'Увійти' : 'Зареєструватися'}
                    </button>

                    <p className={styles.switchText}>
                        {mode === 'login' ? 'Немає акаунту?' : 'Вже маєте акаунт?'}
                        <span
                            className={styles.switchLink}
                            onClick={() => {
                                setMode(mode === 'login' ? 'register' : 'login');
                                setConfirmPassword('');
                            }}
                        >
                            {mode === 'login' ? 'Зареєструватись' : 'Увійти'}
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
}
