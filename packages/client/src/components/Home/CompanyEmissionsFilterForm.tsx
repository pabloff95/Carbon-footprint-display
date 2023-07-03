import React from 'react';
import useGetOrganizations, {
  UseOrganizationsResult,
} from '../../hooks/useGetOrganizations';

export const CompanyEmissionsFilterForm: React.FC = () => {
  const { organizations, areOrganizationsLoading }: UseOrganizationsResult =
    useGetOrganizations();

  return (
    <form action="">
      {areOrganizationsLoading && <p>Loading...</p>}
      {!areOrganizationsLoading && (
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
      )}
    </form>
  );
};
