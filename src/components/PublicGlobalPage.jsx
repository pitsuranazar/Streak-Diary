import Sidebar from './Sidebar/Sidebar';
import styles from './PublicGlobalPage.module.css';

export default function PublicGlobalPage({
    isLoggedIn = false,
    currentPage = 'global',
    onNavigate,
    onOpenLogin,
    onOpenRegister,
    onLogout,
}) {
    const posts = [
        { id: 1, initial: 'U1', colorClass: styles.avatarPurple, title: 'User 1', desc: 'Виконано щоденну ціль', time: '10:00' },
        { id: 2, initial: 'U2', colorClass: styles.avatarGreen, title: 'User 2', desc: 'Новий запис у календарі', time: '11:30' },
        { id: 3, initial: 'U3', colorClass: styles.avatarOrange, title: 'User 3', desc: 'Серія звичок продовжена', time: '14:15' },
        { id: 4, initial: 'U4', colorClass: styles.avatarPink, title: 'User 4', desc: 'Відмітка активності за сьогодні', time: '18:45' },
    ];

    return (
        <div className={styles.pageLayout}>
            <Sidebar
                currentPage={currentPage}
                onNavigate={onNavigate}
                isLoggedIn={isLoggedIn}
                onOpenLogin={onOpenLogin}
                onOpenRegister={onOpenRegister}
                onLogout={onLogout}
            />

            <main className={styles.contentWrapper}>
                <div className={styles.feedCard}>
                    <div className={styles.feedHeader}>
                        <h2 className={styles.feedTitle}>Глобальна стрічка</h2>
                        <span className={styles.feedSubtitle}>Останні події</span>
                    </div>

                    <div className={styles.postList}>
                        {posts.map((post) => (
                            <div key={post.id} className={styles.postItem}>
                                <div className={styles.postLeft}>
                                    <div className={`${styles.avatar} ${post.colorClass}`}>
                                        {post.initial}
                                    </div>
                                    <div className={styles.postInfo}>
                                        <span className={styles.userName}>{post.title}</span>
                                        <span className={styles.postText}>{post.desc}</span>
                                    </div>
                                </div>
                                <span className={styles.postMeta}>{post.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}