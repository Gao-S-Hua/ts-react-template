import React from 'react';
import { Descriptions } from 'antd';
import { ICase, progressTag, rejectReason } from '../TestCase';

interface IProps {
  caseInfo: ICase
}
const { Item } = Descriptions;
const CaseLabel:React.FC<IProps> = function(props: IProps) {
  const caseInfo = props.caseInfo;
  return (
    <div>
      <Descriptions bordered>
        <Item label='Case ID'>{caseInfo.caseId}</Item>
        <Item label='Owner'>{caseInfo.ownerName}</Item>
        <Item label='Platform '>{caseInfo.platform}</Item>
        <Item label='Progress'>{progressTag(caseInfo.progress)}</Item>
        <Item label='RejectReason'>{rejectReason(caseInfo.rejectReason)}</Item>
      </Descriptions>
    </div>
  );
}

export default CaseLabel;
