import React, { useEffect, useCallback } from 'react';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TestInfoListComponent from '../../components/testinfo/TestInfoListComponent';
import { listTestinfo, deleteAllDataAction, generateTestInfo, generateEmptyScoreInfo } from '../../modules/testinfos';

import {
  setTestinfo,
  changeField,
  initialize,
  writeTestinfoAction,
  deleteTestinfoAction,
} from '../../modules/testinfo';
import {
  initializeUpdateAction,
  changeUpdateFieldAction,
  setUpdateTestinfoAction,
  updateTestinfoAction,
} from '../../modules/testinfo_update';

const TestInfoListContainer = ({ location }) => {
  const dispatch = useDispatch();
  const {
    testinfo,
    testinfos,
    testinfo_update,
    error,
    loading,
    user,
    lastGeneratedScore
  } = useSelector(
    ({ testinfo, testinfos, testinfo_update, loading, user }) => ({
      testinfo: testinfo,
      testinfos: testinfos.testinfos,
      testinfo_update: testinfo_update,
      error: testinfos.error,
      loading: loading['testinfo/LIST_TESTINFO'],
      user: user.user,
      lastGeneratedScore: testinfos.score
    }),
  );

  const onChangeField = useCallback(payload => dispatch(changeField(payload)), [
    dispatch,
  ]);
  const onChangeUpdateField = useCallback(
    payload => dispatch(changeUpdateFieldAction(payload)),
    [dispatch],
  );
  const onSetUpdateInfo = useCallback(
    payload => {
      dispatch(setUpdateTestinfoAction(payload));
    },
    [dispatch],
  );
  const onSetTestInfo = useCallback(
    payload => {
      dispatch(setTestinfo(payload));
    },
    [dispatch],
  );

  const onGenerateEmptyScoreInfo = () =>{
    dispatch(generateEmptyScoreInfo())
  }
  const onGenerateTestInfo = () =>{
    dispatch(generateTestInfo());
  }
  const onDeleteAllData = () => {
    dispatch(deleteAllDataAction());
  };
  const onPublish = () => {
    dispatch(writeTestinfoAction(testinfo));
  };
  const onUpdate = () => {
    const { _id, testName, testCode, testDate } = testinfo_update;
    dispatch(
      updateTestinfoAction({ testinfoId: _id, testName, testCode, testDate }),
    );
  };
  const onRemove = testinfoId => {
    dispatch(deleteTestinfoAction(testinfoId));
  };

  /**
   * status 변경은 delete 에서만 사용하는 중
   */
  useEffect(() => {
    const { page } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    dispatch(initialize());
    dispatch(listTestinfo({ page }));
    if (testinfo.testinfoError) {
      console.log(testinfo.testinfoError);
    }
  }, [
    location.search,
    testinfo.testinfoReceived,
    testinfo.testinfoError,
    testinfo.status,
  ]);

  useEffect(() => {
    if (!testinfo_update.testinfoReceived) {
      return;
    }
    const { page } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });

    dispatch(listTestinfo({ page }));
    if (testinfo_update.testinfoError) {
      console.log(testinfo_update.testinfoError);
    }
  }, [testinfo_update.testinfoReceived, testinfo_update.testinfoError]);

  return (
    <>
      <TestInfoListComponent
        onGenerateEmptyScoreInfo={onGenerateEmptyScoreInfo}
        onGenerateTestInfo={onGenerateTestInfo}
        onDeleteAllData={onDeleteAllData}
        onRemove={onRemove}
        onPublish={onPublish}
        onChangeField={onChangeField}
        loading={loading}
        error={error}
        onSetTestInfo={onSetTestInfo}
        onSetUpdateInfo={onSetUpdateInfo}
        onUpdate={onUpdate}
        onChangeUpdateField={onChangeUpdateField}
        testinfos={testinfos}
        testinfo_update={testinfo_update}
        user={user}
        lastGeneratedScore={lastGeneratedScore}
      />
    </>
  );
};

export default withRouter(TestInfoListContainer);
