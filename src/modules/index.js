import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import loading from './loading';
import user, { userSaga } from './user';
import criteria, { writeCriteriaSaga, readCriteriaSaga } from './criteria';
import criterias, { criteriasSage } from './criterias';
import testinfos, { listTestinfoRequestSaga } from './testinfos';
import testinfo, { testInfoSaga } from './testinfo';
import testinfo_update, { testinfoUpdateSaga } from './testinfo_update';
import score, { scoreSaga } from './score';
import scores, { scoreListSaga } from './scores';
import stat, { statSaga } from './stat';
import export_excel, { exportSaga } from './export_excel';

const rootReducer = combineReducers({
  auth,
  loading,
  user,
  criteria,
  criterias,
  testinfos,
  testinfo,
  testinfo_update,
  score,
  scores,
  stat,
  export_excel,
});

export function* rootSaga() {
  yield all([
    authSaga(),
    userSaga(),
    writeCriteriaSaga(),
    readCriteriaSaga(),
    criteriasSage(),
    listTestinfoRequestSaga(),
    testInfoSaga(),
    testinfoUpdateSaga(),
    scoreSaga(),
    scoreListSaga(),
    statSaga(),
    exportSaga(),
  ]);
}

export default rootReducer;
