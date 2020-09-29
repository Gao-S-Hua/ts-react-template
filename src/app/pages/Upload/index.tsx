import React from 'react';
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import styles from './upload.scss';
import { getAuthHeader } from '../../api/auth'

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
const UploadFile: React.FC = function() {
  return (
    <div className={styles.wrapper}>
      <h1>Upload Your File</h1>
      <Upload {...config}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </div>
  );
}

export default UploadFile;
