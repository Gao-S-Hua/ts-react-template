import React from 'react';
import {
  Chart, Tooltip, Interval
} from 'bizcharts';

const Count: React.FC = function() {
  return (
    <div>
      <h1>Case Number Total Count</h1>
      <Chart height={400} width={800} padding={[50, 50]} data={data} autoFit>
        <Interval
          adjust={[
            {
              type: 'dodge',
              marginRatio: 0
            }
          ]}
          color="name"
          position="month*rainFall"
        />
        <Tooltip shared />
      </Chart>
    </div>
  );
}

const data = [
  { name: 'London', month: 'Jan.', rainFall: 18.9 },
  { name: 'London', month: 'Feb.', rainFall: 28.8 },
  { name: 'London', month: 'Mar.', rainFall: 39.3 },
  { name: 'London', month: 'Apr.', rainFall: 81.4 },
  { name: 'London', month: 'May', rainFall: 47 },
  { name: 'London', month: 'Jun.', rainFall: 20.3 },
  { name: 'London', month: 'Jul.', rainFall: 24 },
  { name: 'London', month: 'Aug.', rainFall: 35.6 },
  { name: 'Berlin', month: 'Jan.', rainFall: 12.4 },
  { name: 'Berlin', month: 'Feb.', rainFall: 23.2 },
  { name: 'Berlin', month: 'Mar.', rainFall: 34.5 },
  { name: 'Berlin', month: 'Apr.', rainFall: 99.7 },
  { name: 'Berlin', month: 'May', rainFall: 52.6 },
  { name: 'Berlin', month: 'Jun.', rainFall: 35.5 },
  { name: 'Berlin', month: 'Jul.', rainFall: 37.4 },
  { name: 'Berlin', month: 'Aug.', rainFall: 42.4 },
];

export default Count;
