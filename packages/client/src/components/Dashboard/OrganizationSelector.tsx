import React, { Dispatch, SetStateAction, useEffect } from 'react';
import useGetOrganizations, {
  UseOrganizationsResult,
} from '../../hooks/useGetOrganizations';
import { LoadingSpinner } from '../Base/LoadingSpinner';
import { Alert, Select } from 'antd';

interface OrganizationSelectorProps {
  setSelectedOrganization: Dispatch<SetStateAction<string>>;
  setIsDataLoading: Dispatch<SetStateAction<boolean>>;
  selectedOrganization: string;
}

export const OrganizationSelector: React.FC<OrganizationSelectorProps> = ({
  setSelectedOrganization,
  setIsDataLoading,
  selectedOrganization,
}) => {
  const { organizations, areOrganizationsLoading }: UseOrganizationsResult =
    useGetOrganizations();

  useEffect(() => {
    // Notify Dashboard component of query being in process
    setIsDataLoading(areOrganizationsLoading);
  }, [areOrganizationsLoading, setIsDataLoading]);

  const handleOrganizationChange = (organizationName: string): void => {
    if (organizationName) {
      setSelectedOrganization(organizationName);
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
      defaultValue={selectedOrganization || 'default'}
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
