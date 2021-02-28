import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import { takeLatest } from 'redux-saga/effects';
import * as scoresAPI from '../lib/api/score';

const INITIALIZE_LIST = 'scores/INITIALIZE_LIST';
const CHANGE_SCORES = 'scores/CHANGE_SCORES';
export const initializeList = createAction(INITIALIZE_LIST);
export const changeScore = createAction(CHANGE_SCORES, ({ scores }) => ({
  scores,
}));

const [
  LIST_SCORE,
  LIST_SCORE_SUCCESS,
  LIST_SCORE_FAILURE,
] = createRequestActionTypes('criteria/LIST_SCORE');

export const listScores = createAction(LIST_SCORE, payload => payload);

const listScoreSaga = createRequestSaga(LIST_SCORE, scoresAPI.list);

export function* scoreListSaga() {
  yield takeLatest(LIST_SCORE, listScoreSaga);
}

const initialState = {
  scores: null,
  error: null,
  lastPage: 1,
  notProcessedCount: 0,
  processCount: 0,
  doneCount: 0,
};

const scores = handleActions(
  {
    [INITIALIZE_LIST]: state => initialState,
    [LIST_SCORE_SUCCESS]: (state, { payload: scores, meta: response }) => ({
      ...state,
      scores,
      lastPage: parseInt(response.headers['last-page'], 10),
      notProcessedCount: parseInt(response.headers['not-processed'], 0),
      processCount: parseInt(response.headers['process'], 0),
      doneCount: parseInt(response.headers['done'], 0),
    }),
    [LIST_SCORE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [CHANGE_SCORES]: (state, { payload: scores }) => ({
      ...state,
      scores: scores.scores,
    }),
  },
  initialState,
);

export default scores;
