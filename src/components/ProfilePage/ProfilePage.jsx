import Sidebar from '../Sidebar/Sidebar';
import styles from './ProfilePage.module.css';

export default function ProfilePage({
    currentPage = 'profile',
    onNavigate,
    isLoggedIn = true,
    onLogout,
    user,
}) {
    const badges = [
        { id: 1, icon: '🔥', name: 'Перший вогник', desc: 'Успішно розпочато першу серію звичок' },
        { id: 2, icon: '⚡', name: '7 днів поспіль', desc: 'Тижневий стрік без жодного пропуску' },
        { id: 3, icon: '🏆', name: 'Майстер дисципліни', desc: 'Виконано понад 100 щоденних цілей' },
        { id: 4, icon: '🎓', name: 'Студент УжНУ', desc: 'Активний учасник студентського трекера' },
    ];

    return (
        <div className={styles.pageLayout}>
            <Sidebar
                currentPage={currentPage}
                onNavigate={onNavigate}
                isLoggedIn={isLoggedIn}
                onLogout={onLogout}
                user={user}
            />

            <div className={styles.contentWrapper}>
                <header className={styles.topBar}>
                    <h1 className={styles.pageTitle}>
                        <span>👤</span> Мій Профіль
                    </h1>
                </header>

                <main className={styles.mainContent}>
                    {/* Картка користувача */}
                    <div className={styles.profileCard}>
                        <div className={styles.profileInfo}>
                            <div className={styles.largeAvatar}>
                                {user?.initials || 'НП'}
                            </div>
                            <div className={styles.profileDetails}>
                                <h2 className={styles.userName}>{user?.name || 'Назар Піцура'}</h2>
                                <p className={styles.userBio}>
                                    Студент кафедри програмної інженерії, УжНУ • 3 курс
                                </p>
                                <span className={styles.userEmail}>
                                    {user?.email || 'pitsura.nazar@student.uzhnu.edu.ua'}
                                </span>
                            </div>
                        </div>

                        <button
                            type="button"
                            className={styles.editBtn}
                            onClick={() => alert('Редагування профілю буде додано в наступному оновленні!')}
                        >
                            Редагувати профіль
                        </button>
                    </div>

                    {/* Статистика */}
                    <div className={styles.statsGrid}>
                        <div className={styles.statCard}>
                            <div className={`${styles.statValue} ${styles.statValueFire}`}>
                                <span>🔥</span>
                                <span>{user?.streak || 28}</span>
                            </div>
                            <span className={styles.statLabel}>Поточна серія (днів)</span>
                        </div>

                        <div className={styles.statCard}>
                            <div className={styles.statValue}>
                                <span>⚡</span>
                                <span>45</span>
                            </div>
                            <span className={styles.statLabel}>Рекордна серія (днів)</span>
                        </div>

                        <div className={styles.statCard}>
                            <div className={styles.statValue}>
                                <span>📅</span>
                                <span>124</span>
                            </div>
                            <span className={styles.statLabel}>Всього днів активності</span>
                        </div>

                        <div className={styles.statCard}>
                            <div className={styles.statValue}>
                                <span>🎯</span>
                                <span>94%</span>
                            </div>
                            <span className={styles.statLabel}>Відсоток успіху</span>
                        </div>
                    </div>

                    {/* Досягнення */}
                    <div className={styles.card}>
                        <h2 className={styles.cardTitle}>
                            <span>🎖️</span> Нагороди та бейджі
                        </h2>

                        <div className={styles.badgesGrid}>
                            {badges.map((b) => (
                                <div key={b.id} className={styles.badgeItem}>
                                    <div className={styles.badgeIcon}>{b.icon}</div>
                                    <div className={styles.badgeInfo}>
                                        <span className={styles.badgeName}>{b.name}</span>
                                        <span className={styles.badgeDesc}>{b.desc}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
