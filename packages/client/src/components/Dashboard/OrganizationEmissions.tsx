import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { timeResolution } from './TimeResolutionFilter';
import { AllYearsEmissionsChart } from '../Charts/AllYearsEmissionsChart';
import { MonthEmissionsByYearChart } from '../Charts/MonthEmissionsByYearChart';
import useGetOrganizationEmissions from '../../hooks/useGetOrganizationEmissions';

interface OrganizationEmissionsProps {
  selectedTimeResolution: string;
  selectedOrganization: string;
  setIsDataLoading: Dispatch<SetStateAction<boolean>>;
}

export const OrganizationEmissions: React.FC<OrganizationEmissionsProps> = ({
  selectedTimeResolution,
  selectedOrganization,
  setIsDataLoading,
}) => {
  const { emissions, areEmissionsLoading } =
    useGetOrganizationEmissions(selectedOrganization);

  useEffect(() => {
    // Notify query being in process
    setIsDataLoading(areEmissionsLoading);
  }, [areEmissionsLoading, setIsDataLoading]);

  if (areEmissionsLoading || !selectedOrganization) {
    return <></>;
  }

  return (
    <div className="w-5/6">
      {selectedTimeResolution === timeResolution.year && (
        <AllYearsEmissionsChart
          selectedOrganization={selectedOrganization}
          emissions={emissions}
        />
      )}
      {selectedTimeResolution === timeResolution.month && (
        <MonthEmissionsByYearChart
          selectedOrganization={selectedOrganization}
          emissions={emissions}
        />
      )}
    </div>
  );
};
