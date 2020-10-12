import React, { useRef, useState } from 'react';
import { Input, Button, Select, Upload, message, Divider, Form, Radio } from 'antd';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';
import { getAuthHeader } from '../../api/auth';
import styles from './styles.scss';
import { Platform, Size } from './constants';
import axios from '../../api/ajax';
import { UploadChangeParam } from 'antd/lib/upload';
import { RadioChangeEvent } from 'antd/lib/radio';
import { UploadFile } from 'antd/lib/upload/interface';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
};

const NewCase: React.FC = () => {
  const nameRef = useRef<Input>(null);
  const [wait, setWait] = useState<boolean>(false);
  const [testName, setTestName] = useState<string>('');
  const [platform, setPlatform] = useState<Platform>(Platform.kintex);
  const [configFile, setConfigFile] = useState<UploadFile[]>([]);
  const [testTime, setsetTime] = useState<number>(2);
  const handleTestTime = (e: RadioChangeEvent) => {
    setsetTime(parseInt(e.target.value));
  }
  const config = {
    fileList: configFile,
    name: 'userfile',
    action: '/api/upload',
    headers: {
      authorization: getAuthHeader()
    },
    onChange(info: UploadChangeParam) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        setConfigFile([info.file]);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
        setConfigFile([]);
      }
    },
    beforeUpload(file: UploadFile) {
      if (file.size > 2 * Size.Mbyte) {
        message.error('Image must smaller than 2MB!');
        return false;
      }
      return true;
    }
  }

  const check = function(): boolean {
    if (testName.length === 0) {
      message.error('Test Name: cannot be empty');
      nameRef.current?.focus();
      return false;
    }
    if (configFile.length === 0) {
      message.error('Error: No Configuration file');
      return false;
    }
    return true;
  }

  const handleSubmit = () => {
    if (!check()) return;
    const newCaseInfo = {
      testName,
      platform,
      testTime
    };
    setWait(true);
    axios.post('/case/newcase', newCaseInfo)
      .then(() => { message.success('Test Case Submitted Success!') })
      .catch(() => { message.error('Test case Rejected by Server') })
      .finally(() => setWait(false));
  }
  return (
    <div>
      <h1>Create New TestCase</h1>
      <Divider />
      <Form {...layout} className={styles.wrapper}>
        <Form.Item label="Test Name">
          <Input placeholder="TestCase" style={{ width: 200 }} ref={nameRef} value={testName} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setTestName(event.currentTarget.value) }}/>
        </Form.Item>
        <Form.Item label="Platform">
          <Select
            placeholder="Select a Platform"
            style={{ width: 200 }}
            value={platform}
            onChange={(value: Platform) => { setPlatform(value) }}
          >
            <Option value={Platform.versal}>Versal</Option>
            <Option value={Platform.kintex}>Kintex</Option>
            <Option value={Platform.virtex}>Virtex</Option>
            <Option value={Platform.zynq}>Zynq</Option>
            <Option value={Platform.zynqplus}>ZynqPlus</Option>
            <Option value={Platform.spartan}>Spartan</Option>
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
          <Radio.Group value={testTime} onChange={handleTestTime}>
            <Radio value={1}>Urgent</Radio>
            <Radio value={2}>One Day</Radio>
            <Radio value={3}>One Week</Radio>
            <Radio value={0}>Draft</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type='primary' onClick={handleSubmit} disabled={wait}>{wait ? <div>Waiting <LoadingOutlined /></div> : 'Submit'}</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default NewCase;
