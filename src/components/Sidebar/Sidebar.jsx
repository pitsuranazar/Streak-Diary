import { NavLink, Link, useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.css';

export default function Sidebar({
    isLoggedIn,
    onOpenLogin,
    onOpenRegister,
    onLogout,
}) {
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        onLogout();
        navigate('/');
    };

    return (
        <aside className={styles.sidebar}>
            <div className={styles.topSection}>
                <Link
                    to={isLoggedIn ? '/home' : '/'}
                    className={styles.logo}
                >
                    Streak Diary
                </Link>

                <nav className={styles.nav}>
                    {!isLoggedIn ? (
                        <NavLink
                            to="/"
                            end
                            className={({ isActive }) =>
                                `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
                            }
                        >
                            Глобальна
                        </NavLink>
                    ) : (
                        <>
                            <NavLink
                                to="/home"
                                className={({ isActive }) =>
                                    `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
                                }
                            >
                                Головна
                            </NavLink>

                            <NavLink
                                to="/"
                                end
                                className={({ isActive }) =>
                                    `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
                                }
                            >
                                Глобальна
                            </NavLink>

                            <NavLink
                                to="/friends"
                                className={({ isActive }) =>
                                    `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
                                }
                            >
                                Друзі
                            </NavLink>

                            <NavLink
                                to="/profile"
                                className={({ isActive }) =>
                                    `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
                                }
                            >
                                Профіль
                            </NavLink>
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
                        onClick={handleLogoutClick}
                    >
                        Вийти
                    </button>
                )}
            </div>
        </aside>
    );
}
