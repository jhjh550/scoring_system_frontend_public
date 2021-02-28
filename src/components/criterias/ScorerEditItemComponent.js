import React, { useRef } from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';

const CriteriaItemBlock = styled.div`
  display: flex;
  padding: 0.5rem;
  border-top: 1px solid ${palette.gray[3]};
  &:hover {
    cursor: pointer;
    background: ${palette.cyan[1]};
  }
  ${props =>
    props.active &&
    css`
      background: ${palette.gray[3]};
    `}
`;

const DescBlock = styled.div`
  width: 100%;
  display: flex;
`;

const CheckBoxBlock = styled.div`
  width: 15px;
  margin-right: 10px;
`;

const QuestionNoBlock = styled.div`
  width: 100px;
`;

const QuestionScoreBlock = styled.div`
  width: 50px;
`;

const DetailsBlock = styled.div`
  flex: 1;
`;
const DetailItemBlock = styled.div`
  text-align: left;
  margin-right: 0.25rem;
  overflow: none;
`;

const ScorerEditItemComponent = ({
  criteria,
  selectedScorer,
  onCheckedChange,
}) => {
  const inputRef = useRef(null);
  const isAuth = () => {
    return criteria.scoreAuth.some(auth => auth._id === selectedScorer._id);
  };

  const onChange = () => {
    const newCriteria = { ...criteria };

    if (inputRef.current.checked) {
      newCriteria.scoreAuth.push(selectedScorer);
    } else {
      newCriteria.scoreAuth = newCriteria.scoreAuth.filter(
        auth => auth._id !== selectedScorer._id,
      );
    }
    console.log('newCriteria', newCriteria);
    onCheckedChange(newCriteria);
  };

  const onItemClick = () => {
    inputRef.current.checked = !inputRef.current.checked;
    onChange();
  };

  return (
    <CriteriaItemBlock active={criteria.scoreAuth.length > 0}>
      <CheckBoxBlock>
        <input
          ref={inputRef}
          id={criteria._id}
          type="checkbox"
          checked={isAuth()}
          onChange={onChange}
        />
      </CheckBoxBlock>
      <DescBlock onClick={onItemClick}>
        <QuestionNoBlock>{criteria.question.no}번</QuestionNoBlock>
        <QuestionScoreBlock>{criteria.question.score}점</QuestionScoreBlock>
        <DetailsBlock>
          {criteria.details.map((detail, index) => (
            <DetailItemBlock key={index}>
              {index + 1}. {detail.text}
            </DetailItemBlock>
          ))}
        </DetailsBlock>
      </DescBlock>
    </CriteriaItemBlock>
  );
};

export default ScorerEditItemComponent;
