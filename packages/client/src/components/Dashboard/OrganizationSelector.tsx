import React, { Dispatch, SetStateAction } from 'react';
import useGetOrganizations, {
  UseOrganizationsResult,
} from '../../hooks/useGetOrganizations';
import { LoadingSpinner } from '../Base/LoadingSpinner';

interface OrganizationSelectorProps {
  setSelectedOrganization: Dispatch<SetStateAction<string>>;
}

export const OrganizationSelector: React.FC<OrganizationSelectorProps> = ({
  setSelectedOrganization,
}) => {
  const { organizations, areOrganizationsLoading }: UseOrganizationsResult =
    useGetOrganizations();

  const handleOrganizationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const selectedOrganization = event?.target?.value;

    if (selectedOrganization) {
      setSelectedOrganization(selectedOrganization);
    }
  };

  if (areOrganizationsLoading) {
    return <LoadingSpinner />;
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
