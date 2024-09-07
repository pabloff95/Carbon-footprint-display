import React, { Dispatch, SetStateAction, useEffect } from 'react';
import useGetOrganizationEmissions from '../../hooks/useGetOrganizationEmissions';
import { EmissionsData } from '../../../../lib/src/index';
import Chart, { ChartSeries } from '../Base/Chart';
import { timeResolution } from './TimeResolutionFilter';
import { MonthEmissionsChart } from './MonthEmissionsChart';
import { LoadingSpinner } from '../Base/LoadingSpinner';
import { Alert } from 'antd';

interface OrganizationEmissionsChartProps {
  selectedOrganization: string;
  selectedTimeResolution: string;
  setIsDataLoading: Dispatch<SetStateAction<boolean>>;
}

export const OrganizationEmissionsChart: React.FC<
  OrganizationEmissionsChartProps
> = ({ selectedOrganization, selectedTimeResolution, setIsDataLoading }) => {
  const { emissions, areEmissionsLoading } =
    useGetOrganizationEmissions(selectedOrganization);

  useEffect(() => {
    // Notify Dashboard component of query being in process
    setIsDataLoading(areEmissionsLoading);
  }, [areEmissionsLoading, setIsDataLoading]);

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
    return (
      <Alert
        message="Please select an organization with emission records!"
        type="info"
      />
    );
  }

  if (selectedTimeResolution === timeResolution.year) {
    return (
      <div className="w-5/6">
        <Chart
          series={getYearSeries(emissions)}
          title={`${selectedOrganization} yearly emissions`}
          xAxisTitle="Year"
          yAxisTitle="Emissions"
          yUnits="tCO₂e"
          dataLabelDecimals={1}
          hideLegend
        />
      </div>
    );
  }

  if (selectedTimeResolution === timeResolution.month) {
    return (
      <div className="w-5/6">
        <MonthEmissionsChart
          allTimeEmissions={emissions}
          organizationName={selectedOrganization}
        />
      </div>
    );
  }

  return (
    <Alert message="Please select a valid time resolution!" type="warning" />
  );
};
