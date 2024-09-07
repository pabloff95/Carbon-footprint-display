import React, { useState } from 'react';
import { EmissionsData, baseYear } from '../../../../lib/src/index';
import Chart, { ChartSeries } from '../Base/Chart';
import { months } from '../../../../client/src/utils/index';
import { Alert, Button } from 'antd';

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
    if (selectedYear !== baseYear) {
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
      <section className="flex gap-2">
        <Button
          type="default"
          className=""
          onClick={reduceYear}
          size="small"
          disabled={selectedYear === baseYear}
        >
          <b>-</b>
        </Button>
        {selectedYear}
        <Button
          type="default"
          onClick={increaseYear}
          size="small"
          disabled={selectedYear === maxYear}
        >
          <b>+</b>
        </Button>
      </section>
      <section>
        {monthSeries.categories.length > 0 && (
          <Chart
            series={monthSeries}
            title={`${organizationName} monthly emissions in ${selectedYear}`}
            xAxisTitle="Month"
            yAxisTitle="Emissions"
            yUnits="tCO₂e"
            dataLabelDecimals={2}
            hideLegend
          />
        )}
        {monthSeries.categories.length === 0 && (
          <Alert
            message="No data was found for the selected year!"
            type="info"
          />
        )}
      </section>
    </>
  );
};
