import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import AskModal from '../common/AskModal';
import { Link } from 'react-router-dom';
import Responsive from '../common/Responsive';
  
const ScorerResultComponentBlock = styled(Responsive)`
  align-items: center;
  justify-content: center;
`;

const ProgressDiv = styled.div`
  margin: 8px;
  align-items: center;
  display: flex;
  font-size: 1.125rem;
  font-weight: 500;
  letter-spacing: 2px;
`;

const ScoreResultComponent = ({
  testName,
  stat,
  onExportClicked,
  exportFileName,
}) => {
  const desc = `엑셀 데이터로 변환하는 중입니다.`;
  const [modal, setModal] = useState(false);
  const onConfirm = () => {
    setModal(false);
  };

  const onExportButtonClicked = () => {
    setModal(true);
    onExportClicked();
  };

  useEffect(() => {
    setModal(false);
  }, [exportFileName]);

  return (
    <ScorerResultComponentBlock>
      <h3>{testName}</h3>
      {stat && (
        <>
          <ProgressDiv>총 문제수 : {stat.totalCount}</ProgressDiv>
          <ProgressDiv>처리 완료 : {stat.doneCount}</ProgressDiv>
          <ProgressDiv>처리 중 : {stat.processCount}</ProgressDiv>
          <ProgressDiv>
            미처리 : {stat.totalCount - stat.doneCount - stat.processCount}
          </ProgressDiv>
        </>
      )}
      <Button cyan big onClick={onExportButtonClicked}>
        Export
      </Button>
      {exportFileName && (
        <Link to={exportFileName.fileName} target="_blank" download>
          <Button big style={{ marginLeft: '0.8rem' }}>
          Download
          </Button>
          
        </Link>
      )}

      <AskModal
        visible={modal}
        title={testName}
        description={desc}
        onConfirm={onConfirm}
        showCancel={false}
        showProgressbar={true}
      />
    </ScorerResultComponentBlock>
  );
};

export default ScoreResultComponent;
