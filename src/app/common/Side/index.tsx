import React from 'react';
import { useHistory, withRouter, RouteComponentProps } from 'react-router-dom';
import {
  HomeOutlined, FileOutlined, VideoCameraOutlined, UserOutlined, ContainerOutlined, BarChartOutlined,
  LineChartOutlined, TeamOutlined, FireOutlined, BulbOutlined, PlusCircleOutlined, SnippetsOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';
import styles from './styles.scss';

const { SubMenu } = Menu;

const getActive = (path: string): string => {
  if (path.includes('uinfo')) return '2';
  if (path.includes('video')) return '3';
  if (path.includes('upload')) return '4';
  if (path.includes('load')) return '5';
  if (path.includes('/case/status')) return 'sub01';
  if (path.includes('/case/new')) return 'sub02';
  if (path.includes('/case/info')) return 'sub0';
  if (path.includes('/listen/temp')) return 'sub11';
  if (path.includes('/listen/cur')) return 'sub12';
  if (path.includes('/listen/count')) return 'sub13';
  return '1';
}

const Side: React.FC<RouteComponentProps> = function(props: RouteComponentProps) {
  const history = useHistory();
  return (
    <div className={styles.side}>
      <Menu mode="inline" selectedKeys={[getActive(props.location.pathname)]} style={{ width: '100%', height: '100%' }}>
        <Menu.Item key="1" icon={<HomeOutlined />} onClick={() => history.push('/')}>Home</Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />} onClick={() => history.push('/uinfo')}>User</Menu.Item>
        <Menu.Item key="3" icon={<VideoCameraOutlined />} onClick={() => history.push('/video')}>Video</Menu.Item>
        <Menu.Item key="4" icon={<FileOutlined />} onClick={() => history.push('/upload')}>Upload</Menu.Item>
        <Menu.Item key="5" icon={<TeamOutlined />} onClick={() => history.push('/load')}>Team</Menu.Item>
        <SubMenu key='sub0' icon={<ContainerOutlined />} title='Test Case'>
          <Menu.Item key="sub01" icon={<SnippetsOutlined />} onClick={() => history.push('/case/status')}>Case Status</Menu.Item>
          <Menu.Item key="sub02" icon={<PlusCircleOutlined />} onClick={() => history.push('/case/new')}>New Case</Menu.Item>
        </SubMenu>
        <SubMenu key = 'sub1' icon={<LineChartOutlined />} title='Data Display'>
          <Menu.Item key="sub11" icon={<FireOutlined />} onClick={() => history.push('/listen/temp')}>Temperature</Menu.Item>
          <Menu.Item key="sub12" icon={<BulbOutlined />} onClick={() => history.push('/listen/cur')}>Current</Menu.Item>
          <Menu.Item key="sub13" icon={<BarChartOutlined />} onClick={() => history.push('/listen/count')}>Case Counts</Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  )
}

export default withRouter(Side);
