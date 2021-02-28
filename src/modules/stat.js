import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as statAPI from '../lib/api/stat';
import { takeLatest } from 'redux-saga/effects';

const INITIALIZE_STAT = 'stat/INITIALE_LIST';
export const initializeList = createAction(INITIALIZE_STAT);

const [
  LIST_STAT,
  LIST_STAT_SUCCESS,
  LIST_STAT_FAILURE,
] = createRequestActionTypes('stat/LIST_STAT');

const [
  TESTINFO_STAT,
  TESTINFO_STAT_SUCCESS,
  TESTINFO_STAT_FAILURE,
] = createRequestActionTypes('stat/TESTINFO_STAT');

export const listStat = createAction(
  LIST_STAT,
  ({ testName, scoreAuth, questionNos }) => ({
    testName,
    scoreAuth,
    questionNos,
  }),
);

const listStatSaga = createRequestSaga(LIST_STAT, statAPI.processedStat);

export const testInfoStat = createAction(TESTINFO_STAT, ({ testName }) => ({
  testName,
}));

const testInfoStatSaga = createRequestSaga(
  TESTINFO_STAT,
  statAPI.testInfoScoredStat,
);

export function* statSaga() {
  yield takeLatest(LIST_STAT, listStatSaga);
  yield takeLatest(TESTINFO_STAT, testInfoStatSaga);
}

const initialState = {
  stat: null,
  error: null,
};

const stat = handleActions(
  {
    [INITIALIZE_STAT]: state => initialState,
    [TESTINFO_STAT_SUCCESS]: (state, { payload: stat }) => ({
      ...state,
      stat,
    }),
    [TESTINFO_STAT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [LIST_STAT_SUCCESS]: (state, { payload: stat }) => ({
      ...state,
      stat,
    }),
    [LIST_STAT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default stat;
