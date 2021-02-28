import React from 'react';
import Pagination from '../../components/score/Pagination';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import qs from 'qs';

const PaginationContainer = ({ location }) => {
  const { lastPage, scores, loading } = useSelector(({ scores, loading }) => ({
    lastPage: scores.lastPage,
    scores: scores.scores,
    loading: loading['scores/LIST_SCORE'],
  }));

  // 데이터가 없거나 로딩 중이면 아무것도 보여주지 않음
  if (!scores || loading) return null;

  // page 가 없으면 1을 기본값으로 사용
  const { page = 1 } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  return (
    <Pagination
      page={parseInt(page, 10)}
      lastPage={lastPage}
      search={location.search}
    />
  );
};

export default withRouter(PaginationContainer);
