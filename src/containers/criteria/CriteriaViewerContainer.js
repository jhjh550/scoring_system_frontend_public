import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  readCriteriaAction,
  unloadCriteriaAction,
} from '../../modules/criteria';
import CriteriaViewer from '../../components/criteria/CriteriaViewer';

const CriteriaViewerContainer = ({ match }) => {
  // 처음 마운트 될때 읽기 요청 api 호출
  const { criteriaId } = match.params;
  const dispatch = useDispatch();
  // const { criteria, error, loading } = useSelector(({ criteria, loading }) => ({
  //   criteria: criteria.criteria,
  //   error: criteria.error,
  //   loading: loading['criteria/READ_CRITERIA'],
  // }));
  const { criteria, error, loading } = useSelector(state => {
    return {
      criteria: state.criteria.criteriaReceived,
      error: state.criteria.criteriaError,
      loading: state.loading['criteria/READ_CRITERIA'],
    };
  });

  useEffect(() => {
    dispatch(readCriteriaAction(criteriaId));

    return () => {
      // 언마운트 될때 리덕스에서 데이터 없애기
      dispatch(unloadCriteriaAction());
    };
  }, [dispatch, criteriaId]);

  return <CriteriaViewer criteria={criteria} loading={loading} error={error} />;
};

export default withRouter(CriteriaViewerContainer);
