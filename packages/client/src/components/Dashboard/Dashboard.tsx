import React, { useState } from 'react';
import { OrganizationSelector } from './OrganizationSelector';
import { OrganizationEmissionsChart } from './OrganizationEmissionsChart';
import { TimeResolutionFilter, timeResolution } from './TimeResolutionFilter';

export const Dashboard: React.FC = () => {
  const [selectedOrganization, setSelectedOrganization] = useState('');
  const [selectedTimeResolution, setSelectedTimeResolution] = useState(
    timeResolution.year
  );

  const handleSelectTimeResolution: (resolution: string) => void = (
    resolution: string
  ) => {
    setSelectedTimeResolution(resolution);
  };

  return (
    <>
      <header>
        <h1>Emissions dashboard</h1>
      </header>
      <main>
        <OrganizationSelector
          setSelectedOrganization={setSelectedOrganization}
        />
        <TimeResolutionFilter selectResolution={handleSelectTimeResolution} />
        <OrganizationEmissionsChart
          selectedOrganization={selectedOrganization}
          selectedTimeResolution={selectedTimeResolution}
        />
      </main>
    </>
  );
};
