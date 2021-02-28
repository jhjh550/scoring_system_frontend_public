import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as criteriaAPI from '../lib/api/criteria';
import { takeLatest } from 'redux-saga/effects';

const INITIALIZE_LIST = 'criteria/INITIALIZE_LIST';
export const initializeList = createAction(INITIALIZE_LIST);

const CHANGE_CRITERIAS = 'criteria/CHANGE_CRITERIAS';
export const changeCriterias = createAction(
  CHANGE_CRITERIAS,
  ({ criterias, changedCriterias }) => ({
    criterias,
    changedCriterias,
  }),
);

const [
  LIST_CRITERIA,
  LIST_CRITERIA_SUCCESS,
  LIST_CRITERIA_FAILURE,
] = createRequestActionTypes('criteria/LIST_CRITERIA');

export const listCriteria = createAction(
  LIST_CRITERIA,
  ({ testinfoId, testName, page, userId, scoreAuth, questionNo }) => ({
    testinfoId,
    testName,
    page,
    userId,
    scoreAuth,
    questionNo,
  }),
);

const listCriteriaSaga = createRequestSaga(
  LIST_CRITERIA,
  criteriaAPI.listCriteria,
);

const [
  UPDATE_CRITERIAS,
  UPDATE_CRITERIAS_SUCCESS,
  UPDATE_CRITERIAS_FAILURE,
] = createRequestActionTypes('criteria/UPDATE_CRITERIAS');

export const updateCriterias = createAction(
  UPDATE_CRITERIAS,
  ({ criterias, changedCriterias }) => ({ criterias, changedCriterias }),
);

const updateCriteriasSaga = createRequestSaga(
  UPDATE_CRITERIAS,
  criteriaAPI.updateCriterias,
);

export function* criteriasSage() {
  yield takeLatest(LIST_CRITERIA, listCriteriaSaga);
  yield takeLatest(UPDATE_CRITERIAS, updateCriteriasSaga);
}

const initialState = {
  criterias: null,
  changedCriterias: null,
  result: null,
  error: null,
  lastPage: 1,
};

const criterias = handleActions(
  {
    [INITIALIZE_LIST]: state => initialState,
    [LIST_CRITERIA_SUCCESS]: (
      state,
      { payload: criterias, meta: response },
    ) => ({
      ...state,
      criterias,
      lastPage: parseInt(response.headers['last-page'], 10),
    }),
    [LIST_CRITERIA_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [CHANGE_CRITERIAS]: (state, { payload: criterias }) => ({
      ...state,
      criterias: criterias.criterias,
      changedCriterias: criterias.changedCriterias,
    }),
    [UPDATE_CRITERIAS_SUCCESS]: (state, { payload: result }) => ({
      ...state,
      result,
    }),
    [UPDATE_CRITERIAS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default criterias;
