import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initialize, readScore } from '../../modules/score';
import { withRouter } from 'react-router-dom';
import { initializeList, listScores } from '../../modules/scores';
import ScoredListComponent from '../../components/score/ScoredListComponent';
import qs from 'qs';

const ScoreMyListContainer = ({ location }) => {
  return <div>hello world score my list new 123</div>;
};

export default ScoreMyListContainer;
