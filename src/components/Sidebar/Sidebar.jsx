import styles from './Sidebar.module.css';

export default function Sidebar({
    currentPage,
    onNavigate,
    isLoggedIn,
    onOpenLogin,
    onOpenRegister,
    onLogout,
}) {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.topSection}>
                <div
                    className={styles.logo}
                    onClick={() => onNavigate(isLoggedIn ? 'home' : 'global')}
                >
                    Streak Diary
                </div>

                <nav className={styles.nav}>
                    {!isLoggedIn ? (
                        <button
                            type="button"
                            className={`${styles.navItem} ${
                                currentPage === 'global' ? styles.navItemActive : ''
                            }`}
                            onClick={() => onNavigate('global')}
                        >
                            Глобальна
                        </button>
                    ) : (
                        <>
                            <button
                                type="button"
                                className={`${styles.navItem} ${
                                    currentPage === 'home' ? styles.navItemActive : ''
                                }`}
                                onClick={() => onNavigate('home')}
                            >
                                Головна
                            </button>

                            <button
                                type="button"
                                className={`${styles.navItem} ${
                                    currentPage === 'global' ? styles.navItemActive : ''
                                }`}
                                onClick={() => onNavigate('global')}
                            >
                                Глобальна
                            </button>

                            <button
                                type="button"
                                className={`${styles.navItem} ${
                                    currentPage === 'friends' ? styles.navItemActive : ''
                                }`}
                                onClick={() => onNavigate('friends')}
                            >
                                Друзі
                            </button>

                            <button
                                type="button"
                                className={`${styles.navItem} ${
                                    currentPage === 'profile' ? styles.navItemActive : ''
                                }`}
                                onClick={() => onNavigate('profile')}
                            >
                                Профіль
                            </button>
                        </>
                    )}
                </nav>
            </div>

            <div className={styles.bottomSection}>
                {!isLoggedIn ? (
                    <>
                        <button
                            type="button"
                            className={styles.authBtnPrimary}
                            onClick={onOpenLogin}
                        >
                            Увійти
                        </button>
                        <button
                            type="button"
                            className={styles.authBtnSecondary}
                            onClick={onOpenRegister}
                        >
                            Зареєструватись
                        </button>
                    </>
                ) : (
                    <button
                        type="button"
                        className={styles.logoutBtn}
                        onClick={onLogout}
                    >
                        Вийти
                    </button>
                )}
            </div>
        </aside>
    );
}
