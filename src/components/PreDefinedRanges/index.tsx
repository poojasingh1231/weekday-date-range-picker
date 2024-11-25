import React from "react";

interface PredefinedRangesProps {
  onSelectRange: (range: { start: Date; end: Date }) => void;
  closeCalendar: () => void;
}

const PredefinedRanges: React.FC<PredefinedRangesProps> = ({
  onSelectRange,
  closeCalendar,
}) => {
  const ranges = [
    { label: "Last 7 Days", days: 7 },
    { label: "Last 30 Days", days: 30 },
  ];

  const handleRangeClick = (days: number) => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days + 1);
    onSelectRange({ start, end });
    closeCalendar();
  };

  return (
    <div className="predefined-ranges">
      {ranges.map((range) => (
        <button key={range.label} onClick={() => handleRangeClick(range.days)}>
          {range.label}
        </button>
      ))}
    </div>
  );
};

export default PredefinedRanges;
