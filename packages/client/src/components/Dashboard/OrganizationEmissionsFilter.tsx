import React from 'react';
import useGetOrganizations, {
  UseOrganizationsResult,
} from '../../hooks/useGetOrganizations';

export const OrganizationEmissionsFilter: React.FC = () => {
  const { organizations, areOrganizationsLoading }: UseOrganizationsResult =
    useGetOrganizations();

  if (areOrganizationsLoading) {
    return <p>Loading...</p>;
  }

  if (!organizations || organizations.length === 0) {
    return <p>No organizations were found!</p>;
  }

  return (
    <select name="company" defaultValue={'DEFAULT'}>
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
