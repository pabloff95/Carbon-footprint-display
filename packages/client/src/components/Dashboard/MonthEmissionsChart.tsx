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

    const ySeries = Object.keys(months).map(monthAsNumber => {
      const monthData = targetYearData.monthsData.find(
        ({ month }) => month.toString() === monthAsNumber
      );

      return monthData?.emissions || 0;
    });

    return {
      categories: Object.values(months),
      ySeries,
    };
  };

  const monthSeries = getYearMonthlySeries();

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
        {monthSeries.categories.length > 0 && (
          <ChartBase
            series={monthSeries}
            title={`${organizationName} yearly emissions`}
            xAxisTitle="Month"
            yAxisTitle="Emissions"
            yUnits="tCO₂e"
            dataLabelDecimals={2}
            hideLegend
          />
        )}
        {monthSeries.categories.length === 0 && (
          <p>No data was found for the selected year</p>
        )}
      </section>
    </>
  );
};
