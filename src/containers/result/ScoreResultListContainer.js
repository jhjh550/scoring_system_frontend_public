import React, { useEffect } from 'react';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import { listTestinfo } from '../../modules/testinfos';
import { useDispatch, useSelector } from 'react-redux';
import ScoreResultListComponent from '../../components/result/ScoreResultListComponent';

const ScoreResultListContainer = ({ location }) => {
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
    <div>
      <ScoreResultListComponent
        testinfos={testinfos}
        error={error}
        loading={loading}
      />
    </div>
  );
};

export default withRouter(ScoreResultListContainer);
