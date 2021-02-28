import React from 'react';
import EditorContainer from '../containers/criteria/EditorContainer';
import Resonsive from '../components/common/Responsive';
import CriteriaBoxContainer from '../containers/criteria/CriteriaBoxContainer';
import CriteriaActionButtonsContainer from '../containers/criteria/CriteriaActionButtonsContainer';

const CriteriaWritePage = () => {
  return (
    <Resonsive>
      <EditorContainer />
      <CriteriaBoxContainer />
      <CriteriaActionButtonsContainer />
    </Resonsive>
  );
};

export default CriteriaWritePage;
