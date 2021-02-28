import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ScoreMyCriteriaComponent from '../../components/score/ScoreMyCriteriaComponent';
import { listCriteria } from '../../modules/criterias';
import { listStat } from '../../modules/stat';

const ScoreMyCriteriaListContainer = ({ match }) => {
  const { testName } = match.params;

  const dispatch = useDispatch();
  const { criterias, error, loading, stat, user } = useSelector(
    ({ criterias, loading, user, stat }) => ({
      criterias: criterias.criterias,
      error: criterias.error,
      loading: loading['criterias/LIST_CRITERIA'],
      user: user.user,
      stat: stat.stat,
    }),
  );

  useEffect(() => {
    if (user) {
      dispatch(listCriteria({ testName, userId: user._id }));
    }
  }, [user]);

  useEffect(() => {
    if (criterias === null) return;

    var questionNos = [];
    for (const criteria of criterias) {
      questionNos.push(criteria.question.no);
    }
    dispatch(listStat({ testName, scoreAuth: user.username, questionNos }));
  }, [criterias]);

  return (
    <ScoreMyCriteriaComponent
      user={user}
      testName={testName}
      criterias={criterias}
      stat={stat}
    />
  );
};

export default withRouter(ScoreMyCriteriaListContainer);
