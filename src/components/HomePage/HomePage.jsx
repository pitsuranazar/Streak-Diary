import { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import styles from './HomePage.module.css';

export default function HomePage({
    currentPage = 'home',
    onNavigate,
    isLoggedIn = true,
    onLogout,
    user,
}) {
    // Список звичок користувача
    const [habits, setHabits] = useState([
        { id: 1, title: 'Лабораторні роботи з вебу (2 години)', streak: 12, completed: true },
        { id: 2, title: 'Читання професійної літератури (30 сторінок)', streak: 8, completed: true },
        { id: 3, title: 'Ранкова зарядка або біг 5 км', streak: 5, completed: false },
        { id: 4, title: 'Випити 2 літри води протягом дня', streak: 19, completed: true },
    ]);

    const [diaryNote, setDiaryNote] = useState('');
    const [notePosted, setNotePosted] = useState(false);

    // Дні календаря (Жовтень)
    const calendarDays = [
        { day: 1, active: true },
        { day: 2, active: true },
        { day: 3, active: true },
        { day: 4, active: false },
        { day: 5, active: true },
        { day: 6, active: true },
        { day: 7, active: true },
        { day: 8, active: true },
        { day: 9, active: true },
        { day: 10, active: true },
        { day: 11, active: false },
        { day: 12, active: true },
        { day: 13, active: true },
        { day: 14, active: true },
        { day: 15, active: true },
        { day: 16, active: true },
        { day: 17, active: true },
        { day: 18, active: true },
        { day: 19, active: true },
        { day: 20, active: true },
        { day: 21, active: true },
        { day: 22, active: true, today: true },
        { day: 23, active: false },
        { day: 24, active: false },
        { day: 25, active: false },
        { day: 26, active: false },
        { day: 27, active: false },
        { day: 28, active: false },
        { day: 29, active: false },
        { day: 30, active: false },
        { day: 31, active: false },
    ];

    const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];

    const toggleHabit = (id) => {
        setHabits((prev) =>
            prev.map((h) =>
                h.id === id ? { ...h, completed: !h.completed } : h
            )
        );
    };

    const handlePostNote = (e) => {
        e.preventDefault();
        if (!diaryNote.trim()) return;
        setNotePosted(true);
        setTimeout(() => {
            setDiaryNote('');
            setNotePosted(false);
        }, 2000);
    };

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
                    <div className={styles.headingBlock}>
                        <h1 className={styles.pageTitle}>
                            <span>Мій Щоденник Звичок</span>
                        </h1>
                        <p className={styles.pageSubtitle}>
                            Вітаємо, {user?.name || 'Назаре'}! Продовжуйте рух до цілей.
                        </p>
                    </div>

                    <div className={styles.streakStatusBadge}>
                        <span className={styles.fireAnim}>🔥</span>
                        <div>
                            <div className={styles.streakCount}>
                                {user?.streak || 7} днів серії
                            </div>
                            <div className={styles.streakDesc}>Ваш особистий рекорд: 14</div>
                        </div>
                    </div>
                </header>

                <main className={styles.mainContent}>
                    {/* Ліва частина: Календар і список звичок */}
                    <div className={styles.leftColumn}>
                        {/* Картка календаря */}
                        <div className={styles.card}>
                            <div className={styles.cardHeader}>
                                <h2 className={styles.cardTitle}>
                                    <span>📅</span> Календар активності
                                </h2>
                                <div className={styles.monthNav}>
                                    <span className={styles.monthTitle}>Жовтень 2026</span>
                                </div>
                            </div>

                            <div className={styles.calendarGrid}>
                                {weekDays.map((wd) => (
                                    <div key={wd} className={styles.weekDayName}>
                                        {wd}
                                    </div>
                                ))}

                                {calendarDays.map((item) => (
                                    <div
                                        key={item.day}
                                        className={`${styles.calendarCell} ${
                                            item.active ? styles.cellActive : ''
                                        } ${item.today ? styles.cellToday : ''}`}
                                    >
                                        <span>{item.day}</span>
                                        {item.active && (
                                            <span className={styles.cellFlame}>🔥</span>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className={styles.calendarLegend}>
                                <div className={styles.legendItem}>
                                    <div className={styles.legendDotActive}></div>
                                    <span>День із виконаною звичкою</span>
                                </div>
                                <div className={styles.legendItem}>
                                    <div className={styles.legendDotToday}></div>
                                    <span>Сьогодні</span>
                                </div>
                            </div>
                        </div>

                        {/* Картка звичок на сьогодні */}
                        <div className={styles.card}>
                            <div className={styles.cardHeader}>
                                <h2 className={styles.cardTitle}>
                                    <span>✅</span> Щоденні звички на сьогодні
                                </h2>
                            </div>

                            <div className={styles.habitsList}>
                                {habits.map((habit) => (
                                    <div key={habit.id} className={styles.habitItem}>
                                        <div className={styles.habitLeft}>
                                            <button
                                                type="button"
                                                className={`${styles.checkbox} ${
                                                    habit.completed ? styles.checkboxChecked : ''
                                                }`}
                                                onClick={() => toggleHabit(habit.id)}
                                            >
                                                {habit.completed ? '✓' : ''}
                                            </button>
                                            <span
                                                className={`${styles.habitTitle} ${
                                                    habit.completed ? styles.habitTitleDone : ''
                                                }`}
                                            >
                                                {habit.title}
                                            </span>
                                        </div>

                                        <div className={styles.habitStreakBadge}>
                                            <span>🔥</span>
                                            <span>{habit.streak} дн.</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                type="button"
                                className={styles.addHabitBtn}
                                onClick={() => alert('Форма додавання нової звички з’явиться згодом!')}
                            >
                                <span>+</span> Додати нову звичку
                            </button>
                        </div>
                    </div>

                    {/* Права частина: Швидка відмітка дня та мотивація */}
                    <div className={styles.rightColumn}>
                        <div className={styles.card}>
                            <div className={styles.cardHeader}>
                                <h2 className={styles.cardTitle}>
                                    <span>✍️</span> Запис у щоденник
                                </h2>
                            </div>

                            <form onSubmit={handlePostNote} className={styles.quickEntryCard}>
                                <textarea
                                    className={styles.entryTextarea}
                                    placeholder="Що корисного або цікавого відбулося за сьогодні? Опишіть свої враження..."
                                    value={diaryNote}
                                    onChange={(e) => setDiaryNote(e.target.value)}
                                />
                                <button type="submit" className={styles.postEntryBtn}>
                                    {notePosted ? '✓ Опубліковано!' : 'Поділитись у стрічці'}
                                </button>
                            </form>
                        </div>

                        <div className={styles.quoteCard}>
                            <p className={styles.quoteText}>
                                «Успіх — це сума маленьких зусиль, що повторюються день у день.»
                            </p>
                            <span className={styles.quoteAuthor}>— Роберт Коллієр</span>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
