import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as scoreAPI from '../lib/api/score';
import { takeLatest } from 'redux-saga/effects';

const INITIALIZE = 'score/INITIALIZE';
export const initialize = createAction(INITIALIZE);

const CHANGE_FILED = 'score/CHANGE_FIELD';
const CHANGE_DETAILS = 'score/CHANGE_DETAILS';
export const changeDetails = createAction(CHANGE_DETAILS, ({ details }) => ({
  details,
}));

const [
  UPDATE_SCORE,
  UPDATE_SCORE_SUCCESS,
  UPDATE_SCORE_FAILURE,
] = createRequestActionTypes('score/UPDATE_SCORE');
export const update = createAction(UPDATE_SCORE, ({ score }) => ({ score }));
const updateSaga = createRequestSaga(UPDATE_SCORE, scoreAPI.update);

const [
  READ_SCORE,
  READ_SCORE_SUCCESS,
  READ_SCORE_FAILURE,
] = createRequestActionTypes('score/READ_SCORE');

const [
  READ_PREV_SCORE,
  READ_PREV_SCORE_SUCCESS,
  READ_PREV_SCORE_FAILURE,
] = createRequestActionTypes('score/READ_PREV_SCORE');

const UNLOAD_SCORE = 'score/UNLOAD_SCORE';

export const changeField = createAction(CHANGE_FILED, ({ key, value }) => ({
  key,
  value,
}));
export const readScore = createAction(READ_SCORE);
export const unloadScore = createAction(UNLOAD_SCORE);
const readScoreSaga = createRequestSaga(READ_SCORE, scoreAPI.read);

export const readPrevScore = createAction(READ_PREV_SCORE);
const readPrevScoreSaga = createRequestSaga(READ_PREV_SCORE, scoreAPI.prev);
export function* scoreSaga() {
  yield takeLatest(READ_SCORE, readScoreSaga);
  yield takeLatest(READ_PREV_SCORE, readPrevScoreSaga);
  yield takeLatest(UPDATE_SCORE, updateSaga);
}

const initialState = {
  score: null,
  scoreReceived: null,
  error: null,
  doneCount: 0,
};

const score = handleActions(
  {
    [INITIALIZE]: state => initialState,
    [CHANGE_DETAILS]: (state, { payload: details }) => ({
      ...state,
      score: {
        ...state.score,
        details: details.details,
      },
    }),
    [CHANGE_FILED]: (state, { payload: { key, value } }) => ({
      ...state,
      score: {
        ...state.score,
        [key]: value,
      },
    }),
    [READ_SCORE_SUCCESS]: (state, { payload: score, meta: response }) => ({
      ...state,
      score,
      scoreReceived: null,
      doneCount: parseInt(response.headers['done-count'], 0),
    }),
    [READ_SCORE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
      scoreReceived: null,
    }),
    [READ_PREV_SCORE_SUCCESS]: (state, { payload: score }) => ({
      ...state,
      score,
      scoreReceived: null,
    }),
    [READ_PREV_SCORE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
      scoreReceived: null,
    }),
    [UPDATE_SCORE]: state => ({
      ...state,

      error: null,
    }),
    [UPDATE_SCORE_SUCCESS]: (state, { payload: scoreReceived }) => ({
      ...state,
      scoreReceived,
      error: null,
    }),
    [UPDATE_SCORE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      scoreReceived: null,
      error,
    }),
    [UNLOAD_SCORE]: () => initialState,
  },
  initialState,
);

export default score;
