import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  initialize,
  readScore,
  unloadScore,
  changeDetails,
  update,
} from '../../modules/score';
import ScoreComponent from '../../components/score/ScoreComponent';
import * as scoreAPI from '../../lib/api/score';

const ScoreContainer = ({ match }) => {
  const { testName } = match.params;

  const dispatch = useDispatch();
  const { score, scoreReceived, error, loading } = useSelector(
    ({ score, loading }) => ({
      score: score.score,
      scoreReceived: score.scoreReceived,
      error: score.error,
      loading: loading['score/READ_SCORE'],
    }),
  );

  useEffect(() => {
    dispatch(readScore({ testName }));
  }, [dispatch]);

  useEffect(() => {}, [scoreReceived]);

  useEffect(() => {}, [error]);

  useEffect(() => {
    dispatch(initialize());
    return () => {
      dispatch(unloadScore());
    };
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    onUpdate({ ...score, state: 2 });
    // scoreAPI.update({ ...score, state: 2 });
  };

  const onMoveNextScore = () => {
    alert('todo: onMoveNext');
  };

  const onMovePrevScore = () => {
    alert('todo: onMovePrev');
  };

  const onMoveListScore = () => {
    alert('todo : onMoveList');
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
      score={score}
      error={error}
      loading={loading}
      onSubmit={onSubmit}
      onChangeDetails={onChangeDetails}
      onChangeDetails={onChangeDetails}
      onMoveNextScore={onMoveNextScore}
      onMovePrevScore={onMovePrevScore}
      onMoveListScore={onMoveListScore}
    />
  );
};

export default withRouter(ScoreContainer);
