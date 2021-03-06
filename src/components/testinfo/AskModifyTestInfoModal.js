import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import MyDatePicker from '../common/MyDatePicker';
import palette from '../../lib/styles/palette';

const FullScreen = styled.div`
  position: fixed;
  z-index: 30;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CreateTestInfoModalBlock = styled.div`
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

const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid ${palette.gray[7]};
  }
  & + & {
    margin-top: 1rem;
  }
`;

const CodeInputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const AskModifyTestInfoModal = ({
  testinfo_update,
  onChangeUpdateField,
  visible,
  onConfirm,
  onCancel,
}) => {
  if (!visible) return null;

  const onChangeTestName = e => {
    onChangeUpdateField({ key: 'testName', value: e.target.value });
  };

  const onChangeTeseCode = e => {
    onChangeUpdateField({ key: 'testCode', value: e.target.value });
  };

  const selectedDate = new Date(
    testinfo_update.testDate.year,
    testinfo_update.testDate.month - 1,
    testinfo_update.testDate.day,
  );

  return (
    <FullScreen>
      <CreateTestInfoModalBlock>
        <h2>시험 정보 수정하기</h2>
        <h3>시험명 :</h3>
        <StyledInput
          onChange={onChangeTestName}
          value={testinfo_update.testName}
        />
        <MyDatePicker
          onChangeField={onChangeUpdateField}
          title={'시험날짜'}
          selectedDate={selectedDate}
        />
        <CodeInputWrapper>
          <h3>시험지시작번호 : </h3>
          <StyledInput
            onChange={onChangeTeseCode}
            value={testinfo_update.testCode}
          />
        </CodeInputWrapper>
        <StyledButton cyan onClick={onConfirm}>
          확인
        </StyledButton>
        <StyledButton onClick={onCancel}>취소</StyledButton>
      </CreateTestInfoModalBlock>
    </FullScreen>
  );
};

export default AskModifyTestInfoModal;
