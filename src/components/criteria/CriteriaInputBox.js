import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { MdDeleteForever } from 'react-icons/md';
import AskModal from '../common/AskModal'

const CriteriaInputBoxBlock = styled.div`
  width: 100%;
  border-top: 1px solid ${palette.gray[2]};
  padding-top: 2rem;

  h4 {
    color: ${palette.gray[8]};
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
`;

const CriteriaForm = styled.form`
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  width: 800px;
  border: 1px solid ${palette.gray[9]}; /* 스타일 초기화 */

  button {
    outline: none;
    border: none;
  }
  div,
  input,
  button {
    font-size: 1rem;
    padding: 0.5rem;
  }

  button {
    width: 100px;
    cursor: pointer;
    padding-right: 1rem;
    padding-left: 1rem;
    border: none;
    background: ${palette.gray[8]};
    color: white;
    font-weight: bold;
    &:hover {
      background: ${palette.gray[6]};
    }
  }
`;

const InputItemPoint = styled.input`
  width: 100px;
`;

const InputItemCriteria = styled.input`
  flex: 1;
`;

const Criteria = styled.div`
  /* margin-left: 0.5rem; */
  margin-top: 0.5rem;
  color: ${palette.gray[6]};
  /* cursor: pointer; */
  /* &:hover {
    opacity: 0.5;
  } */
  .remove {
    font-size: 1.5rem;
    color: #ff6b6b;
    cursor: pointer;
    &:hover {
      color: #ff8787;
    }
  }
`;

const CriteriaListBlock = styled.div`
  /* display: flex; */
  margin-top: 1rem;
`;

// React.memo 를 이용하여 criteria 값이 바뀔때만 다시 렌더링 되도록 처리
const CriteriaItem = React.memo(({ criteria, onRemove }) => (
  <Criteria>
    {criteria.point}점 : {criteria.text}
    <span className="remove" onClick={() => onRemove(criteria)}>
      <MdDeleteForever />
    </span>
  </Criteria>
));

const CriteriaList = React.memo(({ criterias, onRemove }) => (
  <CriteriaListBlock>
    {criterias.map(criteria => (
      <CriteriaItem
        key={criteria.text}
        criteria={criteria}
        onRemove={onRemove}
      />
    ))}
  </CriteriaListBlock>
));

const CriteriaInputBox = ({ criterias, onChangeCriterias }) => {
  const [input, setInput] = useState('');
  const [point, setPoint] = useState(0);
  const [localCriterias, setLocalCriterias] = useState([]);
  const [errorModal, setErrorModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const onErrorConfirm = () => {
    setErrorModal(false)
  }
    // const insertCriteria = useCallback(
  //   criteria => {
  //     if (!criteria) return; // 공백이라면 추가하지 않음
  //     if (localCriterias.includes(criteria)) return; // 중복이라면 추가하지 않음
  //     setLocalCriterias([...localCriterias, criteria]);
  //     onChangeCriterias(nextCriterias);
  //   },
  //   [localCriterias, onChangeCriterias],
  // );
  const insertCriteria = useCallback(newCriteria => {
    if (!newCriteria.text) return; // 공백이라면 추가하지 않음
    for (const localCriteria of localCriterias) {
      if (localCriteria.text === newCriteria.text) return; // 중복이라면 추가하지 않음
    }

    const nextCriterias = [...localCriterias, newCriteria];
    setLocalCriterias(nextCriterias);
    onChangeCriterias(nextCriterias);
  });

  // const onRemove = useCallback(
  //   criteria => {
  //     const nextCriterias = localCriterias.filter(t => t !== criteria);
  //     setLocalCriterias(nextCriterias);
  //     onChangeCriterias(nextCriterias);
  //   },
  //   [localCriterias, onChangeCriterias],
  // );

  const onRemove = useCallback(
    removeCriteria => {
      const nextCriterias = localCriterias.filter(
        t => t.text !== removeCriteria.text,
      );
      setLocalCriterias(nextCriterias);
      onChangeCriterias(nextCriterias);
    },
    [localCriterias, onChangeCriterias],
  );

  const onChange = useCallback(e => {
    setInput(e.target.value);
  }, []);
  const onChangePoint = useCallback(e => {
    setPoint(e.target.value);
  }, []);

  
  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      // onChangeField({ key: 'score', value: e.target.value });
      // insertCriteria(input.trim());

      if(point==0){
        setErrorMsg("점수를 입력해 주세요.");
        setErrorModal(true);
        return;
      }
      insertCriteria({ point: point, text: input.trim() });
      setInput('');
      setPoint(0);
    },
    [input, insertCriteria],
  );

  const handleFocus = e => {
    e.target.select();
  };

  useEffect(() => {
    if (criterias !== undefined) {
      // ?
      setLocalCriterias(criterias);
    }
  }, [criterias]);

  return (
    <CriteriaInputBoxBlock>
      <h4>채점 기준</h4>
      <CriteriaForm onSubmit={onSubmit}>
        <div>평가 점수 :</div>

        <InputItemPoint
          type="number"
          min="0"
          // todo: max
          onFocus={handleFocus}
          value={point}
          onChange={onChangePoint}
        />
        <div>평가 기준 :</div>
        <InputItemCriteria
          onFocus={handleFocus}
          placeholder="평가 기준을 입력하세요"
          value={input}
          onChange={onChange}
        />
        <button type="submit">추가</button>
      </CriteriaForm>
      <CriteriaList criterias={localCriterias} onRemove={onRemove} />
      <AskModal 
        visible={errorModal}
        title={"입력오류"}
        description={errorMsg}
        onConfirm={onErrorConfirm}
        showCancel={false}
        />
    </CriteriaInputBoxBlock>
  );
};

export default CriteriaInputBox;
