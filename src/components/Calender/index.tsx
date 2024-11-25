import React from "react";
import "./styles.css";
import { isSameDay, isWeekend } from "../../utils/DateUtils";

interface CalendarProps {
  year: number;
  month: number;
  onSelectDate: (date: Date) => void;
  selectedDates: { start?: Date; end?: Date };
  onMonthYearChange: (year: number, month: number) => void;
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Calendar: React.FC<CalendarProps> = ({
  year,
  month,
  onSelectDate,
  selectedDates,
  onMonthYearChange,
}) => {
  const getDaysInMonth = (): Date[] => {
    const dates: Date[] = [];
    const firstDay = new Date(year, month, 1);
    let currentDate = firstDay;
    while (currentDate.getMonth() === month) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(e.target.value, 10);
    onMonthYearChange(newYear, month);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = parseInt(e.target.value, 10);
    onMonthYearChange(year, newMonth);
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <select value={year} onChange={handleYearChange}>
          {Array.from({ length: 10 }, (_, i) => {
            const displayYear = new Date().getFullYear() - 5 + i;
            return (
              <option key={displayYear} value={displayYear}>
                {displayYear}
              </option>
            );
          })}
        </select>

        <select value={month} onChange={handleMonthChange}>
          {monthNames.map((name, index) => (
            <option key={index} value={index}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div className="calendar-grid">
        {getDaysInMonth().map((date) => {
          const isStartSelected =
            selectedDates.start && isSameDay(date, selectedDates.start);
          const isEndSelected =
            selectedDates.end && isSameDay(date, selectedDates.end);
          const isInRange =
            selectedDates.start &&
            selectedDates.end &&
            date >= selectedDates.start &&
            date <= selectedDates.end &&
            !isWeekend(date);

          return (
            <button
              key={date.toISOString()}
              disabled={isWeekend(date)}
              className={`calendar-day ${
                isStartSelected || isEndSelected
                  ? "highlighted"
                  : isInRange
                  ? "in-range"
                  : ""
              }`}
              onClick={() => !isWeekend(date) && onSelectDate(date)}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
