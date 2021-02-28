import React, { useRef } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const CriteriaItemBlock = styled.div`
  padding: 1rem;
  border-top: 1px solid ${palette.gray[3]};
  background: ${palette.gray[1]};
  &:hover {
    background: ${palette.cyan[1]};
  }
`;

const ScoreCriteriaItem = ({ detail, onChangeItem }) => {
  const inputRef = useRef(null);

  const onItemClick = () => {
    const toggleValue = !inputRef.current.checked;
    inputRef.current.checked = toggleValue;
    var changeDetail = detail;
    changeDetail.correct = toggleValue;

    onChangeItem(changeDetail);
  };

  const onChange = e => {
    console.log('onChange', e.target);
    const toggleValue = !e.target.checked;
    console.log('toggle', toggleValue);
    inputRef.current.checked = toggleValue;
    var changeDetail = detail;
    changeDetail.correct = toggleValue;

    onChangeItem(changeDetail);
  };

  return (
    <CriteriaItemBlock onClick={onItemClick}>
      <input
        ref={inputRef}
        type="checkbox"
        checked={detail.correct}
        onChange={onChange}
      />
      {detail.criteria}
    </CriteriaItemBlock>
  );
};

export default ScoreCriteriaItem;
