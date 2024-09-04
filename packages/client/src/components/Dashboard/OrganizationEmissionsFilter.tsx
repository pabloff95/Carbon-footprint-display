import React, { Dispatch, SetStateAction } from 'react';
import useGetOrganizations, {
  UseOrganizationsResult,
} from '../../hooks/useGetOrganizations';

interface OrganizationEmissionsChartProps {
  setSelectedOrganization: Dispatch<SetStateAction<string>>;
}

export const OrganizationEmissionsFilter: React.FC<
  OrganizationEmissionsChartProps
> = ({ setSelectedOrganization }) => {
  const { organizations, areOrganizationsLoading }: UseOrganizationsResult =
    useGetOrganizations();

  const handleOrganizationChange: (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => void = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOrganization = event?.target?.value;

    if (selectedOrganization) {
      setSelectedOrganization(selectedOrganization);
    }
  };

  if (areOrganizationsLoading) {
    return <p>Loading...</p>;
  }

  if (!organizations || organizations.length === 0) {
    return <p>No organizations were found!</p>;
  }

  return (
    <select
      name="company"
      defaultValue={'DEFAULT'}
      onChange={handleOrganizationChange}
    >
      <option value="DEFAULT" disabled>
        Select an organization...
      </option>
      {organizations.map((organization, index) => (
        <option key={`${index}-organization-option`} value={organization}>
          {organization}
        </option>
      ))}
    </select>
  );
};
