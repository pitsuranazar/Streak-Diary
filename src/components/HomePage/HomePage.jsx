import Sidebar from '../Sidebar/Sidebar';
import styles from './HomePage.module.css';

export default function HomePage({
    currentPage = 'home',
    onNavigate,
    isLoggedIn = true,
    onLogout,
}) {
    const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];

    // Дні місяця (Жовтень 2026: починається з четверга - 3 пусті клітинки)
    const emptyDays = [1, 2, 3];
    const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
    const highlightedDay = 22; // Сьогднішній активний день

    return (
        <div className={styles.pageLayout}>
            <Sidebar
                currentPage={currentPage}
                onNavigate={onNavigate}
                isLoggedIn={isLoggedIn}
                onLogout={onLogout}
            />

            <main className={styles.contentWrapper}>
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
