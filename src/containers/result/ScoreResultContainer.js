import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { testInfoStat } from '../../modules/stat';
import { exportExcel, unloadFileInfo } from '../../modules/export_excel';
import ScoreResultComponent from '../../components/result/ScoreResultComponent';

const ScoreResultContainer = ({ match }) => {
  const { testName } = match.params;

  const { stat, user, fileName } = useSelector(
    ({ user, stat, export_excel }) => ({
      user: user.user,
      stat: stat.stat,
      fileName: export_excel.fileName,
    }),
  );

  useEffect(() => {
    dispatch(testInfoStat({ testName }));
    return () =>{
      // 언마운트 될때 리덕스에서 export file info 제거하기 
      console.log("언마운트 될때 리덕스에서 export file info 제거하기 ")
      dispatch(unloadFileInfo());
    }
  }, []);

  const dispatch = useDispatch();

  const onExportClicked = () => {
    dispatch(exportExcel({ testName }));
  };

  return (
    <ScoreResultComponent
      testName={testName}
      stat={stat}
      onExportClicked={onExportClicked}
      exportFileName={fileName}
    />
  );
};

export default withRouter(ScoreResultContainer);
