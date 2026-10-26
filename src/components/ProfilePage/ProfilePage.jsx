import Sidebar from '../Sidebar/Sidebar';
import Calendar from '../Calendar/Calendar';
import styles from './ProfilePage.module.css';

export default function ProfilePage({
    currentPage = 'profile',
    onNavigate,
    isLoggedIn = true,
    onLogout,
}) {
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

                <Calendar />
            </main>
        </div>
    );
}
