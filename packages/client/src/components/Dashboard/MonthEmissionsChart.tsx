import React, { useState } from 'react';
import { EmissionsData } from '../../../../lib/src/index';
import ChartBase, { ChartSeries } from './ChartBase';
import { months } from '../../../../client/src/utils/index';

interface MonthEmissionsChartProps {
  allTimeEmissions: EmissionsData[];
  organizationName: string;
}

export const MonthEmissionsChart: React.FC<MonthEmissionsChartProps> = ({
  allTimeEmissions,
  organizationName,
}) => {
  const maxYear: number = Math.max(...allTimeEmissions.map(({ year }) => year));
  const [selectedYear, setSelectedYear] = useState(maxYear);

  const reduceYear = (): void => {
    if (selectedYear !== 2000) {
      setSelectedYear(selectedYear - 1);
    }
  };

  const increaseYear = (): void => {
    if (selectedYear !== maxYear) {
      setSelectedYear(selectedYear + 1);
    }
  };

  const getYearMonthlySeries = (): ChartSeries => {
    const targetYearData = allTimeEmissions.find(
      ({ year }) => year === selectedYear
    );

    if (!targetYearData) {
      return {
        categories: [],
        ySeries: [],
      };
    }

    return {
      categories: targetYearData.monthsData.map(
        ({ month }) => months[month - 1] // -1 because January starts with 1, not 0
      ),
      ySeries: targetYearData.monthsData.map(({ emissions }) => emissions),
    };
  };

  return (
    <>
      <section>
        <button type="button" onClick={reduceYear}>
          -
        </button>
        {selectedYear}
        <button type="button" onClick={increaseYear}>
          +
        </button>
      </section>
      <section>
        <ChartBase
          series={getYearMonthlySeries()}
          title={`${organizationName} yearly emissions`}
          xAxisTitle="Month"
          yAxisTitle="Emissions"
          yUnits="tCO₂e"
          hideLegend
        />
      </section>
    </>
  );
};
