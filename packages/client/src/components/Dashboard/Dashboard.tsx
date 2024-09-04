import React, { useState } from 'react';
import { OrganizationEmissionsFilter } from './OrganizationEmissionsFilter';
import { OrganizationEmissionsChart } from './OrganizationEmissionsChart';

export const Dashboard: React.FC = () => {
  const [selectedOrganization, setSelectedOrganization] = useState('');

  return (
    <>
      <header>
        <h1>Main dashboard</h1>
      </header>
      <main>
        <OrganizationEmissionsFilter
          setSelectedOrganization={setSelectedOrganization}
        />
        <OrganizationEmissionsChart
          selectedOrganization={selectedOrganization}
        />
      </main>
    </>
  );
};
