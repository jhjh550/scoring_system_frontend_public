import React, { useEffect, useCallback } from 'react';
import ScorerManageComponent from '../../components/score/ScorerManageComponent';
import { useDispatch, useSelector } from 'react-redux';
import { listTestinfo } from '../../modules/testinfos';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import {
  listCriteria,
  initializeList,
  changeCriterias,
  updateCriterias,
} from '../../modules/criterias';

const ScorerManageContainer = ({ location }) => {
  const dispatch = useDispatch();
  const {
    testinfos,
    criterias,
    loading,
    changedCriterias,
    criteriasResult,
  } = useSelector(({ testinfos, criterias, loading }) => ({
    testinfos: testinfos.testinfos,
    criterias: criterias.criterias,
    changedCriterias: criterias.changedCriterias,
    criteriasResult: criterias.result,
    loading: loading['scores/LIST_SCORE'],
  }));

  useEffect(() => {
    const { page } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    dispatch(listTestinfo({ page }));
    return () => {
      dispatch(initializeList());
    };
  }, [location.search]);

  // useEffect(() => {
  //   dispatch(initializeList());
  // }, [criteriasResult]);

  const onTestNameChange = useCallback(
    payload => dispatch(listCriteria(payload)),
    [dispatch],
  );

  const onScorerInfoChange = useCallback(
    payload => {
      dispatch(changeCriterias(payload));
    },
    [dispatch],
  );

  const onInitializeCriteriaList = () => {
    dispatch(initializeList());
  };

  const onUpdateCriteriaList = useCallback(
    payload => dispatch(updateCriterias(payload)),
    [dispatch],
  );

  return (
    <ScorerManageComponent
      testinfos={testinfos}
      loading={loading}
      criterias={criterias}
      changedCriterias={changedCriterias}
      criteriasResult={criteriasResult}
      onTestNameChange={onTestNameChange}
      onScorerInfoChange={onScorerInfoChange}
      onInitializeCriteriaList={onInitializeCriteriaList}
      onUpdateCriteriaList={onUpdateCriteriaList}
    />
  );
};

export default withRouter(ScorerManageContainer);
