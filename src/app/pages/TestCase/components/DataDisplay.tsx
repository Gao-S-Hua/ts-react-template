import React from 'react';
import { Chart, Interval } from 'bizcharts';
import styles from './styles.scss';

interface IParams {
  data: number[]
}

const DataDisplay: React.FC<IParams> = function(props: IParams) {
  const data = props.data;
  const charData = [];
  for (let i = 0; i < data.length; i++) {
    charData.push({ id: (i + 1).toString(), num: data[i] });
  }
  return (
    <div className={styles.datawrap}>
      <h2>Test Data: </h2>
      <Chart height={320} autoFit data={charData} padding='auto'>
        <Interval position="id*num" />
      </Chart>
    </div>
  );
}

export default DataDisplay;
