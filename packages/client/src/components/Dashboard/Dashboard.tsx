import React from 'react';
import { OrganizationEmissionsFilter } from './OrganizationEmissionsFilter';
import { OrganizationEmissionsChart } from './OrganizationEmissionsChart';

export const Dashboard: React.FC = () => {
  return (
    <>
      <header>
        <h1>Main dashboard</h1>
      </header>
      <main>
        <OrganizationEmissionsFilter />
        <OrganizationEmissionsChart />
      </main>
    </>
  );
};
