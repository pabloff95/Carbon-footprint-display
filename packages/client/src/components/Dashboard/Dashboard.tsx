import React, { useState } from 'react';
import { OrganizationSelector } from './OrganizationSelector';
import { OrganizationEmissionsChart } from './OrganizationEmissionsChart';
import { TimeResolutionFilter, timeResolution } from './TimeResolutionFilter';
import { Typography } from 'antd';

export const Dashboard: React.FC = () => {
  const [selectedOrganization, setSelectedOrganization] = useState('');
  const [selectedTimeResolution, setSelectedTimeResolution] = useState(
    timeResolution.year
  );

  const handleSelectTimeResolution = (resolution: string): void => {
    setSelectedTimeResolution(resolution);
  };

  return (
    <>
      <header>
        <Typography.Title level={2}>Emissions dashboard</Typography.Title>
      </header>
      <main>
        <OrganizationSelector
          setSelectedOrganization={setSelectedOrganization}
        />
        <TimeResolutionFilter
          selectResolution={handleSelectTimeResolution}
          selectedTimeResolution={selectedTimeResolution}
        />
        <OrganizationEmissionsChart
          selectedOrganization={selectedOrganization}
          selectedTimeResolution={selectedTimeResolution}
        />
      </main>
    </>
  );
};
