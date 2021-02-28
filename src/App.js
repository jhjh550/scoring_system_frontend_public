import React from 'react';
import { Route } from 'react-router-dom';
import CriteriaListPage from './pages/CriteriaListPage';
import CriteriaPage from './pages/CriteriaPage';
import CriteriaWritePage from './pages/CriteriaWritePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ReadCriteriaPage from './pages/ReadCriteriaPage';
import TestInfoListPage from './pages/TestInfoListPage';
import TestScoreListPage from './pages/TestScoreListPage';
import ScorePage from './pages/ScorePage';
import ScoredListPage from './pages/ScoredListPage';
import ScoreEditPage from './pages/ScoreEditPage';
import StartPage from './pages/StartPage';
import ScorerManagePage from './pages/ScorerManagePage';
import ScoreMyListPage from './pages/ScoreMyListPage';
import ScoreMyCriteriaListPage from './pages/ScoreMyCriteriaListPage';
import ScoreResultListPage from './pages/ScoreResultListPage';
import ScoreResultPage from './pages/ScoreResultPage';
import { Helmet } from 'react-helmet-async';

function App() {
  return (
    <>
      <Helmet>
        <title>채점관리 시스템</title>
      </Helmet>
      <Route component={StartPage} path={['/']} exact />
      <Route component={ScoreResultListPage} path={['/scoreResultList']} />
      <Route component={ScoreResultPage} path={['/scoreResult/:testName']} />
      <Route component={TestScoreListPage} path={['/testscorelist']} />
      <Route component={ScoredListPage} path={['/scoredlist']} />
      <Route component={ScoreEditPage} path={['/scoreEditPage']} />
      <Route component={TestInfoListPage} path={['/testlist']} exact />
      <Route component={ScorerManagePage} path={['/scorerList']} exact />
      <Route
        component={CriteriaListPage}
        path={['/listCriteria/:testinfoId']}
        exact
      />
      <Route component={LoginPage} path={'/login'} />
      <Route component={RegisterPage} path={'/register'} />
      <Route
        component={CriteriaWritePage}
        path={'/writeCriteria/:testinfoId'}
      />
      <Route component={CriteriaPage} path={'/@:username/:criteriaId'} />
      <Route component={ReadCriteriaPage} path={'/readCriteria/:criteriaId'} />
      <Route component={ScorePage} path={'/score/:testName'} />
      <Route component={ScoreMyListPage} path={'/scoremylist/:testName'} />
      {/* <Route
        component={ScoreMyCriteriaListPage} // 이 페이지는 사용되고 있는데가 없는듯?
        path={'/scoremycriterialist'}
      /> */}
    </>
  );
}

export default App;
