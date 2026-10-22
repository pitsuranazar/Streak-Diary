import styles from './Sidebar.module.css';

export default function Sidebar({
    currentPage,
    onNavigate,
    isLoggedIn,
    onOpenLogin,
    onOpenRegister,
    onLogout,
    user,
}) {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.topSection}>
                {/* Логотип проєкту */}
                <div
                    className={styles.logo}
                    onClick={() => onNavigate(isLoggedIn ? 'home' : 'global')}
                >
                    <span className={styles.logoIcon}>🔥</span>
                    <span className={styles.logoText}>Streak Diary</span>
                </div>

                {/* Навігація сайдбара */}
                <nav className={styles.nav}>
                    <div className={styles.navSectionTitle}>Меню</div>

                    {!isLoggedIn ? (
                        /* Для неавторизованого користувача: ТІЛЬКИ Глобальна */
                        <button
                            type="button"
                            className={`${styles.navItem} ${
                                currentPage === 'global' ? styles.navItemActive : ''
                            }`}
                            onClick={() => onNavigate('global')}
                        >
                            <span className={styles.navIcon}>🌍</span>
                            <span>Глобальна</span>
                        </button>
                    ) : (
                        /* Для авторизованого користувача: Головна, Глобальна, Друзі, Профіль */
                        <>
                            <button
                                type="button"
                                className={`${styles.navItem} ${
                                    currentPage === 'home' ? styles.navItemActive : ''
                                }`}
                                onClick={() => onNavigate('home')}
                            >
                                <span className={styles.navIcon}>📅</span>
                                <span>Головна</span>
                            </button>

                            <button
                                type="button"
                                className={`${styles.navItem} ${
                                    currentPage === 'global' ? styles.navItemActive : ''
                                }`}
                                onClick={() => onNavigate('global')}
                            >
                                <span className={styles.navIcon}>🌍</span>
                                <span>Глобальна</span>
                            </button>

                            <button
                                type="button"
                                className={`${styles.navItem} ${
                                    currentPage === 'friends' ? styles.navItemActive : ''
                                }`}
                                onClick={() => onNavigate('friends')}
                            >
                                <span className={styles.navIcon}>👥</span>
                                <span>Друзі</span>
                            </button>

                            <button
                                type="button"
                                className={`${styles.navItem} ${
                                    currentPage === 'profile' ? styles.navItemActive : ''
                                }`}
                                onClick={() => onNavigate('profile')}
                            >
                                <span className={styles.navIcon}>👤</span>
                                <span>Профіль</span>
                            </button>
                        </>
                    )}
                </nav>
            </div>

            {/* Нижня секція сайдбара */}
            <div className={styles.bottomSection}>
                {!isLoggedIn ? (
                    /* Пункт Увійти та Зареєструватись для неавторизованого гостя */
                    <div className={styles.guestAuthBox}>
                        <p className={styles.guestPrompt}>
                            Увійдіть, щоб вести власний календар звичок та додавати друзів.
                        </p>
                        <button
                            type="button"
                            className={styles.loginBtn}
                            onClick={onOpenLogin}
                        >
                            Увійти
                        </button>
                        <button
                            type="button"
                            className={styles.registerBtn}
                            onClick={onOpenRegister}
                        >
                            Зареєструватись
                        </button>
                    </div>
                ) : (
                    /* Профіль авторизованого користувача */
                    <div className={styles.userBox}>
                        <div className={styles.userInfo}>
                            <div className={styles.avatar}>
                                {user?.initials || 'Я'}
                            </div>
                            <div className={styles.userDetails}>
                                <div className={styles.userName}>
                                    {user?.name || 'Мій Профіль'}
                                </div>
                                <div className={styles.userStreak}>
                                    🔥 {user?.streak || 7} днів серії
                                </div>
                            </div>
                        </div>
                        <button
                            type="button"
                            className={styles.logoutBtn}
                            onClick={onLogout}
                        >
                            🚪 Вийти
                        </button>
                    </div>
                )}
            </div>
        </aside>
    );
}
