import React, { useState, useRef, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Responsive from '../common/Responsive';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';
import TestInfoItem from './TestInfoItem';
import AskSettingsModal from '../common/AskSettingsModal';
import { MdSettings } from 'react-icons/md';
import AskCreateTestInfoModal from './AskCreateTestInfoModal';
import { countNotProcessed } from '../../lib/api/prepare';
import AskModal from '../common/AskModal';

const GlobalStyle = createGlobalStyle`
    body{
        padding:0;
        margin:0;
        background: #e9ecef;
    }
`;

const TestInfoListBlock = styled.div`
  width: 512px;
  // width 가 주어진 상태에서 좌우 중앙 정렬
  margin-left: auto;
  margin-right: auto;
  margin-top: 6rem;
  border-radius: 4px;
  overflow: hidden;
`;

const TestInfoListTitle = styled.div`
  background: #22b8cf;
  color: white;
  height: 4rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TestInfoListBody = styled.div`
  background: white;
`;

const NewTestButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0.25rem;
`;

const SettingsWrppaer = styled.div`
  font-size: 1.25rem;
  margin-left: 0.25rem;
  cursor: pointer;
  align-items: center;
  text-align: center;

  &:hover {
    color: ${palette.gray[4]};
  }
`;

const TestInfoListComponent = ({
  onGenerateEmptyScoreInfo,
  onGenerateTestInfo,
  onDeleteAllData,
  onRemove,
  onPublish,
  onChangeField,
  loading,
  error,
  onSetUpdateInfo,
  onSetTestInfo,
  onUpdate,
  onChangeUpdateField,
  testinfos,
  testinfo_update,
  user,
  lastGeneratedScore, 
}) => {
  const [modal, setModal] = useState(false);
  const onCreateButtonClicked = () => {
    setModal(true);
  };
  const onCancel = () => {
    setModal(false);
  };
  const onConfirm = () => {
    setModal(false);
    onPublish();
  };

  const [settginsModal, setSettingsModal] = useState(false);
  const totalCount = useRef(0);
  const onSettingsModalClick = async () => {
    //const result = await countNotProcessed();
    //totalCount.current = result.data;
    setSettingsModal(true);
  };
  const onSettingsCancel = () => {
    setSettingsModal(false);
  };
  const onSettingsConfirm = () => {
    setSettingsModal(false);
  };
  useEffect(()=>{
    setSettingsModal(false);
  }, [testinfos, lastGeneratedScore])

  if (error) {
    return <TestInfoListBlock>에러가 발생했습니다.</TestInfoListBlock>;
  }

  return (
    <>
      <GlobalStyle />
      <TestInfoListBlock>
        <TestInfoListTitle>
          채점 정보 시험 리스트
          <SettingsWrppaer>
            <MdSettings onClick={onSettingsModalClick} />
          </SettingsWrppaer>
        </TestInfoListTitle>
        <TestInfoListBody>
          <NewTestButtonWrapper>
            {/* <Button big onClick={onCreatButtonClick}>
              새 시험 정보 추가
            </Button> */}
          </NewTestButtonWrapper>
          {!loading && testinfos && (
            <div>
              {testinfos.map((testinfo, index) => (
                <TestInfoItem
                  key={index}
                  testinfo={testinfo}
                  onUpdate={onUpdate}
                  onRemove={onRemove}
                  onChangeUpdateField={onChangeUpdateField}
                  onSetUpdateInfo={onSetUpdateInfo}
                  onSetTestInfo={onSetTestInfo}
                  testinfo_update={testinfo_update}
                />
              ))}
            </div>
          )}
        </TestInfoListBody>
      </TestInfoListBlock>
      <AskCreateTestInfoModal
        onChangeField={onChangeField}
        visible={modal}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
      <AskSettingsModal
        visible={settginsModal}
        onGenerateEmptyScoreInfo={onGenerateEmptyScoreInfo}
        onGenerateTestInfo={onGenerateTestInfo}
        onDeleteAllData={onDeleteAllData}
        onCreateButtonClicked={onCreateButtonClicked}
        onCancel={onSettingsCancel}
        onConfirm={onSettingsConfirm}
        user={user}
        lastGeneratedScore={lastGeneratedScore} // last generated score info
        totalCount={totalCount.current}
      />
    </>
  );
};

export default TestInfoListComponent;
