import React from 'react';
import { Radio } from 'antd';

interface TimeResolutionFilterProps {
  selectResolution: (resolution: string) => void;
  selectedTimeResolution: string;
  disableButtons: boolean;
}
interface TimeResolution {
  year: string;
  month: string;
}

export const timeResolution: TimeResolution = {
  year: 'Year',
  month: 'Month',
};

export const TimeResolutionFilter: React.FC<TimeResolutionFilterProps> = ({
  selectResolution,
  selectedTimeResolution,
  disableButtons,
}) => {
  return (
    <section>
      <Radio.Group
        value={selectedTimeResolution}
        onChange={e => selectResolution(e.target.value)}
      >
        <Radio.Button value={timeResolution.year} disabled={disableButtons}>
          {timeResolution.year}
        </Radio.Button>
        <Radio.Button value={timeResolution.month} disabled={disableButtons}>
          {timeResolution.month}
        </Radio.Button>
      </Radio.Group>
    </section>
  );
};
