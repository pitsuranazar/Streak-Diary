import { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import styles from './FriendsPage.module.css';

export default function FriendsPage({
    currentPage = 'friends',
    onNavigate,
    isLoggedIn = true,
    onLogout,
    user,
}) {
    const [searchQuery, setSearchQuery] = useState('');

    const friends = [
        { id: 1, name: 'Ліза Фомич', initials: 'ЛФ', currentHabit: '10 000 кроків щодня', streak: 15 },
        { id: 2, name: 'Віктор Добош', initials: 'ВД', currentHabit: 'Pet-проєкт & рефакторинг', streak: 42 },
        { id: 3, name: 'Олена Сидоренко', initials: 'ОС', currentHabit: 'Читання фахової літератури', streak: 9 },
        { id: 4, name: 'Максим Коваль', initials: 'МК', currentHabit: 'Вивчення англійської C1', streak: 21 },
    ];

    const leaderboard = [
        { rank: 1, name: 'Віктор Добош', streak: 42 },
        { rank: 2, name: 'Назар Піцура (Ви)', streak: 28 },
        { rank: 3, name: 'Максим Коваль', streak: 21 },
        { rank: 4, name: 'Ліза Фомич', streak: 15 },
        { rank: 5, name: 'Олена Сидоренко', streak: 9 },
    ];

    const filteredFriends = friends.filter((f) =>
        f.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                        <span>👥</span> Друзі та Рейтинг
                    </h1>
                </header>

                <main className={styles.mainContent}>
                    {/* Список друзів */}
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h2 className={styles.cardTitle}>
                                <span>🤝</span> Мої друзі ({filteredFriends.length})
                            </h2>
                        </div>

                        <div className={styles.searchBar}>
                            <input
                                type="text"
                                className={styles.searchInput}
                                placeholder="Пошук друга за ім’ям..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className={styles.friendsList}>
                            {filteredFriends.map((friend) => (
                                <div key={friend.id} className={styles.friendItem}>
                                    <div className={styles.friendLeft}>
                                        <div className={styles.avatar}>{friend.initials}</div>
                                        <div className={styles.friendMeta}>
                                            <span className={styles.friendName}>{friend.name}</span>
                                            <span className={styles.friendHabit}>
                                                🎯 {friend.currentHabit}
                                            </span>
                                        </div>
                                    </div>

                                    <div className={styles.streakBadge}>
                                        <span>🔥</span>
                                        <span>{friend.streak} дн.</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Лідерборд */}
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h2 className={styles.cardTitle}>
                                <span>🏆</span> Топ за серіями
                            </h2>
                        </div>

                        <div className={styles.leaderboardList}>
                            {leaderboard.map((item) => {
                                const rankClass =
                                    item.rank === 1
                                        ? styles.rankTop1
                                        : item.rank === 2
                                          ? styles.rankTop2
                                          : item.rank === 3
                                            ? styles.rankTop3
                                            : '';

                                return (
                                    <div key={item.rank} className={styles.leaderboardRow}>
                                        <div className={styles.leaderLeft}>
                                            <span className={`${styles.rankBadge} ${rankClass}`}>
                                                {item.rank}
                                            </span>
                                            <span className={styles.leaderName}>{item.name}</span>
                                        </div>
                                        <span className={styles.leaderStreak}>
                                            🔥 {item.streak}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
