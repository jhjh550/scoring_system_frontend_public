import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as testinfoAPI from '../lib/api/testinfo';
import { takeLatest } from 'redux-saga/effects';

const INITIALIZE = 'testinfo_update/INITIALIZE';
const CHANGE_FIELD = 'testinfo_update/CHANGE_FIELD';
const SET_TESTINFO = 'testinfo_update/SET_TESTINFO';

const [
  UPDATE_TESTINFO,
  UPDATE_TESTINFO_SUCCESS,
  UPDATE_TESTINFO_FAILURE,
] = createRequestActionTypes('testinfo_update/UPDATE_TESTINFO');

export const initializeUpdateAction = createAction(INITIALIZE);
export const setUpdateTestinfoAction = createAction(
  SET_TESTINFO,
  ({ testinfo_update }) => ({
    testinfo_update,
  }),
);
export const changeUpdateFieldAction = createAction(
  CHANGE_FIELD,
  ({ key, value }) => ({
    key,
    value,
  }),
);

export const updateTestinfoAction = createAction(
  UPDATE_TESTINFO,
  ({ testinfoId, testName, testCode, testDate }) => ({
    testinfoId,
    testName,
    testCode,
    testDate,
  }),
);

const updateTestInfoSaga = createRequestSaga(
  UPDATE_TESTINFO,
  testinfoAPI.updateTestInfo,
);

export function* testinfoUpdateSaga() {
  yield takeLatest(UPDATE_TESTINFO, updateTestInfoSaga);
}

const initialState = {
  testName: '',
  testCode: 0,
  testDate: null,
  testinfoReceived: null,
  testinfoError: null,
};

const testinfo_update = handleActions(
  {
    [INITIALIZE]: state => initialState,
    [SET_TESTINFO]: (state, { payload: { testinfo_update } }) => ({
      ...testinfo_update,
    }),
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
    [UPDATE_TESTINFO]: state => ({
      ...state,
      testinfoReceived: null,
      testinfoError: null,
    }),
    [UPDATE_TESTINFO_SUCCESS]: (state, { payload: testinfoReceived }) => ({
      ...state,
      testinfoReceived,
    }),
    [UPDATE_TESTINFO_FAILURE]: (state, { payload: testinfoError }) => ({
      ...state,
      testinfoError,
    }),
  },
  initialState,
);

export default testinfo_update;
