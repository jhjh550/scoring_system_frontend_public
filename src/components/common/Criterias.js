import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const CriteriasBlock = styled.div`
  margin-top: 0.5rem;
  .criteria {
    /* display: inline-block; */
    color: ${palette.cyan[7]};
    text-decoration: none;
    margin-left: 0.5rem;
    &:hover {
      color: ${palette.cyan[6]};
    }
  }
`;

const Criterias = ({ criterias }) => {
  return (
    <CriteriasBlock>
      {criterias.map((criteria, index) => (
        <div key={index} className="criteria">
          {criteria.text}
        </div>
      ))}
    </CriteriasBlock>
  );
};

export default Criterias;
