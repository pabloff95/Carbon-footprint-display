import React from 'react';
import useGetOrganizationEmissions from '../../hooks/useGetOrganizationEmissions';
import { EmissionsData } from '../../../../lib/src/index';
import ChartBase, { ChartSeries } from './ChartBase';
import { timeResolution } from './TimeResolutionFilter';
import { MonthEmissionsChart } from './MonthEmissionsChart';

interface OrganizationEmissionsChartProps {
  selectedOrganization: string;
  selectedTimeResolution: string;
}

export const OrganizationEmissionsChart: React.FC<
  OrganizationEmissionsChartProps
> = ({ selectedOrganization, selectedTimeResolution }) => {
  const { emissions, areEmissionsLoading } =
    useGetOrganizationEmissions(selectedOrganization);

  const getYearSeries = (emissionsData: EmissionsData[]): ChartSeries => {
    const emissionsPerYear = emissionsData.map(({ year, monthsData }) => ({
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

  if (areEmissionsLoading) {
    return <p>The emissions data is loading...</p>;
  }

  if (emissions.length === 0) {
    return <p>Please select an organization with emission records!</p>;
  }

  if (selectedTimeResolution === timeResolution.year) {
    return (
      <ChartBase
        series={getYearSeries(emissions)}
        title={`${selectedOrganization} yearly emissions`}
        xAxisTitle="Year"
        yAxisTitle="Emissions"
        yUnits="tCO₂e"
        dataLabelDecimals={1}
        hideLegend
      />
    );
  }

  if (selectedTimeResolution === timeResolution.month) {
    return (
      <MonthEmissionsChart
        allTimeEmissions={emissions}
        organizationName={selectedOrganization}
      />
    );
  }

  return <p>Please select a valid time resolution!</p>;
};
