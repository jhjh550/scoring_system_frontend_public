import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import EditorContainer from '../containers/criteria/EditorContainer';
import CriteriaBoxContainer from '../containers/criteria/CriteriaBoxContainer';
import CriteriaActionButtonsContainer from '../containers/criteria/CriteriaActionButtonsContainer';
import Resonsive from '../components/common/Responsive';

const ReadCriteriaPage = () => {
  return (
    <div>
      <HeaderContainer />
      <Resonsive>
        <EditorContainer />
        <CriteriaBoxContainer />
        <CriteriaActionButtonsContainer />
      </Resonsive>
    </div>
  );
};

export default ReadCriteriaPage;
