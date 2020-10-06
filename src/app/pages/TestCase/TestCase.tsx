import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../../api/ajax';
import { Tabs, Tag, Table } from 'antd';
import styles from './styles.scss';

const { TabPane } = Tabs;

export interface ICase {
  caseId: string;
  caseName: string;
  ownerName: string;
  ownerId: string;
  progress: number;
  rejectReason: string;
  platform: string;
  data: number[];
}

export const progressTag = (text: number): React.ReactNode => {
  switch (text) {
    case -1: return (<Tag color='volcano'>Rejected</Tag>);
    case 0: return (<Tag color='green'>Finished</Tag>);
    case 1: return (<Tag color='geekblue'>In Progress</Tag>);
  }
}
export const rejectReason = (text: string): string => {
  if (text.length > 0) return text;
  return '-'
}
const platform = (text: string): string => {
  if (text.length === 0) return '-';
  return text.slice(0, 1).toUpperCase() + text.slice(1);
}

const ProtectedTestCase: React.FC = () => {
  const history = useHistory();
  const [caseList, setCaseList] = useState<ICase[]>([]);
  const caseRender = (text: string): React.ReactNode => {
    return <div className={styles.caseid} onClick={() => { history.push('/case/info/' + text) }} >{text}</div>
  }
  const columns = [
    { title: 'Test ID', dataIndex: 'caseId', key: 'caseId', render: caseRender },
    { title: 'Testcase Name', dataIndex: 'caseName', key: 'caseName' },
    { title: 'Owner', dataIndex: 'ownerName', key: 'ownerId' },
    { title: 'Platform', dataIndex: 'platform', key: 'platform', render: platform },
    { title: 'Progress', dataIndex: 'progress', key: 'progress', render: progressTag },
    { title: 'Reject Reason', dataIndex: 'rejectReason', key: 'rejectReason', render: rejectReason }
  ]
  useEffect(() => {
    axios.get('/case/mycase').then((res) => {
      const list = res.data;
      // for (let i = 0; i < list.length; i++) {
      //   list[i].caseId = list[i].caseId;
      // }
      setCaseList(list);
    })
  }, [])
  return (
    <div className={styles.wrapper}>
      <h1>TestCase Status: </h1>
      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="All" key="1">
          <Table columns={columns} dataSource={caseList} />
        </TabPane>
        <TabPane tab="Finished" key="2">
          <Table columns={columns} dataSource={caseList.filter(value => value.progress === 0)} />
        </TabPane>
        <TabPane tab="In Progress" key="3">
          <Table columns={columns} dataSource={caseList.filter(value => value.progress === 1)} />
        </TabPane>
        <TabPane tab="Rejected" key="4">
          <Table columns={columns} dataSource={caseList.filter(value => value.progress === -1)} />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default ProtectedTestCase;
