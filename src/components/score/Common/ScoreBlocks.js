import styled, { css } from 'styled-components';
import palette from '../../../lib/styles/palette';
import Responsive from '../../common/Responsive';

export const ScoreListWrapper = styled(Responsive)`
  margin-top: 1rem;
`;
export const QuestionNoBlock = styled.div`
  width: 100px;
`;
export const TestNameBlock = styled.div`
  width: 100px;
`;
export const QuestionStateBlock = styled.div`
  width: 70px;
`;
export const CriteriasBlock = styled.div`
  flex: 1;
  text-overflow: ellipsis;
`;

export const ScoredItemBlock = styled.div`
  display: flex;
  padding: 0.5rem;
  border-top: 1px solid ${palette.gray[3]};
  &:hover {
    cursor: pointer;
    background: ${palette.cyan[2]};
  }
  ${props =>
    props.done &&
    css`
      background: ${palette.gray[3]};
    `}

  /* ${props =>
    props.active &&
    css`
      background: ${palette.cyan[1]};
    `} */

    ${props =>
      props.process &&
      css`
        background: #ffffe0;
      `}
      
      ${props =>
        props.before &&
        css`
          background: #ffe5e5;
        `}
      
`;
