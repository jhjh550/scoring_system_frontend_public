import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import AskModal from './AskModal';
import {
  prepareImgsForTest,
  countNotProcessed,
  prepareImgsSecondProcess,
  fileCopy100_not_rotate,
  moveToAnswerGroupDir,
} from '../../lib/api/prepare';
import palette from '../../lib/styles/palette';

const FullScreen = styled.div`
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DivSpan = styled.span`
  color: red;
`;

const SettingsModalBlock = styled.div`
  width: 480px;
  background: white;
  padding: 1.5rem;
  border-radius: 4px;
  box-shadow: 0px 0px 8px solid(0, 0, 0, 0.125);
  h2 {
    margin-top: 0;
    margin-bottom: 1rem;
  }
  p {
    margin-bottom: 3rem;
  }
  .buttons {
    display: flex;
    justify-content: flex-end;
  }
`;

const StyledButton = styled(Button)`
  height: 2rem;
  & + & {
    margin-left: 0.75rem;
  }
`;

const ScoringPrepareButtonBlock = styled.div`
  margin-top: 1rem;
  margin-bottom: 3rem;
`;

const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.5rem;
  outline: none;
  width: 100px;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid ${palette.gray[7]};
  }
  margin: 1rem;
`;

const AskSettingsModal = ({
  visible,
  onGenerateEmptyScoreInfo,
  onGenerateTestInfo,
  onDeleteAllData,
  onCreateButtonClicked,
  onConfirm,
  onCancel,
  user,
  lastGeneratedScore, 
  totalCount,
}) => {
  const [waitModal, setWaitModal] = useState(false);
  const [fileCount, setFileCount] = useState(0);
  const inputRef = useRef(null);

  useEffect(()=>{
    setWaitModal(false);
  }, [lastGeneratedScore])

  if (!visible) return null;

  const getFileCount = async () => {
    return await countNotProcessed();
  };

  const onPrepareBtnClick = () => {
    // const interval = setInterval(async () => {
    //   const result = await getFileCount();
    //   setFileCount(result.data);
    //   if (result.data === 0) {
    //     clearInterval(interval);
    //     setTimeout(() => {
    //       alert('채점 준비가 완료되었습니다.');
    //     }, 1000);
    //   }
    // }, 1000);
    prepareImgsForTest(user._id);
  };

  const onSecondProcessBtnClick = () => {
    prepareImgsSecondProcess();
  };

  const onFileCopyClicked = () => {
    const startFileNo = inputRef.current.value;
    fileCopy100_not_rotate(startFileNo);
    inputRef.current.value = parseInt(startFileNo) + 100;
  };

  const onDeleteAllDataClicked = () => {
    onDeleteAllData();
  };

  const onGenerateTestInfoClicked = () =>{
    onGenerateTestInfo();
  }

  const onGenerateEmptyScoreInfoClicked = () => {
    setWaitModal(true)
    onGenerateEmptyScoreInfo();
  }

  return (
    <FullScreen>
      <SettingsModalBlock>
        <h1>Settings</h1>
        <hr />
        <h2>채점 정보 입력 시작</h2>
        <Button big cyan onClick={onGenerateTestInfoClicked}>
          채점 정보 입력 시작
        </Button>
        <hr />
        <ScoringPrepareButtonBlock>
          <h2>채점 시작</h2>
          <Button big cyan onClick={onGenerateEmptyScoreInfoClicked}>
            채점 시작
          </Button>
        </ScoringPrepareButtonBlock>
        <hr />
        <div className="buttons">
          <StyledButton onClick={onCancel}>닫기</StyledButton>
        </div>
      </SettingsModalBlock>
      <AskModal
        visible={waitModal}
        title="채점 정보 생성중..."
        description="잠시만 기다려주세요."
        showProgressbar={true}
        showCancel={false}
      />
    </FullScreen>
  );
};

export default AskSettingsModal;
