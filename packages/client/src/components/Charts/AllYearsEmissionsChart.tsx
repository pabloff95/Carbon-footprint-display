import React from 'react';
import { EmissionsData } from '@carbonfootprintdisplay/lib/src';
import { ChartBase, ChartSeries } from './ChartBase';
import { Alert } from 'antd';

interface AllYearsEmissionsChartProps {
  selectedOrganization: string;
  emissions: EmissionsData[];
}

export const AllYearsEmissionsChart: React.FC<AllYearsEmissionsChartProps> = ({
  selectedOrganization,
  emissions,
}) => {
  const getYearSeries = (): ChartSeries => {
    const emissionsPerYear = emissions.map(({ year, monthsData }) => ({
      year,
      totalEmissions: monthsData.reduce(
        (totalEmissions: number, month: { emissions: number }) =>
          totalEmissions + month.emissions,
        0
      ),
    }));

    return {
      categories: emissionsPerYear.map(({ year }) => year.toString()),
      ySeries: emissionsPerYear.map(({ totalEmissions }) => totalEmissions),
    };
  };

  if (emissions.length === 0) {
    return (
      <Alert
        className="mx-auto w-fit"
        message="Please select an organization with emission records!"
        type="info"
      />
    );
  }

  const yearSeries = getYearSeries();

  return (
    <ChartBase
      series={yearSeries}
      title={`${selectedOrganization} yearly emissions`}
      xAxisTitle="Year"
      yAxisTitle="Emissions"
      yUnits="tCO₂e"
      dataLabelDecimals={1}
      hideLegend
    />
  );
};
