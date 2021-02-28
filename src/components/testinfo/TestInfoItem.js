import React, { useState } from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import AskRemoveTestInfoModal from './AskRemoveTestInfoModal';
import AskModifyTestInfoModal from './AskModifyTestInfoModal';
import { Link } from 'react-router-dom';

const TestInfoItemBlock = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  border-top: 1px solid #dee2e6;
  &:nth-child(odd) {
    background: #f8f9fa;
  }
  &:hover {
    cursor: pointer;
    background: ${palette.gray[3]};
  }
`;

const TestInfoTextBlock = styled.div`
  align-items: stretch;
  width: 100%;
`;

const ButtonBlockWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ButtonBlock = styled.div`
  font-size: 1.3rem;
  color: #ff6b6b;
  cursor: pointer;
  &:hover {
    color: red;
  }
  & + & {
    margin-left: 1rem;
  }
`;

const TestInfoItem = ({
  testinfo,
  onSetUpdateInfo,
  onSetTestInfo,
  onUpdate,
  onRemove,
  onChangeUpdateField,
  testinfo_update,
}) => {
  const [updateModal, setUpdateModal] = useState(false);
  const onUpdateCancel = () => {
    setUpdateModal(false);
  };
  const onUpdateConrirm = () => {
    setUpdateModal(false);
    onUpdate();
  };
  const [modal, setModal] = useState(false);
  const onRemoveClick = () => {
    setModal(true);
  };
  const onCancel = () => {
    setModal(false);
  };

  const onRemoveConfirm = () => {
    setModal(false);
    onRemove(testinfo._id);
  };
  const onEditClick = () => {
    onSetUpdateInfo({ testinfo_update: testinfo });
    setUpdateModal(true);
  };
  const onItemClick = () => {
    onSetTestInfo({ testinfo: testinfo });
  };

  return (
    <>
      <TestInfoItemBlock>
        <TestInfoTextBlock onClick={onItemClick}>
          <Link to={`/listCriteria/${testinfo._id}`}>
            <TestInfoTextBlock>{testinfo.testName}</TestInfoTextBlock>
          </Link>
        </TestInfoTextBlock>

        <ButtonBlockWrapper>
          {/* <ButtonBlock onClick={onEditClick}>
            <MdEdit />
          </ButtonBlock> */}
          <ButtonBlock onClick={onRemoveClick}>
            <MdDeleteForever />
          </ButtonBlock>
        </ButtonBlockWrapper>
      </TestInfoItemBlock>

      <AskRemoveTestInfoModal
        visible={modal}
        onConfirm={onRemoveConfirm}
        onCancel={onCancel}
      />
      <AskModifyTestInfoModal
        testinfo_update={testinfo_update}
        onChangeUpdateField={onChangeUpdateField}
        visible={updateModal}
        onConfirm={onUpdateConrirm}
        onCancel={onUpdateCancel}
      />
    </>
  );
};

export default TestInfoItem;
