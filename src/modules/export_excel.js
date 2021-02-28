import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';

import { takeLatest } from 'redux-saga/effects';
import * as exportAPI from '../lib/api/export';

const INITIALIZE = 'exportExcel/INITIALIZE';
export const initializeExport = createAction(INITIALIZE);

const [
  EXPORT_EXCEL,
  EXPORT_EXCEL_SUCCESS,
  EXPORT_EXCEL_FAILURE,
] = createRequestActionTypes('exportExcel/EXPORT');

const UNLOAD_FILE_INFO = 'exportExcel/UNLOAD_FILE_INFO'; // 페이지 벗어날때 데이터 비우기

export const unloadFileInfo = createAction(UNLOAD_FILE_INFO);

export const exportExcel = createAction(EXPORT_EXCEL, ({ testName }) => ({
  testName,
}));

const exportExcelSaga = createRequestSaga(EXPORT_EXCEL, exportAPI.exportExcel);

export function* exportSaga() {
  yield takeLatest(EXPORT_EXCEL, exportExcelSaga);
}

const initialExportExcel = {
  fileName: null,
  error: null,
};

const export_excel = handleActions(
  {
    [INITIALIZE]: state => initialExportExcel,
    [EXPORT_EXCEL_SUCCESS]: (state, { payload: fileName }) => ({
      ...state,
      fileName,
    }),
    [EXPORT_EXCEL_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UNLOAD_FILE_INFO]: () => initialExportExcel,
  },
  initialExportExcel,
);

export default export_excel;
