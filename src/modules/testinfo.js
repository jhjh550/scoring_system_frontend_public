import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as testinfoAPI from '../lib/api/testinfo';
import { takeLatest } from 'redux-saga/effects';

const INITIALIZE = 'testinfo/INITIALIZE';
const CHANGE_FIELD = 'testinfo/CHANGE_FIELD';
const SET_TESTINFO = 'testinfo/SET_TESTINFO';

const [
  WRITE_TESTINFO,
  WRITE_TESTINFO_SUCCESS,
  WRITE_TESTINFO_FAILURE,
] = createRequestActionTypes('testinfo/WRITE_TESTINFO');

export const initialize = createAction(INITIALIZE);
export const setTestinfo = createAction(SET_TESTINFO, ({ testinfo }) => ({
  testinfo,
}));
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
export const writeTestinfoAction = createAction(
  WRITE_TESTINFO,
  ({ testName }) => ({
    testName,
  }),
);
const writeTestinfoRequestSaga = createRequestSaga(
  WRITE_TESTINFO,
  testinfoAPI.writeTestInfo,
);

const [
  READ_TESTINFO,
  READ_TESTINFO_SUCCESS,
  READ_TESTINFO_FAILURE,
] = createRequestActionTypes('testinfo/READ_TESTINFO');

const UNLOAD_TESTINFO = 'testinfo/UNLOAD_TESTINFO';

const [
  DELETE_TESTINFO,
  DELETE_TESTINFO_SUCCESS,
  DELETE_TESTINFO_FAILURE,
] = createRequestActionTypes('testinfo/DELETE_TESTINFO');

export const readTestinfoAction = createAction(READ_TESTINFO, id => id);
export const unloadTestinfoAction = createAction(UNLOAD_TESTINFO);
export const deleteTestinfoAction = createAction(DELETE_TESTINFO, id => id);

const readTestinfoRequestSaga = createRequestSaga(
  READ_TESTINFO,
  testinfoAPI.readTestInfo,
);

const deleteTestinfoRequestSaga = createRequestSaga(
  DELETE_TESTINFO,
  testinfoAPI.removeTestInfo,
);

export function* testInfoSaga() {
  yield takeLatest(WRITE_TESTINFO, writeTestinfoRequestSaga);
  yield takeLatest(READ_TESTINFO, readTestinfoRequestSaga);
  yield takeLatest(DELETE_TESTINFO, deleteTestinfoRequestSaga);
}

const initialState = {
  testName: '',
  testinfoReceived: null,
  testinfoError: null,
  status: 0,
};

const testinfo = handleActions(
  {
    [INITIALIZE]: state => initialState,
    [SET_TESTINFO]: (state, { payload: { testinfo } }) => ({
      ...testinfo,
    }),
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
    [WRITE_TESTINFO]: state => ({
      ...state,
      testinfoReceived: null,
      testinfoError: null,
    }),
    [WRITE_TESTINFO_SUCCESS]: (state, { payload: testinfoReceived }) => ({
      ...state,
      testinfoReceived,
    }),
    [WRITE_TESTINFO_FAILURE]: (state, { payload: testinfoError }) => ({
      ...state,
      testinfoError,
    }),
    [READ_TESTINFO_SUCCESS]: (state, { payload: testinfoReceived }) => ({
      ...state,
      testinfoReceived,
    }),
    [READ_TESTINFO_FAILURE]: (state, { payload: testinfoError }) => ({
      ...state,
      testinfoError,
    }),
    [DELETE_TESTINFO_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      status: response.status,
    }),
    [DELETE_TESTINFO_FAILURE]: (state, { payload: response }) => ({
      ...state,
      status: response.status,
    }),
    [UNLOAD_TESTINFO]: () => initialState,
  },
  initialState,
);

export default testinfo;
