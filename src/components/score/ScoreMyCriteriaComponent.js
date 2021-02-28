import React from 'react';
import styled from 'styled-components';
import { ScoreListWrapper } from './Common/ScoreBlocks';
import ScoreMyCriteriaItemComponent from './ScoreMyCriteriaItemComponent';

const ScoreMyCriteriaComponent = ({ testName, criterias, user, stat }) => {
  return (
    <ScoreListWrapper>
      <h3>{testName}</h3>
      {criterias &&
        criterias.map(criteria => {
          return (
            <ScoreMyCriteriaItemComponent
              key={criteria._id}
              user={user}
              criteria={criteria}
              testName={testName}
              stat={stat}
            />
          );
        })}
    </ScoreListWrapper>
  );
};

export default ScoreMyCriteriaComponent;
