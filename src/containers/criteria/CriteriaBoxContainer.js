import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CriteriaInputBox from '../../components/criteria/CriteriaInputBox';
import { changeField } from '../../modules/criteria';

const CriteriaBoxContainer = () => {
  const dispatch = useDispatch();
  const details = useSelector(state => state.criteria.details);

  const onChangeCriterias = nextCriterias => {
    dispatch(
      changeField({
        key: 'details',
        value: nextCriterias,
      }),
    );
  };

  return (
    <CriteriaInputBox
      criterias={details}
      onChangeCriterias={onChangeCriterias}
    />
  );
};

export default CriteriaBoxContainer;
