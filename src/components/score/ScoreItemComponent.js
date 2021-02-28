import React from 'react';
import {
  ScoredItemBlock,
  QuestionNoBlock,
  TestNameBlock,
  QuestionStateBlock,
  CriteriasBlock,
} from './Common/ScoreBlocks';
import { Link } from 'react-router-dom';
import qs from 'qs';

const ScoreItemComponent = ({ score, onReadScoreData }) => {
  // const onItemClick = () => {
  //   // onReadScoreData({ testName: score.question.testName, scoreId: score._id });

  // };

  const { testName } = score.question;
  const scoreId = score._id;
  const linkPath = `/scoreEditPage/?${qs.stringify({ testName, scoreId })}`;

  const getStateString = score => {
    if (score.state === 0) {
      return '처리전';
    } else if (score.state === 1) {
      return '처리중';
    } else if (score.state === 2) {
      return '처리완료';
    }
  };

  const getCriteriaStrings = score => {
    var res = '';
    for (const detail of score.details) {
      res += detail.criteria + ' / ';
    }
    return res;
  };
  return (
    <>
      <Link to={linkPath}>
        <ScoredItemBlock
          before={score.state === 0}
          process={score.state === 1}
          done={score.state === 2}
        >
          <QuestionNoBlock>{score.question.questionNo}</QuestionNoBlock>
          <TestNameBlock>{score.question.testPaperNo}</TestNameBlock>
          <QuestionStateBlock>{getStateString(score)}</QuestionStateBlock>
          <CriteriasBlock>{getCriteriaStrings(score)}</CriteriasBlock>
        </ScoredItemBlock>
      </Link>
    </>
  );
};

export default ScoreItemComponent;
