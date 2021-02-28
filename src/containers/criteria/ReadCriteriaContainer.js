/**
 * 리스트에서 클릭한 item 의 criteria 정보를 store 에 세팅
 */

import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

const ReadCriteriaContainer = ({ history, match }) => {
  const { criteriaId } = match.params;
  const { criteria } = useSelector(state => {
    console.log(state.criterias);
    if (state.criterias !== null && state.criterias.criterias !== null) {
      const criteriaArr = state.criterias.criterias.filter(
        c => c._id === criteriaId,
      );
      return {
        criteria: {
          ...criteriaArr[0],
          error: false,
        },
      };
    }
    return {
      criteria: {
        error: true,
      },
    };
  });

  if (criteria.error === true) {
    history.push('/');
  }

  return <></>;
};

export default withRouter(ReadCriteriaContainer);
