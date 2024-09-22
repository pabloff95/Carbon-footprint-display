import React from 'react';
import { Button } from 'antd';
import { baseYear } from '@carbonfootprintdisplay/lib/src';

interface YearSelectorProps {
  selectedYear: number;
  maxYear: number;
  handleYearChange: (year: number) => void;
}

export const YearSelector: React.FC<YearSelectorProps> = ({
  selectedYear,
  maxYear,
  handleYearChange,
}) => {
  const reduceYear = (): void => {
    if (selectedYear > baseYear) {
      handleYearChange(selectedYear - 1);
    }
  };

  const increaseYear = (): void => {
    if (selectedYear < maxYear) {
      handleYearChange(selectedYear + 1);
    }
  };

  return (
    <section className="w-full flex gap-2 justify-center mb-2">
      <Button
        type="default"
        className="bg-white"
        onClick={reduceYear}
        size="small"
        disabled={selectedYear === baseYear}
      >
        <b>-</b>
      </Button>
      {selectedYear}
      <Button
        type="default"
        className="bg-white"
        onClick={increaseYear}
        size="small"
        disabled={selectedYear === maxYear}
      >
        <b>+</b>
      </Button>
    </section>
  );
};
