import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import ScoredListContainer from '../containers/score/ScoredListContainer';
import PaginationContainer from '../containers/score/PaginationContainer';

const ScoredListPage = () => {
  return (
    <div>
      <HeaderContainer />
      <ScoredListContainer />
      <PaginationContainer />
    </div>
  );
};

export default ScoredListPage;
