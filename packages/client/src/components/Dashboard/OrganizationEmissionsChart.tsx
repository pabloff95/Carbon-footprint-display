import React from 'react';
import useGetOrganizationEmissions from '../../hooks/useGetOrganizationEmissions';

interface OrganizationEmissionsChartProps {
  selectedOrganization: string;
}

export const OrganizationEmissionsChart: React.FC<
  OrganizationEmissionsChartProps
> = ({ selectedOrganization }) => {
  const { emissions } = useGetOrganizationEmissions(selectedOrganization);

  console.log({ emissions });

  // TODO: complete component implementation
  return <div>{selectedOrganization}</div>;
};
