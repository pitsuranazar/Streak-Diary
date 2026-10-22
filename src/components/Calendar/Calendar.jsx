import { useState } from 'react';
import styles from './Calendar.module.css';

export default function Calendar() {
    const [viewDate, setViewDate] = useState(() => new Date());

    const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];

    const currentYear = viewDate.getFullYear();
    const currentMonth = viewDate.getMonth();

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
    const emptyDaysCount = (firstDayIndex + 6) % 7;

    const today = new Date();

    const isToday = (day) => {
        return (
            day === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear()
        );
    };

    const handlePrevMonth = () => {
        setViewDate(new Date(currentYear, currentMonth - 1, 1));
    };

    const handleNextMonth = () => {
        setViewDate(new Date(currentYear, currentMonth + 1, 1));
    };

    const monthTitle = viewDate.toLocaleDateString('uk-UA', {
        month: 'long',
        year: 'numeric',
    });

    return (
        <div className={styles.calendarCard}>
            <div className={styles.calendarHeader}>
                <button
                    type="button"
                    className={styles.navBtn}
                    onClick={handlePrevMonth}
                >
                    ‹ Попередній
                </button>
                <span className={styles.monthTitle}>{monthTitle}</span>
                <button
                    type="button"
                    className={styles.navBtn}
                    onClick={handleNextMonth}
                >
                    Наступний ›
                </button>
            </div>

            <div className={styles.grid}>
                {weekDays.map((day) => (
                    <div key={day} className={styles.weekDay}>
                        {day}
                    </div>
                ))}

                {Array.from({ length: emptyDaysCount }).map((_, idx) => (
                    <div key={`empty-${idx}`} className={styles.emptyCell} />
                ))}

                {Array.from({ length: daysInMonth }, (_, idx) => idx + 1).map((day) => {
                    const highlighted = isToday(day);

                    return (
                        <div
                            key={day}
                            className={`${styles.dayCell} ${
                                highlighted ? styles.cellHighlighted : ''
                            }`}
                        >
                            <span>{day}</span>
                            {highlighted && (
                                <span className={styles.flameTag}></span>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
