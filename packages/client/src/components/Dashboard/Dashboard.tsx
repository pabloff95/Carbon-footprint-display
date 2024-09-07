import React, { useState } from 'react';
import { OrganizationSelector } from './OrganizationSelector';
import { OrganizationEmissionsChart } from './OrganizationEmissionsChart';
import { TimeResolutionFilter, timeResolution } from './TimeResolutionFilter';
import { Alert, Typography } from 'antd';

export const Dashboard: React.FC = () => {
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  const [selectedOrganization, setSelectedOrganization] = useState<string>('');
  const [selectedTimeResolution, setSelectedTimeResolution] = useState<string>(
    timeResolution.year
  );

  const handleSelectTimeResolution = (resolution: string): void => {
    setSelectedTimeResolution(resolution);
  };

  return (
    <main className="h-full w-full flex flex-col gap-4 items-center justify-center bg-slate-200">
      <Typography.Title level={2} className="!mb-8">
        Emissions dashboard
      </Typography.Title>
      <OrganizationSelector
        setSelectedOrganization={setSelectedOrganization}
        setIsDataLoading={setIsDataLoading}
        selectedOrganization={selectedOrganization}
      />
      {!isDataLoading && (
        <TimeResolutionFilter
          selectResolution={handleSelectTimeResolution}
          selectedTimeResolution={selectedTimeResolution}
          disableButtons={!selectedOrganization}
        />
      )}
      {!!selectedOrganization && (
        <OrganizationEmissionsChart
          selectedOrganization={selectedOrganization}
          selectedTimeResolution={selectedTimeResolution}
          setIsDataLoading={setIsDataLoading}
        />
      )}
      {isDataLoading && <Alert type="info" message="Loading data..." banner />}
    </main>
  );
};
