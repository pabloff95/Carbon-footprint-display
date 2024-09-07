import React from 'react';
import useGetOrganizationEmissions from '../../hooks/useGetOrganizationEmissions';
import { EmissionsData } from '../../../../lib/src/index';
import Chart, { ChartSeries } from '../Base/Chart';
import { timeResolution } from './TimeResolutionFilter';
import { MonthEmissionsChart } from './MonthEmissionsChart';
import { LoadingSpinner } from '../Base/LoadingSpinner';

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
    return <LoadingSpinner spinnerHeight="56" />;
  }

  if (emissions.length === 0) {
    return <p>Please select an organization with emission records!</p>;
  }

  if (selectedTimeResolution === timeResolution.year) {
    return (
      <Chart
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
