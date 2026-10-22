import { useState } from 'react';
import styles from './Calendar.module.css';

export default function Calendar() {
    // Стан перегляду місяця (початково - поточна системна дата)
    const [viewDate, setViewDate] = useState(() => new Date());

    const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];

    const currentYear = viewDate.getFullYear();
    const currentMonth = viewDate.getMonth();

    // Динамічний розрахунок кількості днів у місяці (день 0 наступного місяця)
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Зсув для початку з понеділка:
    // У JS: 0 - неділя, 1 - понеділок, ..., 6 - субота
    // За формулою (DayOfWeek + 6) % 7: понеділок стає 0, неділя - 6
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
    const emptyDaysCount = (firstDayIndex + 6) % 7;

    // Реальна системна дата на пристрої
    const today = new Date();

    // Перевірка, чи збігається день із СЬОГОДНІШНІМ (число + місяць + рік)
    const isToday = (day) => {
        return (
            day === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear()
        );
    };

    // Перемикання на попередній місяць
    const handlePrevMonth = () => {
        setViewDate(new Date(currentYear, currentMonth - 1, 1));
    };

    // Перемикання на наступний місяць
    const handleNextMonth = () => {
        setViewDate(new Date(currentYear, currentMonth + 1, 1));
    };

    // Динамічна локалізована назва місяця та року
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

                {/* Динамічні порожні дні для вирівнювання першого числа місяця */}
                {Array.from({ length: emptyDaysCount }).map((_, idx) => (
                    <div key={`empty-${idx}`} className={styles.emptyCell} />
                ))}

                {/* Дні поточного місяця */}
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
                                <span className={styles.flameTag}>🔥</span>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
