import React from 'react';
import { Tabs, Tag, Table } from 'antd';
import styles from './styles.scss';

const { TabPane } = Tabs;

interface ICase {
  key: string;
  name: string;
  ownerId: string;
  progress: number;
  rejectReason: string;
  platform: string;
  data: number[];
}
// -1 rejected
// 0 finished
// 1 progress
const FakeData: ICase[] = [
  { key: '001', name: 'SPI FMax Test', ownerId: 'huahua', progress: 1, rejectReason: '', data: [1, 3, 5], platform: 'versal' },
  { key: '002', name: 'SPI Setup Time Test', ownerId: 'huahua', progress: 0, rejectReason: '', data: [1, 3, 5], platform: 'kintex' },
  { key: '003', name: 'I2C FMax Test', ownerId: 'huahua', progress: -1, rejectReason: 'No Authority', data: [1, 3, 5], platform: 'versal' },
  { key: '004', name: 'QSPI FMax Test', ownerId: 'huahua', progress: 1, rejectReason: '', data: [1, 3, 5], platform: 'zynqplus' },
  { key: '005', name: 'I2C Setup Test', ownerId: 'huahua', progress: 0, rejectReason: '', data: [1, 3, 5], platform: 'versal' },
  { key: '006', name: 'UART FMax Test', ownerId: 'huahua', progress: 1, rejectReason: '', data: [1, 3, 5], platform: 'kintex' },
  { key: '007', name: 'UART Setup/Hold Time Test', ownerId: 'huahua', progress: 1, rejectReason: '', data: [1, 3, 5], platform: 'versal' },
  { key: '008', name: 'USB ULPI FMax Test', ownerId: 'huahua', progress: 0, rejectReason: '', data: [1, 3, 5], platform: 'zynqplus' },
  { key: '009', name: 'WWDT FMax Test', ownerId: 'huahua', progress: -1, rejectReason: 'No Authority', data: [1, 3, 5], platform: 'versal' },
  { key: '010', name: 'PCIE FMax Test', ownerId: 'huahua', progress: -1, rejectReason: 'Configuration Fail', data: [1, 3, 5], platform: 'zynqplus' },
  { key: '011', name: 'PCIE External Loopback Test', ownerId: 'huahua', progress: -1, rejectReason: 'No Authority', data: [], platform: 'versal' },
  { key: '012', name: 'USB ULPI Timing Test', ownerId: 'huahua', progress: 0, rejectReason: '', data: [], platform: 'kintex' },
  { key: '013', name: 'HDMI FMax Test', ownerId: 'huahua', progress: -1, rejectReason: 'No Authority', data: [], platform: 'versal' }
];

const progressTag: React.ReactNode = (text: number) => {
  switch (text) {
    case -1: return (<Tag color='volcano'>Rejected</Tag>);
    case 0: return (<Tag color='green'>Finished</Tag>);
    case 1: return (<Tag color='geekblue'>In Progress</Tag>);
  }
}
const rejectReason = (text: string): string => {
  if (text.length > 0) return text;
  return '-'
}
const platform = (text: string): string => {
  if (text.length === 0) return '-';
  return text.slice(0, 1).toUpperCase() + text.slice(1);
}
const columns = [
  { title: 'Test ID', dataIndex: 'key', key: 'key' },
  { title: 'Testcase Name', dataIndex: 'name', key: 'name' },
  { title: 'Owner', dataIndex: 'ownerId', key: 'ownerId' },
  { title: 'Platform', dataIndex: 'platform', key: 'platform', render: platform },
  { title: 'Progress', dataIndex: 'progress', key: 'progress', render: progressTag },
  { title: 'Reject Reason', dataIndex: 'rejectReason', key: 'rejectReason', render: rejectReason }
]

const ProtectedTestCase: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1>TestCase Status: </h1>
      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="All" key="1">
          <Table columns={columns} dataSource={FakeData} />
        </TabPane>
        <TabPane tab="Finished" key="2">
          <Table columns={columns} dataSource={FakeData.filter(value => value.progress === 0)} />
        </TabPane>
        <TabPane tab="In Progress" key="3">
          <Table columns={columns} dataSource={FakeData.filter(value => value.progress === 1)} />
        </TabPane>
        <TabPane tab="Rejected" key="4">
          <Table columns={columns} dataSource={FakeData.filter(value => value.progress === -1)} />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default ProtectedTestCase;