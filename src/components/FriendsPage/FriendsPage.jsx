import { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import styles from './FriendsPage.module.css';

export default function FriendsPage({
    isLoggedIn = true,
    onLogout,
}) {
    const [search, setSearch] = useState('');

    const friendsList = [
        { id: 1, initial: 'F1', colorClass: styles.avatarGreen, name: 'Friend 1', desc: 'Активний стрік' },
        { id: 2, initial: 'F2', colorClass: styles.avatarOrange, name: 'Friend 2', desc: 'Останній запис сьогодні' },
        { id: 3, initial: 'F3', colorClass: styles.avatarPink, name: 'Friend 3', desc: 'Стрік оновлено' },
    ];

    return (
        <div className={styles.pageLayout}>
            <Sidebar
                isLoggedIn={isLoggedIn}
                onLogout={onLogout}
            />

            <main className={styles.contentWrapper}>
                <div className={styles.searchBox}>
                    <input
                        type="text"
                        className={styles.searchInput}
                        placeholder="Пошук..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button type="button" className={styles.searchBtn}>
                        Пошук
                    </button>
                </div>

                <div className={styles.friendsCard}>
                    <h2 className={styles.cardTitle}>Підписки</h2>

                    <div className={styles.list}>
                        {friendsList.map((friend) => (
                            <div key={friend.id} className={styles.item}>
                                <div className={styles.itemLeft}>
                                    <div className={`${styles.avatar} ${friend.colorClass}`}>
                                        {friend.initial}
                                    </div>
                                    <div className={styles.itemInfo}>
                                        <span className={styles.name}>{friend.name}</span>
                                        <span className={styles.status}>{friend.desc}</span>
                                    </div>
                                </div>
                                <button type="button" className={styles.actionBtn}>
                                    Переглянути
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
