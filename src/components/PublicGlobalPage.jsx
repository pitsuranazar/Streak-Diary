import { useState } from 'react';
import Sidebar from './Sidebar/Sidebar';
import styles from './PublicGlobalPage.module.css';

export default function PublicGlobalPage({
    isLoggedIn = false,
    currentPage = 'global',
    onNavigate,
    onOpenLogin,
    onOpenRegister,
    onLogout,
    user,
}) {
    const [activeFilter, setActiveFilter] = useState('all');
    const [likedPosts, setLikedPosts] = useState({});

    // Демо-дані для глобальної стрічки календарів і подій
    const publicPosts = [
        {
            id: 1,
            name: 'Назар Піцура',
            initials: 'НП',
            time: '20:45',
            streak: 28,
            content: 'Сьогодні продуктивний день: закінчив лабу з веб-технологій та пограв у Noita 🥷. 28-й день щоденного кодінгу без перерв!',
            daysHistory: [true, true, true, true, true, true, true],
            fireCount: 24,
            commentCount: 5,
        },
        {
            id: 2,
            name: 'Ліза Фомич',
            initials: 'ЛФ',
            time: '20:30',
            streak: 15,
            content: 'Гуляли вечірнім містом, погода просто чудова для осінніх фоток ✨. Виконала щоденну норму 10 000 кроків!',
            daysHistory: [true, true, false, true, true, true, true],
            fireCount: 19,
            commentCount: 3,
        },
        {
            id: 3,
            name: 'Віктор Добош',
            initials: 'ВД',
            time: '18:15',
            streak: 42,
            content: 'Зробив рефакторинг бази даних і додав нові фічі на проєкт 💻. Серія 42 дні неперервного розвитку!',
            daysHistory: [true, true, true, true, true, true, true],
            fireCount: 31,
            commentCount: 8,
        },
        {
            id: 4,
            name: 'Олена Сидоренко',
            initials: 'ОС',
            time: '15:10',
            streak: 9,
            content: 'Прочитала 40 сторінок "Clean Code". Нарешті розібралась із правильним розділенням компонентів 📚',
            daysHistory: [false, true, true, true, true, true, true],
            fireCount: 12,
            commentCount: 2,
        },
    ];

    const toggleLike = (postId) => {
        setLikedPosts((prev) => ({
            ...prev,
            [postId]: !prev[postId],
        }));
    };

    const daysLabels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];

    const filteredPosts = activeFilter === 'top'
        ? [...publicPosts].sort((a, b) => b.streak - a.streak)
        : publicPosts;

    return (
        <div className={styles.pageLayout}>
            {/* Ліва панель навігації (Sidebar) */}
            <Sidebar
                currentPage={currentPage}
                onNavigate={onNavigate}
                isLoggedIn={isLoggedIn}
                onOpenLogin={onOpenLogin}
                onOpenRegister={onOpenRegister}
                onLogout={onLogout}
                user={user}
            />

            {/* Основний вміст глобальної сторінки */}
            <div className={styles.contentWrapper}>
                <header className={styles.topBar}>
                    <div className={styles.pageHeading}>
                        <span>Глобальна стрічка</span>
                        <span className={styles.badge}>Спільнота</span>
                    </div>

                    {!isLoggedIn && (
                        <button
                            type="button"
                            className={styles.quickAuthBtn}
                            onClick={onOpenLogin}
                        >
                            Увійти
                        </button>
                    )}
                </header>

                <main className={styles.mainContent}>
                    {/* Банер для неавторизованого відвідувача */}
                    {!isLoggedIn && (
                        <div className={styles.welcomeBanner}>
                            <div className={styles.bannerText}>
                                <h2 className={styles.bannerTitle}>
                                    <span>🔥</span> Запаліть свою власну серію звичок!
                                </h2>
                                <p className={styles.bannerDesc}>
                                    У глобальній стрічці ви бачите досягнення інших студентів. Зареєструйтесь безкоштовно, щоб створити свій щоденник, вести серії-вогники та змагатися з друзями.
                                </p>
                            </div>
                            <button
                                type="button"
                                className={styles.bannerBtn}
                                onClick={onOpenRegister}
                            >
                                Створити щоденник
                            </button>
                        </div>
                    )}

                    {/* Фільтри та лічильник */}
                    <div className={styles.filtersBar}>
                        <div className={styles.filterTabs}>
                            <button
                                type="button"
                                className={`${styles.filterBtn} ${activeFilter === 'all' ? styles.filterBtnActive : ''}`}
                                onClick={() => setActiveFilter('all')}
                            >
                                Всі події
                            </button>
                            <button
                                type="button"
                                className={`${styles.filterBtn} ${activeFilter === 'top' ? styles.filterBtnActive : ''}`}
                                onClick={() => setActiveFilter('top')}
                            >
                                🔥 Топ серії
                            </button>
                        </div>
                        <span className={styles.feedCount}>
                            Оновлено щойно • {filteredPosts.length} історій
                        </span>
                    </div>

                    {/* Список карток */}
                    <div className={styles.feedList}>
                        {filteredPosts.map((post) => {
                            const isLiked = likedPosts[post.id];
                            const currentFires = post.fireCount + (isLiked ? 1 : 0);

                            return (
                                <article key={post.id} className={styles.postCard}>
                                    <div className={styles.postHeader}>
                                        <div className={styles.authorBlock}>
                                            <div className={styles.authorAvatar}>
                                                {post.initials}
                                            </div>
                                            <div className={styles.authorMeta}>
                                                <span className={styles.authorName}>
                                                    {post.name}
                                                </span>
                                                <span className={styles.postTime}>
                                                    сьогодні о {post.time}
                                                </span>
                                            </div>
                                        </div>

                                        <div className={styles.streakBadge}>
                                            <span>🔥</span>
                                            <span>{post.streak} днів поспіль</span>
                                        </div>
                                    </div>

                                    <p className={styles.postText}>{post.content}</p>

                                    {/* Міні-календар тижневої активності */}
                                    <div className={styles.streakCalendarMini}>
                                        <span className={styles.miniCalTitle}>
                                            Серія за тиждень:
                                        </span>
                                        <div className={styles.miniDaysList}>
                                            {post.daysHistory.map((completed, idx) => (
                                                <div
                                                    key={idx}
                                                    title={`${daysLabels[idx]}: ${completed ? 'Виконано' : 'Пропущено'}`}
                                                    className={`${styles.miniDay} ${
                                                        completed ? styles.miniDayCompleted : ''
                                                    }`}
                                                >
                                                    {completed ? '🔥' : daysLabels[idx]}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className={styles.postFooter}>
                                        <button
                                            type="button"
                                            className={`${styles.actionBtn} ${
                                                isLiked ? styles.actionBtnActive : ''
                                            }`}
                                            onClick={() => toggleLike(post.id)}
                                        >
                                            <span>{isLiked ? '🔥' : '⚡'}</span>
                                            <span>Підтримати ({currentFires})</span>
                                        </button>
                                        <button
                                            type="button"
                                            className={styles.actionBtn}
                                            onClick={() => alert('Коментарі будуть доступні в наступній версії!')}
                                        >
                                            <span>💬</span>
                                            <span>Коментарі ({post.commentCount})</span>
                                        </button>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </main>
            </div>
        </div>
    );
}