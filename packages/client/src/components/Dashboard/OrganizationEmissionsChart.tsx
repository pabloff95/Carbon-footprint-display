import React from 'react';
import useGetOrganizationEmissions from '../../hooks/useGetOrganizationEmissions';
import { EmissionsData } from '../../../../lib/src/index';
import ChartBase, { ChartSeries } from './ChartBase';
import { timeResolution } from './TimeResolutionFilter';

interface OrganizationEmissionsChartProps {
  selectedOrganization: string;
  selectedTimeResolution: string;
}

export const OrganizationEmissionsChart: React.FC<
  OrganizationEmissionsChartProps
> = ({ selectedOrganization, selectedTimeResolution }) => {
  const { emissions, areEmissionsLoading } =
    useGetOrganizationEmissions(selectedOrganization);

  const getYearSeries: (
    emissions: EmissionsData[]
  ) => ChartSeries = emissionsData => {
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

  const yearSeries = getYearSeries(emissions);

  return (
    <>
      {selectedTimeResolution === timeResolution.year && (
        <ChartBase
          series={yearSeries}
          title={`${selectedOrganization} yearly emissions`}
          xAxisTitle="Year"
          yAxisTitle="Emissions"
          yUnits="tCO₂e"
          hideLegend
        />
      )}
    </>
  );
};
