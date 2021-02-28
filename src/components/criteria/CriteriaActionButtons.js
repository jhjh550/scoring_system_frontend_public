import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import AskModal from '../common/AskModal';

const CriteriaActionButtonsBlock = styled.div`
  margin-top: 1rem;
  margin-bottom: 3rem;
  button + button {
    margin-left: 0.5rem;
  }
`;

// 사용하는 버튼과 일치하는 높이로 설정한 후 서로간의 여백을 지정
const StyledButton = styled(Button)`
  height: 2.215rem;
  & + & {
    margin-left: 0.5rem;
  }
`;

const CriteriaActionButtons = ({ user, criteriaId, onCancel, onPublish }) => {
  const title = criteriaId ? '평가기준 수정' : '평가기준 등록';
  const desc = title + '중 입니다.';

  const [modal, setModal] = useState(false);
  const onConfirm = () => {
    setModal(false);
  };
  const [errorModal, setErrorModal] = useState(false);
  const onErrorConfirm = () =>{
    setErrorModal(false)
  }

  const onPublishClick = () => {
    // todo : 각 평가점수 합이 문제의 점수와 동일한가?
    

    setModal(true);
    onPublish();
  };

  return (
    <>
      <CriteriaActionButtonsBlock>
        {user && (
          <StyledButton cyan onClick={onPublishClick}>
            {title}
          </StyledButton>
        )}

        <StyledButton onClick={onCancel}>취소</StyledButton>
      </CriteriaActionButtonsBlock>
      <AskModal
        visible={modal}
        title={title}
        description={desc}
        onConfirm={onConfirm}
        showCancel={false}
      />
      <AskModal 
        visible={errorModal}
        title={"오류발생"}
        
      />
    </>
  );
};

export default CriteriaActionButtons;
