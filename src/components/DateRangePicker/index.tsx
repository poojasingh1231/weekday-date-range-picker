import React, { useState } from "react";
import Calendar from "../Calender";
import PredefinedRanges from "../PreDefinedRanges";
import { formatDate } from "../../utils/DateUtils";
import "./styles.css";

const DateRangePicker: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState<{
    start?: Date;
    end?: Date;
  }>({});
  const [leftYear, setLeftYear] = useState(new Date().getFullYear());
  const [rightYear, setRightYear] = useState(new Date().getFullYear());
  const [leftMonth, setLeftMonth] = useState(new Date().getMonth());
  const [rightMonth, setRightMonth] = useState(new Date().getMonth() + 1);

  const handleSelectDate = (date: Date) => {
    if (!selectedDates.start || (selectedDates.start && selectedDates.end)) {
      setSelectedDates({ start: date });
    } else {
      if (date > selectedDates.start) {
        setSelectedDates({ ...selectedDates, end: date });
      } else {
        setSelectedDates({ start: date });
      }
    }
  };

  const closeCalendar = () => {
    setIsOpen(false);
  };

  const handleApply = () => {
    if (selectedDates.start && selectedDates.end) {
      setIsOpen(false);
    }
  };

  const handlePredefinedRange = ({
    start,
    end,
  }: {
    start: Date;
    end: Date;
  }) => {
    setSelectedDates({ start, end });
  };

  const handleLeftCalendarMonthChange = (y: number, m: number) => {
    setLeftMonth(m);
    setLeftYear(y);

    if (y > rightYear || (y === rightYear && m >= rightMonth)) {
      setRightMonth((m + 1) % 12);
      setRightYear(m === 11 ? y + 1 : y);
    }
  };

  const handleRightCalendarMonthChange = (y: number, m: number) => {
    setRightMonth(m);
    setRightYear(y);

    if (y < leftYear || (y === leftYear && m <= leftMonth)) {
      setLeftMonth((m - 1 + 12) % 12);
      setLeftYear(m === 0 ? y - 1 : y);
    }
  };

  return (
    <div className="date-range-picker-wrapper">
      <div className="date-range-picker">
        <input
          type="text"
          readOnly
          value={
            selectedDates.start && selectedDates.end
              ? `${formatDate(selectedDates.start)} - ${formatDate(
                  selectedDates.end
                )}`
              : ""
          }
          onClick={() => setIsOpen(!isOpen)}
          placeholder="MM/dd/yyyy ~ MM/dd/yyyy"
        />

        <span className="calendar-icon" onClick={() => setIsOpen(!isOpen)}>
          📅
        </span>
        {isOpen && (
          <div className="dropdown">
            <div className="calendars-wrapper">
              <Calendar
                year={leftYear}
                month={leftMonth}
                onMonthYearChange={handleLeftCalendarMonthChange}
                onSelectDate={handleSelectDate}
                selectedDates={selectedDates}
              />
              <div className="divider"></div>
              <Calendar
                year={rightYear}
                month={rightMonth}
                onMonthYearChange={handleRightCalendarMonthChange}
                onSelectDate={handleSelectDate}
                selectedDates={selectedDates}
              />
            </div>
            <PredefinedRanges
              onSelectRange={handlePredefinedRange}
              closeCalendar={closeCalendar}
            />
            <div className="actions">
              <button onClick={handleApply}>OK</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DateRangePicker;
