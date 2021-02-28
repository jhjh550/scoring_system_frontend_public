import React, { useState } from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';
import Criterias from '../common/Criterias';
import { Link } from 'react-router-dom';
import CriteriaReadActionButtons from '../criteria/CriteriaReadActionButtons';
import { removeCriteria } from '../../lib/api/criteria';

const CriteriaListBlock = styled(Responsive)`
  margin-top: 1rem;
`;

const WriteCriteriaButtonWrapper = styled.div`
  margin-top: 3rem;
  margin-bottom: 3rem;
`;

const CriteriaItemBlock = styled.div`
  padding-top: 3rem;
  padding-bottom: 3rem;
  /* border-top: 1px solid ${palette.gray[2]}; */
  /* 맨 위 item 에는 padding-top 없음 */
  &:first-child {
    padding-top: 0;
  }
  /* & + & {
    border-top: 1px solid ${palette.gray[2]};
  } */
  h2 {
    font-size: 2rem;
    margin-bottom: 0;
    margin-top: 0;
  }
  p {
    margin-top: 2rem;
  }
  &:hover {
    background: ${palette.gray[1]};
  }
`;

const CriteriaItem = ({
  criteria,
  onReload,
  onTempChangeField,
  showWriteButton,
}) => {
  const { question, details, _id } = criteria;
  const onRemove = async () => {
    try {
      await removeCriteria(_id);
      onReload();
    } catch (e) {
      console.log(e);
    }
  };
  const onTempClick = () => {
    /**
     *  todo : 서버에서 read 하는쪽에서 데이터를 읽어오지 못해서(json 으로 리턴받는거 까지는 되는데 redux 에서 못 받아오는게 아닐까-_-;)
     * 여기서 h2 클릭했을때 해당 criteria 정보를 store 의 criteria 정보로 set
     * */
    onTempChangeField({ criteria });
  };
  return (
    <>
      <Link to={`/readCriteria/${_id}`}>
        <CriteriaItemBlock onClick={onTempClick}>
          <h2>{question.no}</h2>

          <Criterias criterias={details} />
        </CriteriaItemBlock>
      </Link>
      {showWriteButton && <CriteriaReadActionButtons onRemove={onRemove} />}
    </>
  );
};

const CriteriaList = ({
  testinfoId,
  criterias,
  loading,
  error,
  showWriteButton,
  onReload,
  onTempChangeField,
}) => {
  // 에러 발생시
  if (error) {
    return <CriteriaListBlock>에러가 발생했습니다.</CriteriaListBlock>;
  }

  const writeLink = `/writeCriteria/${testinfoId}`;
  return (
    <>
    
      <CriteriaListBlock>
        <WriteCriteriaButtonWrapper>
          {showWriteButton && (
            <Button cyan big to={writeLink}>
              새 채점 기준 작성하기
            </Button>
          )}
        </WriteCriteriaButtonWrapper>  
        {/* 로딩중이 아니고 채점기준 내용이 존재할때만 보여줌 */}
        {!loading && criterias && (
          <>
            <div>
              {criterias.map(criteria => (
                <CriteriaItem
                  criteria={criteria}
                  key={criteria._id}
                  onReload={onReload}
                  onTempChangeField={onTempChangeField}
                  showWriteButton={showWriteButton}
                />
              ))}
            </div>
          </>
        )}
      </CriteriaListBlock>
    </>
  );
};

export default CriteriaList;
