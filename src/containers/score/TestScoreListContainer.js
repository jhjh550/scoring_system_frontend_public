import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import { listTestinfo } from '../../modules/testinfos';
import TestScoreListComponent from '../../components/score/TestScoreListComponent';
const TestScoreListContainer = ({ location }) => {
  const dispatch = useDispatch();
  const { testinfos, error, loading } = useSelector(
    ({ testinfos, loading }) => ({
      testinfos: testinfos.testinfos,
      error: testinfos.error,
      loading: loading['testinfo/LIST_TESTINFO'],
    }),
  );

  useEffect(() => {
    const { page } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });

    dispatch(listTestinfo({ page }));
  }, [location.search]);

  return (
    <TestScoreListComponent
      testinfos={testinfos}
      error={error}
      loading={loading}
    />
  );
};

export default withRouter(TestScoreListContainer);
