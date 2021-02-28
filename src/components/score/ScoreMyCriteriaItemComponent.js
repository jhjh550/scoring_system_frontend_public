import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import qs from 'qs';

import {
  ScoredItemBlock,
  QuestionNoBlock,
  TestNameBlock,
  QuestionStateBlock,
  CriteriasBlock,
} from './Common/ScoreBlocks';

const CriteriaBlock = styled.div`
  display: flex;
`;
const CriteriaSubItemBlock = styled.div`
  width: 100px;
`;
const CriteriaDetilasBlock = styled.div`
  flex: 1;
`;

const ScoreMyCriteriaItemComponent = ({ criteria, testName, user, stat }) => {
  const getCriteriaStrings = criteria => {
    var res = '';
    for (const detail of criteria.details) {
      res += detail.text + ' / ';
    }
    return res;
  };

  const linkPath = `/scoredlist/?${qs.stringify({
    testName,
    scoreAuth: user.username,
    questionNo: criteria.question.no,
  })}`;

  var statStr = '';
  if (stat !== null) {
    for (const statItem of stat) {
      if (statItem.questionNo === criteria.question.no) {
        statStr = statItem.done + ' / ' + statItem.total;
      }
    }
  }

  return (
    <Link to={linkPath}>
      <ScoredItemBlock>
        <QuestionNoBlock>{criteria.question.no}</QuestionNoBlock>
        <CriteriasBlock>{getCriteriaStrings(criteria)}</CriteriasBlock>
        <div>{statStr}</div>
      </ScoredItemBlock>
    </Link>
  );
};

export default ScoreMyCriteriaItemComponent;
