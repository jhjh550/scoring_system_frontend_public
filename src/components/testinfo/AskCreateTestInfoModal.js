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
  margin-bottom: 1rem;
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

const AskCreateTestInfoModal = ({
  onChangeField,
  visible,
  onConfirm,
  onCancel,
}) => {
  if (!visible) return null;

  const onChangeTestName = e => {
    onChangeField({ key: 'testName', value: e.target.value });
  };
  const onChangeTeseCode = e => {
    onChangeField({ key: 'testCode', value: e.target.value });
  };

  return (
    <FullScreen>
      <CreateTestInfoModalBlock>
        <h2>시험 정보 생성하기</h2>
        <h3>시험명 :</h3>
        <StyledInput onChange={onChangeTestName} />
        {/* <MyDatePicker onChangeField={onChangeField} title={'시험날짜'} />
        <CodeInputWrapper>
          <h3>시험지시작번호 : </h3>
          <StyledInput onChange={onChangeTeseCode} />
        </CodeInputWrapper> */}
        <div className="buttons">
          <StyledButton cyan onClick={onConfirm}>
            확인
          </StyledButton>
          <StyledButton onClick={onCancel}>취소</StyledButton>
        </div>
      </CreateTestInfoModalBlock>
    </FullScreen>
  );
};

export default AskCreateTestInfoModal;
