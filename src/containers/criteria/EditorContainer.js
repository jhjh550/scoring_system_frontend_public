import React, { useEffect, useCallback } from 'react';
import Editor from '../../components/criteria/Editor';
import { useSelector, useDispatch } from 'react-redux';
import { changeQuestionAction, initialize } from '../../modules/criteria';
import { withRouter } from 'react-router-dom';

const EditorContainer = ({ match }) => {
  const { testinfoId } = match.params;

  const dispatch = useDispatch();
  const { criteria, testName } = useSelector(({ criteria, testinfo }) => ({
    criteria: criteria,
    testName: testinfo.testName,
  }));

  const onChangeField = useCallback(
    payload => dispatch(changeQuestionAction(payload)),
    [dispatch],
  );

  useEffect(() => {
    if (testinfoId) {
      onChangeField({ key: 'testinfoId', value: testinfoId });
      onChangeField({ key: 'testName', value: testName });
    }
    return () => {
      // 언마운트될때 초기화
      dispatch(initialize());
    };
  }, []); //[dispatch]

  return (
    <Editor
      testName={testName}
      criteria={criteria}
      onChangeField={onChangeField}
    />
  );
};

export default withRouter(EditorContainer);
