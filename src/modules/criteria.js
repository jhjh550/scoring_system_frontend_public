import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as criteriaAPI from '../lib/api/criteria';
import { takeLatest } from 'redux-saga/effects';

const INITIALIZE = 'criteria/INITIALIZE'; // 모든 내용 초기화
const SET_CRITERIA = 'criteria/SET_CRITERIA';
const CHANGE_FILED = 'criteria/CHANGE_FILED'; // 특정 key 값 바꾸기
const CHANGE_QUESTION = 'criteria/CHANGE_QUESTION';

const [
  UPDATE_CRITERIA,
  UPDATE_CRITERIA_SUCCESS,
  UPDATE_CRITERIA_FAILURE,
] = createRequestActionTypes('criteria/UPDATE_CRITERIA');

export const updateCriteria = createAction(
  UPDATE_CRITERIA,
  ({ criteriaId, question, details }) => ({
    criteriaId,
    question,
    details,
  }),
);

const updateCriteriaSaga = createRequestSaga(
  UPDATE_CRITERIA,
  criteriaAPI.updateCriteria,
);

const [
  WRITE_CRITERIA,
  WRITE_CRITERIA_SUCCESS,
  WRITE_CRITERIA_FAILURE,
] = createRequestActionTypes('criteria/WRITE_CRITERIA'); // 채점기준 작성

export const initialize = createAction(INITIALIZE);
export const setCriteria = createAction(SET_CRITERIA, ({ criteria }) => ({
  criteria,
}));
export const changeField = createAction(CHANGE_FILED, ({ key, value }) => ({
  key,
  value,
}));
export const changeQuestionAction = createAction(
  CHANGE_QUESTION,
  ({ key, value }) => ({
    key,
    value,
  }),
);
export const writeCriteriaAction = createAction(
  WRITE_CRITERIA,
  ({ question, details }) => ({
    question,
    details,
  }),
);

const writeCriteriaRequestSaga = createRequestSaga(
  WRITE_CRITERIA,
  criteriaAPI.writeCriteria,
);
export function* writeCriteriaSaga() {
  yield takeLatest(WRITE_CRITERIA, writeCriteriaRequestSaga);
  yield takeLatest(UPDATE_CRITERIA, updateCriteriaSaga);
}

const [
  READ_CRITERIA,
  READ_CRITERIA_SUCCESS,
  READ_CRITERIA_FAILURE,
] = createRequestActionTypes('criteria/READ_CRITERIA');

const UNLOAD_CRITERIA = 'criteria/UNLOAD_CRITERIA'; // 페이지 벗어날 때 데이터 비우기

export const readCriteriaAction = createAction(READ_CRITERIA, id => id);
export const unloadCriteriaAction = createAction(UNLOAD_CRITERIA);

const readCriteriaRequestSaga = createRequestSaga(
  READ_CRITERIA,
  criteriaAPI.readCriteria,
);
export function* readCriteriaSaga() {
  yield takeLatest(READ_CRITERIA, readCriteriaRequestSaga);
}

const initialState = {
  question: {
    no: 0,
    score: 0,
    testinfoId: '',
    testName: '',
    area: {
      xPox: 0,
      yPos: 0,
      width: 0,
      height: 0,
      imgFileName: '',
    },
  },
  details: [],
  criteriaReceived: null,
  criteriaError: null,
};

const criteria = handleActions(
  {
    [INITIALIZE]: state => initialState,
    [SET_CRITERIA]: (state, { payload: { criteria } }) => ({
      ...criteria,
    }),
    [CHANGE_FILED]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
    [CHANGE_QUESTION]: (state, { payload: { key, value } }) => ({
      ...state,
      question: {
        ...state.question,
        [key]: value,
      },
    }),
    [UPDATE_CRITERIA]: state => ({
      ...state,
      criteriaReceived: null,
      criteriaError: null,
    }),
    [UPDATE_CRITERIA_SUCCESS]: (state, { payload: criteriaReceived }) => ({
      ...state,
      criteriaReceived,
    }),
    [UPDATE_CRITERIA_FAILURE]: (state, { payload: criteriaError }) => ({
      ...state,
      criteriaError,
    }),
    [WRITE_CRITERIA]: state => ({
      ...state,
      criteriaReceived: null,
      criteriaError: null,
    }),
    [WRITE_CRITERIA_SUCCESS]: (state, { payload: criteriaReceived }) => ({
      ...state,
      criteriaReceived,
    }),
    [WRITE_CRITERIA_FAILURE]: (state, { payload: criteriaError }) => ({
      ...state,
      criteriaError,
    }),
    [READ_CRITERIA_SUCCESS]: (state, { payload: criteriaReceived }) => ({
      ...state,
      criteriaReceived,
    }),
    [READ_CRITERIA_FAILURE]: (state, { payload: criteriaError }) => ({
      ...state,
      criteriaError,
    }),
    [UNLOAD_CRITERIA]: () => initialState,
  },
  initialState,
);
export default criteria;
