import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';

const GlobalStyle = createGlobalStyle`
    body{
        padding:0;
        margin:0;
        background: #e9ecef;
    }
`;

const TestInfoListBlock = styled.div`
  width: 512px;
  // width 가 주어진 상태에서 좌우 중앙 정렬
  margin-left: auto;
  margin-right: auto;
  margin-top: 6rem;
  border-radius: 4px;
  overflow: hidden;
`;

const TestInfoListTitle = styled.div`
  background: #22b8cf;
  color: white;
  height: 4rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TestInfoListBody = styled.div`
  background: white;
`;

const TestInfoItemBlock = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  border-top: 1px solid #dee2e6;
  background: white;
  &:nth-child(odd) {
    background: ${palette.gray[1]};
  }
  &:hover {
    cursor: pointer;
    background: ${palette.gray[3]};
  }
`;

const TestScoreListComponent = ({ testinfos, error, loading }) => {
  if (error) {
    return <TestInfoListBlock>에러가 발생했습니다.</TestInfoListBlock>;
  }

  return (
    <>
      <GlobalStyle />
      <TestInfoListBlock>
        <TestInfoListTitle>시험 리스트</TestInfoListTitle>

        {!loading && testinfos && (
          <div>
            {testinfos.map((testinfo, index) => (
              <Link to={`/scoremylist/${testinfo.testName}`} key={index}>
                <TestInfoItemBlock>{testinfo.testName}</TestInfoItemBlock>
              </Link>
            ))}
          </div>
        )}
      </TestInfoListBlock>
    </>
  );
};

export default TestScoreListComponent;
