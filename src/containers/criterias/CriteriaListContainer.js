import React, { useEffect, useCallback } from 'react';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CriteriaList from '../../components/criterias/CriteriaList';
import { listCriteria, initializeList } from '../../modules/criterias';
import { setCriteria } from '../../modules/criteria';

const CriteriaListContainer = ({ location, match }) => {
  const { testinfoId } = match.params;
  const dispatch = useDispatch();
  const { criterias, error, loading, user } = useSelector(
    ({ criterias, loading, user }) => ({
      criterias: criterias.criterias,
      error: criterias.error,
      loading: loading['criterias/LIST_CRITERIA'],
      user: user.user,
    }),
  );
  useEffect(() => {
    const { page } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    dispatch(listCriteria({ testinfoId, page }));
    return () => {
      console.log('initilaize list');
      dispatch(initializeList());
    };
  }, [location.search]); // dispatch

  const onReload = () => {
    window.location.reload(true);
  };

  const onTempChangeField = useCallback(
    payload => dispatch(setCriteria(payload)),
    [dispatch],
  );

  return (
    <CriteriaList
      testinfoId={testinfoId}
      loading={loading}
      error={error}
      criterias={criterias}
      showWriteButton={user}
      onReload={onReload}
      onTempChangeField={onTempChangeField}
    />
  );
};

export default withRouter(CriteriaListContainer);
