import Sidebar from '../Sidebar/Sidebar';
import Calendar from '../Calendar/Calendar';
import styles from './HomePage.module.css';

export default function HomePage({
    isLoggedIn = true,
    onLogout,
}) {
    return (
        <div className={styles.pageLayout}>
            <Sidebar
                isLoggedIn={isLoggedIn}
                onLogout={onLogout}
            />

            <main className={styles.contentWrapper}>
                <Calendar />
            </main>
        </div>
    );
}
