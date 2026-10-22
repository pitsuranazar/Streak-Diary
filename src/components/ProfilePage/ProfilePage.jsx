import Sidebar from '../Sidebar/Sidebar';
import styles from './ProfilePage.module.css';

export default function ProfilePage({
    currentPage = 'profile',
    onNavigate,
    isLoggedIn = true,
    onLogout,
}) {
    const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];
    const emptyDays = [1, 2, 3];
    const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
    const highlightedDay = 22;

    return (
        <div className={styles.pageLayout}>
            <Sidebar
                currentPage={currentPage}
                onNavigate={onNavigate}
                isLoggedIn={isLoggedIn}
                onLogout={onLogout}
            />

            <main className={styles.contentWrapper}>
                {/* Картка інформації профілю */}
                <div className={styles.profileCard}>
                    <div className={styles.userBlock}>
                        <div className={styles.avatar}>👤</div>
                        <div className={styles.userInfo}>
                            <h2 className={styles.userName}>Користувач</h2>
                            <p className={styles.userBio}>Особистий профіль та історія активності</p>
                        </div>
                    </div>
                    <button type="button" className={styles.editBtn}>
                        Редагувати профіль
                    </button>
                </div>

                {/* Календар активності користувача за макетом Figma */}
                <div className={styles.calendarCard}>
                    <div className={styles.calendarHeader}>
                        <button type="button" className={styles.navBtn}>
                            ‹ Попередній
                        </button>
                        <span className={styles.monthTitle}>Жовтень 2026</span>
                        <button type="button" className={styles.navBtn}>
                            Наступний ›
                        </button>
                    </div>

                    <div className={styles.grid}>
                        {weekDays.map((day) => (
                            <div key={day} className={styles.weekDay}>
                                {day}
                            </div>
                        ))}

                        {emptyDays.map((n) => (
                            <div key={`empty-${n}`} className={styles.emptyCell} />
                        ))}

                        {daysInMonth.map((day) => {
                            const isHighlighted = day === highlightedDay;
                            return (
                                <div
                                    key={day}
                                    className={`${styles.dayCell} ${
                                        isHighlighted ? styles.cellHighlighted : ''
                                    }`}
                                >
                                    <span>{day}</span>
                                    {isHighlighted && (
                                        <span className={styles.flameTag}>🔥</span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>
        </div>
    );
}
