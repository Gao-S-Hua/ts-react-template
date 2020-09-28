import React, { useEffect, useState } from 'react';
import { debounce } from '../util';
import { Menu } from 'antd';
import styles from './styles.scss';

const { SubMenu } = Menu;

const Side: React.FC = function() {
  return (
    <div className={styles.side}>
      <Menu mode="inline" defaultSelectedKeys={['1']} className={styles.menu}>
        <Menu.Item key="1">option1</Menu.Item>
        <Menu.Item key="2">option2</Menu.Item>
        <Menu.Item key="3">option3</Menu.Item>
        <Menu.Item key="4">option4</Menu.Item>
      </Menu>
    </div>
  )
}

export default Side;
