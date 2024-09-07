import React, { Dispatch, SetStateAction } from 'react';
import useGetOrganizations, {
  UseOrganizationsResult,
} from '../../hooks/useGetOrganizations';
import { LoadingSpinner } from '../Base/LoadingSpinner';
import { Alert, Select } from 'antd';

interface OrganizationSelectorProps {
  setSelectedOrganization: Dispatch<SetStateAction<string>>;
}

export const OrganizationSelector: React.FC<OrganizationSelectorProps> = ({
  setSelectedOrganization,
}) => {
  const { organizations, areOrganizationsLoading }: UseOrganizationsResult =
    useGetOrganizations();

  const handleOrganizationChange = (selectedOrganization: string): void => {
    if (selectedOrganization) {
      setSelectedOrganization(selectedOrganization);
    }
  };

  if (areOrganizationsLoading) {
    return <LoadingSpinner />;
  }

  if (!organizations || organizations.length === 0) {
    return <Alert message="No organizations were found!" type="warning" />;
  }

  return (
    <Select
      defaultValue="default"
      style={{ width: 225 }}
      onChange={handleOrganizationChange}
      options={[
        {
          value: 'default',
          label: 'Select an organization...',
          disabled: true,
        },
        ...organizations.map(organization => ({
          value: organization,
          label: organization,
        })),
      ]}
    />
  );
};
