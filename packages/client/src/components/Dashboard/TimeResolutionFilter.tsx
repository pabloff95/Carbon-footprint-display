import React from 'react';

interface TimeResolutionFilterProps {
  selectResolution: (resolution: string) => void;
}
interface TimeResolution {
  year: string;
  month: string;
}

export const timeResolution: TimeResolution = {
  year: 'year',
  month: 'month',
};

export const TimeResolutionFilter: React.FC<TimeResolutionFilterProps> = ({
  selectResolution,
}) => {
  return (
    <div>
      <button
        type="button"
        onClick={() => selectResolution(timeResolution.year)}
      >
        Year
      </button>
      <button
        type="button"
        onClick={() => selectResolution(timeResolution.month)}
      >
        Month
      </button>
    </div>
  );
};
