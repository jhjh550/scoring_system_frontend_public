import React, { useEffect } from 'react';
import CriteriaActionButtons from '../../components/criteria/CriteriaActionButtons';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { writeCriteriaAction, updateCriteria } from '../../modules/criteria';

const CriteriaActionButtonsContainer = ({ history }) => {
  const dispatch = useDispatch();
  const {
    criteriaId,
    question,
    details,
    criteriaReceived,
    criteriaError,
    user,
  } = useSelector(({ criteria, user }) => ({
    criteriaId: criteria._id,
    question: criteria.question,
    details: criteria.details,
    criteriaReceived: criteria.criteriaReceived,
    criteriaError: criteria.criteriaError,
    user: user.user,
  }));

  // 채점기준 등록/수정
  const onPublish = () => {
    if (criteriaId) {
      dispatch(updateCriteria({ criteriaId, question, details }));
    } else {
      dispatch(writeCriteriaAction({ question, details }));
    }
  };
  // 취소
  const onCancel = () => {
    history.goBack();
  };
  // 성공 혹은 실패시 할 작업
  useEffect(() => {
    if (criteriaReceived) {
      history.goBack();
    }
    if (criteriaError) {
      console.log(criteriaError);
    }
  }, [history, criteriaReceived, criteriaError]);

  return (
    <CriteriaActionButtons
      user={user}
      criteriaId={criteriaId}
      onPublish={onPublish}
      onCancel={onCancel}
    />
  );
};

export default withRouter(CriteriaActionButtonsContainer);
