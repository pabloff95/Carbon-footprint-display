import React, { useState } from 'react';
import { EmissionsData, baseYear } from '@carbonfootprintdisplay/lib/src';
import { ChartBase, ChartSeries } from './ChartBase';
import { months } from '@carbonfootprintdisplay/client/src/utils/index';
import { Alert, Button } from 'antd';

interface MonthEmissionsByYearChartProps {
  emissions: EmissionsData[];
  selectedOrganization: string;
}

export const MonthEmissionsByYearChart: React.FC<
  MonthEmissionsByYearChartProps
> = ({ emissions, selectedOrganization }) => {
  const maxYear: number = Math.max(...emissions.map(({ year }) => year));

  const [selectedYear, setSelectedYear] = useState(maxYear);

  const getYearMonthlySeries = (): ChartSeries => {
    const targetYearData = emissions.find(({ year }) => year === selectedYear);

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

  if (emissions.length === 0) {
    return (
      <Alert
        message="Please select an organization with emission records!"
        type="info"
      />
    );
  }

  const monthSeries = getYearMonthlySeries();

  return (
    <>
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
      <section>
        {monthSeries.categories.length > 0 && (
          <ChartBase
            series={monthSeries}
            title={`${selectedOrganization} monthly emissions in ${selectedYear}`}
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
