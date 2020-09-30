import React from 'react';
import { Input, Button, Select, Upload, message, Divider, Form, Radio } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getAuthHeader } from '../../api/auth';
import styles from './styles.scss';

const { Option } = Select;
const config = {
  name: 'userfile',
  action: '/api/upload',
  multiple: true,
  headers: {
    authorization: getAuthHeader()
  },
  onChange(info: any) {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const NewCase: React.FC = () => {
  return (
    <div>
      <h1>Create New TestCase</h1>
      <Divider />
      <Form {...layout} className={styles.wrapper}>
        <Form.Item label="Test Name">
          <Input placeholder="TestCase" style={{ width: 200 }}/>
        </Form.Item>
        <Form.Item label="Platform">
          <Select
            placeholder="Select a Platform"
            style={{ width: 200 }}
          >
            <Option value = 'versal'>Versal</Option>
            <Option value = 'kintex'>Kintex</Option>
            <Option value = 'virtex'>Virtex</Option>
            <Option value = 'zynq'>Zynq</Option>
            <Option value = 'zynqplus'>ZynqPlus</Option>
            <Option value = 'spartan'>Spartan</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Configuration file:">
          <div style={{ width: 200 }}>
            <Upload {...config}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </div>
        </Form.Item>
        <Form.Item label="Test Time">
          <Radio.Group defaultValue={2}>
            <Radio value={1}>Urgent</Radio>
            <Radio value={2}>One Day</Radio>
            <Radio value={3}>One Week</Radio>
            <Radio value={4}>Draft</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type='primary'>Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default NewCase;
