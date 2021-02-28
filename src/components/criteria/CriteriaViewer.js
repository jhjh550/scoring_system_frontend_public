import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';
import SubInfo from '../common/SubInfo';
import Criterias from '../common/Criterias';

const CriteriaViewerBlock = styled(Responsive)`
  margin-top: 4rem;
`;
const CriteriaHead = styled.div`
  border-bottom: 1px solid ${palette.gray[2]};
  padding-bottom: 3rem;
  margin-bottom: 3rem;
  h1 {
    font-size: 3rem;
    line-height: 1.5;
    margin: 0;
  }
`;

const CriteriaViewer = ({ criteria, error, loading }) => {
  /**
   * 오류 발생시
   */
  if (error) {
    if (error.respose && error.respose.state === 404) {
      return (
        <CriteriaViewerBlock>
          해당 채점 기준 내용이 존재하지 않습니다.
        </CriteriaViewerBlock>
      );
    } else {
      console.log('error: ', error);
      return <CriteriaViewerBlock>오류 발생!!</CriteriaViewerBlock>;
    }
  }

  console.log('loading: ', loading);
  console.log('criteria: ', criteria);

  /**
   * 로딩 중이거나 아직 채점기준 데이터가 없을때
   */
  if (loading || !criteria) {
    return null;
  }

  const { question, user, publishedDate, details } = criteria;
  return (
    <>
      <CriteriaViewerBlock>
        <CriteriaHead>
          <h1>{question.no}</h1>
          <SubInfo>
            <span>
              <b>{user.username}</b>
            </span>
            <span>{new Date(publishedDate).toLocaleDateString()}</span>
          </SubInfo>
          {/* <Criterias>
            {details.map((detail, index) => (
              <div key={index} className="criteria">
                {detail}
              </div>
            ))}
          </Criterias> */}
          <Criterias criterias={details} />
        </CriteriaHead>
      </CriteriaViewerBlock>
    </>
  );
};

export default CriteriaViewer;
