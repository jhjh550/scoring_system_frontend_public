import React, { useState, useEffect } from 'react';
import { list } from '../../lib/api/auth';
import styled, { css } from 'styled-components';
import Button from '../common/Button';
import AskModal from '../common/AskModal';
import Responsive from '../common/Responsive';
import palette from '../../lib/styles/palette';
import ScorerEditItemComponent from '../criterias/ScorerEditItemComponent';

const Container = styled(Responsive)`
  display: flex;
  overflow: none;
`;

const Nav = styled.div`
  overflow: scroll;
  width: 160px;
  background: ${palette.gray[2]};
`;

const Section = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  background: ${palette.gray[1]};
`;

const ButtonWrapperBlock = styled.div`
  display: flex;
  margin: 0.5rem;
`;

const TestInfoSelect = styled.select`
  width: 480px;
  height: 1.5rem;
  font-size: 1rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
`;

const ButtonHolder = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;

const StyledButton = styled(Button)`
  height: 2rem;
  & + & {
    margin-left: 0.75rem;
  }
`;

const ScorerNameBlock = styled.div`
  padding: 1rem;
  border-top: 1px solid #dee2e6;
  &:hover {
    cursor: pointer;
    background: ${palette.cyan[1]};
  }
  ${props =>
    props.active &&
    css`
      background: ${palette.cyan[5]};
    `}
`;

const CriteriaListBlock = styled.div`
  display: flex;
  overflow: scroll;
  flex-direction: column;
`;

const ScorerManageComponent = ({
  testinfos,
  onTestNameChange,
  onScorerInfoChange,
  onUpdateCriteriaList,
  onInitializeCriteriaList,
  criterias,
  changedCriterias,
  criteriasResult,
  loading,
}) => {
  const [selectedScorer, setSelectedScorer] = useState(null);
  const [scorerList, setScorerList] = useState([]);
  const [selectValue, setSelectValue] = useState('');
  const [updateCompleteModal, setUpdateCompleteModal] = useState(false);

  const fetchScorerList = async () => {
    const result = await list();
    var scorers = result.data;
    scorers.sort((a, b) => (a.username > b.username ? 1 : -1));
    setScorerList(scorers);
    setSelectedScorer(result.data[0]);
  };
  useEffect(() => {
    fetchScorerList();
  }, []);

  useEffect(() => {
    const testName = '';
    setSelectValue(testName);
    onInitializeCriteriaList();
    if (criteriasResult) {
      setUpdateCompleteModal(false);
    }
  }, [criteriasResult]);

  const onScorerNameClick = e => {
    const scorerId = e.target.getAttribute('id');
    const scorerName = e.target.innerHTML;

    const testName = '';
    setSelectValue(testName);
    onInitializeCriteriaList();
    setSelectedScorer({ _id: scorerId, username: scorerName });
  };

  const onChangeSelect = e => {
    const testName = e.target.value;
    setSelectValue(testName);
    onTestNameChange({ testName });
  };

  const onCheckedChange = newCriteria => {
    const newCriterias = [];
    for (const criteria of criterias) {
      if (criteria._id === newCriteria._id) {
        newCriterias.push(newCriteria);
      } else {
        newCriterias.push(criteria);
      }
    }

    // 이미 있으면 제거, 없으면 추가
    var newChangedCriterias = changedCriterias ? [...changedCriterias] : [];
    const findIndex = newChangedCriterias.findIndex(
      criteria => criteria._id === newCriteria._id,
    );
    if (findIndex < 0) {
      newChangedCriterias.push(newCriteria);
    } else {
      newChangedCriterias.splice(findIndex, 1);
    }

    onScorerInfoChange({
      criterias: newCriterias,
      changedCriterias: newChangedCriterias,
    });
  };

  const onUpdateClick = () => {
    setUpdateCompleteModal(true);
    onUpdateCriteriaList({
      criterias: criterias,
      changedCriterias: changedCriterias,
    });
  };

  const onUpdateConfirm = () => {
    setUpdateCompleteModal(false);
  };

  return (
    <>
      <Container>
        <Nav>
          {scorerList.map(scorer => (
            <ScorerNameBlock
              key={scorer._id}
              id={scorer._id}
              active={selectedScorer && scorer._id === selectedScorer._id}
              onClick={onScorerNameClick}
            >
              {scorer.username}
            </ScorerNameBlock>
          ))}
        </Nav>
        <Section>
          <ButtonWrapperBlock>
            시험명 :
            <TestInfoSelect
              name="testinfoSelect"
              value={selectValue}
              onChange={onChangeSelect}
            >
              <option>시험명을 선택해 주세요...</option>
              {testinfos &&
                testinfos.map(info => (
                  <option key={info._id}>{info.testName}</option>
                ))}
            </TestInfoSelect>
            <ButtonHolder>
              <Button cyan onClick={onUpdateClick}>
                수정사항 반영
              </Button>
            </ButtonHolder>
          </ButtonWrapperBlock>
          <CriteriaListBlock>
            {criterias &&
              criterias.map(criteria => (
                <ScorerEditItemComponent
                  key={criteria._id}
                  criteria={criteria}
                  selectedScorer={selectedScorer}
                  onCheckedChange={onCheckedChange}
                />
              ))}
          </CriteriaListBlock>
        </Section>
      </Container>
      <AskModal
        showCancel={false}
        visible={updateCompleteModal}
        title={criteriasResult ? '수정 사항 반영 완료' : '수정 사항 반영 중'}
        description={JSON.stringify(criteriasResult, null, 4)}
        // description={
        //   criteriasResult
        //     ? '수정 사항 반영이 완료 되었습니다.'
        //     : '수정 사항 반영 중입니다.'
        // }
        onConfirm={onUpdateConfirm}
      />
    </>
  );
};

export default ScorerManageComponent;
