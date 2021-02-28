import React, { useState, useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  initialize,
  readScore,
  readPrevScore,
  unloadScore,
  changeDetails,
  update,
} from '../../modules/score';
import ScoreComponent from '../../components/score/ScoreComponent';

import qs from 'qs';

const ScoreEditContainer = ({ location }) => {
  const {
    score,
    scoreReceived,
    liveDoneCount,
    doneCount,
    notProcessedCount,
    processCount,
    error,
    loading,
    user,
  } = useSelector(({ score, loading, user, scores }) => ({
    score: score.score,
    scoreReceived: score.scoreReceived,
    liveDoneCount: score.doneCount,
    doneCount: scores.doneCount,
    notProcessedCount: scores.notProcessedCount,
    processCount: scores.processCount,
    error: score.error,
    loading: loading['score/READ_SCORE'],
    user: user.user,
  }));

  const { testName, scoreId } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readScore({ testName, scoreId }));
  }, [location.search]);

  useEffect(() => {
    dispatch(initialize());
    return () => {
      dispatch(unloadScore());
    };
  }, []);

  // useEffect(() => {
  //   if (scoreReceived) {
  //     //history.goBack();
  //     // todo : 채점 완료 표시하기
  //   }
  // }, [scoreReceived]);

  const onSubmit = e => {
    e.preventDefault();
    console.log('update', score);
    if (score) {
      // alert 라도???
      onUpdate({ ...score, state: 2 });
    }

    // scoreAPI.update({ score: e });
  };

  const onMoveNextScore = () => {
    const questionNo = score.question.questionNo
    dispatch(readScore({ testName, questionNo }));
  };

  const onMovePrevScore = () => {
    dispatch(readPrevScore({ score }));
  };

  const onMoveListScore = () => {
    alert('todo : move list');
  };
  const onChangeDetails = useCallback(
    payload => dispatch(changeDetails(payload)),
    [dispatch],
  );

  const onUpdate = useCallback(
    payload => {
      dispatch(update({ score: payload }));
    },
    [dispatch],
  );

  return (
    <ScoreComponent
      user={user}
      testName={testName}
      score={score}
      error={error}
      scoreReceived={scoreReceived}
      liveDoneCount={liveDoneCount}
      doneCount={doneCount}
      totalCount={doneCount + notProcessedCount + processCount}
      loading={loading}
      onSubmit={onSubmit}
      onChangeDetails={onChangeDetails}
      onMoveNextScore={onMoveNextScore}
      onMovePrevScore={onMovePrevScore}
      onMoveListScore={onMoveListScore}
    />
  );
};

export default withRouter(ScoreEditContainer);
