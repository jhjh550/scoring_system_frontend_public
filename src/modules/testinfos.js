import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as testinfoAPI from '../lib/api/testinfo';
import { takeLatest } from 'redux-saga/effects';

const [
  LIST_TESTINFO,
  LIST_TESTINFO_SUCCESS,
  LIST_TESTINFO_FAILURE,
] = createRequestActionTypes('testinfo/LIST_TESTINFO');

export const listTestinfo = createAction(LIST_TESTINFO, ({ page }) => ({
  page,
}));

const listTestinfoSaga = createRequestSaga(
  LIST_TESTINFO,
  testinfoAPI.listTestInfo,
);

const [
  GENERATE_EMPTY_SCORE_INFO,
  GENERATE_EMPTY_SCORE_INFO_SUCCESS,
  GENERATE_EMPTY_SCORE_INFO_FAILURE,
] = createRequestActionTypes('testinfo/GENERATE_EMPTY_SCORE_INFO');

export const generateEmptyScoreInfo = createAction(GENERATE_EMPTY_SCORE_INFO);
const generateEmptyScoreInfoRequestSage = createRequestSaga(
  GENERATE_EMPTY_SCORE_INFO,
  testinfoAPI.generateEmptyScoreInfo,
)

const [GENERATE_TEST_INFO,
  GENERATE_TEST_INFO_SUCCESS,
  GENERATE_TEST_INFO_FAILURE,
] = createRequestActionTypes('testinfo/GENERATE_TEST_INFO');

export const generateTestInfo = createAction(GENERATE_TEST_INFO);

const generateTestInfoRequestSage = createRequestSaga(
  GENERATE_TEST_INFO,
  testinfoAPI.generateTestInfo,
)

const [
  DELETE_ALL_DATA,
  DELETE_ALL_DATA_SUCCESS,
  DELETE_ALL_DATA_FAILURE,
] = createRequestActionTypes('testinfo/DELETE_ALL_DATA');

export const deleteAllDataAction = createAction(DELETE_ALL_DATA);

const deleteAllDataRequestSaga = createRequestSaga(
  DELETE_ALL_DATA,
  testinfoAPI.deleteAllData,
);

export function* listTestinfoRequestSaga() {
  yield takeLatest(LIST_TESTINFO, listTestinfoSaga);
  yield takeLatest(DELETE_ALL_DATA, deleteAllDataRequestSaga);
  yield takeLatest(GENERATE_TEST_INFO, generateTestInfoRequestSage);
  yield takeLatest(GENERATE_EMPTY_SCORE_INFO, generateEmptyScoreInfoRequestSage);
}

const initialState = {
  testinfos: null,
  error: null,
  lastPage: 1,
};

const testinfos = handleActions(
  {
    [LIST_TESTINFO_SUCCESS]: (
      state,
      { payload: testinfos, meta: response },
    ) => ({
      ...state,
      testinfos,
      lastPage: parseInt(response.headers['last-page'], 10),
    }),
    [LIST_TESTINFO_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [GENERATE_TEST_INFO_SUCCESS]: (state, { payload: testinfos, meta: response },) => ({
      ...state,
      testinfos: testinfos,
      error: null,
    }),
    [GENERATE_TEST_INFO_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [GENERATE_EMPTY_SCORE_INFO_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      score: response,
      error: null,
    }),
    [GENERATE_EMPTY_SCORE_INFO_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: null,
    }),
    [DELETE_ALL_DATA_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      testinfos: null,
      error: null,
    }),
    [DELETE_ALL_DATA_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default testinfos;
