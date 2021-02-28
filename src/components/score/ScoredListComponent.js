import React from 'react';
import ScoreItemComponent from './ScoreItemComponent';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';
import { MdHome } from 'react-icons/md';

import {
  ScoredItemBlock,
  QuestionNoBlock,
  TestNameBlock,
  QuestionStateBlock,
  CriteriasBlock,
  ScoreListWrapper,
} from './Common/ScoreBlocks';

const ProgressDiv = styled.div`
  margin: 8px;
  align-items: center;
  display: flex;
  font-size: 1.125rem;
  font-weight: 500;
  letter-spacing: 2px;
`;

const LocalNavBar = styled.div`
  margin-top: 8px;
  margin-bottom: 4px;
  border-radius: 4px;
  height: 2.75rem;
  display: flex;
  justify-content: space-between;
  background: ${palette.gray[2]};
`;

const BreadCrumb = styled.div`
  display: flex;
  align-items: center;
`;
const BreadCrumbItem = styled.div`
  font-size: 1.15rem;
  font-weight: bold;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  color: ${palette.cyan[6]};
  &:hover {
    cursor: pointer;
    color: ${palette.cyan[9]};
  }
`;
const BreadCrumbHomeItem = styled(BreadCrumbItem)`
  font-size: 1.5rem;
`;
const BreadCrumbItemSeperator = styled.div`
  font-size: 1rem;
  font-weight: bold;
`;

const ScoredListComponent = ({
  testName,
  scores,
  onReadScoreData,
  notProcessedCount,
  processCount,
  doneCount,
}) => {
  const scoreMyListPath = `/scoremylist/${testName}`;

  var strCount = '';
  if (notProcessedCount) {
    strCount =
      '총 문제수 : ' +
      (doneCount + processCount + notProcessedCount) +
      ' / 처리완료 : ' +
      doneCount +
      ' / 처리중 : ' +
      processCount +
      ' / 미처리 : ' +
      notProcessedCount;
  }
  return (
    <ScoreListWrapper>
      <LocalNavBar>
          <BreadCrumb>
            <BreadCrumbHomeItem>
              <Link to="/testscorelist">
                <MdHome />
              </Link>
            </BreadCrumbHomeItem>
            <BreadCrumbItemSeperator>/</BreadCrumbItemSeperator>
            <BreadCrumbItem>
              <Link to={scoreMyListPath}>{testName}</Link>
            </BreadCrumbItem>
          </BreadCrumb>
        </LocalNavBar>

      <ProgressDiv>{strCount}</ProgressDiv>
      <ScoredItemBlock done>
        <QuestionNoBlock>문제번호</QuestionNoBlock>
        <TestNameBlock>문제지번호</TestNameBlock>
        <QuestionStateBlock>상태</QuestionStateBlock>
        <CriteriasBlock>채점기준</CriteriasBlock>
      </ScoredItemBlock>
      {scores &&
        scores.map(score => (
          <ScoreItemComponent
            key={score._id}
            score={score}
            onReadScoreData={onReadScoreData}
          />
        ))}
    </ScoreListWrapper>
  );
};

export default ScoredListComponent;
