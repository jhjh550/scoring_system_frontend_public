import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import score, { initialize, readScore } from '../../modules/score';
import { withRouter } from 'react-router-dom';
import { initializeList, listScores } from '../../modules/scores';
import ScoredListComponent from '../../components/score/ScoredListComponent';
import qs from 'qs';

const ScoredListContainer = ({ location }) => {
  const dispatch = useDispatch();
  const {
    scores,
    error,
    loading,
    notProcessedCount,
    processCount,
    doneCount,
    user,
  } = useSelector(({ scores, loading, user }) => ({
    scores: scores.scores,
    error: scores.error,
    notProcessedCount: scores.notProcessedCount,
    processCount: scores.processCount,
    doneCount: scores.doneCount,
    loading: loading['scores/LIST_SCORE'],
    user: user.user,
  }));

  const { page, testName, scoreAuth, questionNo } = qs.parse(
    location.search,
    {
      ignoreQueryPrefix: true,
    },
  );
  
  useEffect(() => {
    dispatch(initialize());
    dispatch(initializeList());
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [scores]);

  useEffect(
    () => {
      // const { page, testName, scoreAuth, questionNo } = qs.parse(
      //   location.search,
      //   {
      //     ignoreQueryPrefix: true,
      //   },
      // );

      if (scoreAuth) {
        console.log('12', scoreAuth, questionNo);
        dispatch(
          listScores({
            page,
            testName,
            scoreAuth,
            questionNo,
          }),
        );
      } else {
        dispatch(
          listScores({
            userId: user._id, //
            page,
            testName,
          }),
        );
      }
    },
    [location.search],
    [user],
  );

  const onReadScoreData = useCallback(payload => dispatch(readScore(payload)), [
    dispatch,
  ]);

  return (
    <ScoredListComponent
      testName={testName}
      scores={scores}
      onReadScoreData={onReadScoreData}
      notProcessedCount={notProcessedCount}
      processCount={processCount}
      doneCount={doneCount}
    />
  );
};

export default withRouter(ScoredListContainer);
