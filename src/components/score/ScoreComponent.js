import React, { useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import Responsive from '../common/Responsive';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';
import AskFullScreenImgViewerModal from './AskFullScreenImgViewerModal';
import ScoreCriteriaItem from './ScoreCriteriaItem';
import AskModal from '../common/AskModal';
import { MdNavigateBefore, MdNavigateNext, MdHome } from 'react-icons/md';
import { Link } from 'react-router-dom';

import Viewer from 'react-viewer';

import { useBeforeunload } from 'react-beforeunload';

const ScoreComponentBlock = styled(Responsive)`
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  overflow: none;
`;

const QuestionWrapper = styled.div`
  padding: 0.5rem;
  width: 640px;
  display: flex;
  flex-direction: column;
  background: ${palette.gray[2]};
`;

const TitleBlock = styled.span`
  font-size: 2.5rem;
`;

const ButtonHolder = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 1rem;
`;

const ImgBlock = styled.img`
  object-fit: none;
  ${props =>
    css`
      object-position: -${props.xPos}px -${props.yPos}px;
    `}
`;

const ScoreStateBlock = styled.h3`
${props =>
  props.done &&
  css`
    color: red;
  `}
`

const InputBlock = styled.input`
  font-size: 0.75rem;
  padding: 0.25rem;
  margin: 0.25rem;
  width: 75px;
`;

const CriteriaWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const EmptyScoreBlock = styled.div`
  text-align: center;
`;

const StatusBlock = styled.div`
  justify-content: space-around;
  display: flex;
`;

const NavigationButtonsBlock = styled.div`
  display: flex;
  justify-content: space-around;
`;

const NaviButton = styled(Button)`
  flex: 1;
  font-size: 1.75rem;

  & + & {
    margin-left: 0.75rem;
  }
`;

const SubmitButton = styled(NaviButton)`
  flex: 4;
  margin-right: 0.75rem;
`;

const LocalNavBar = styled.div`
  margin-top: 8px;
  margin-bottom: 4px;
  border-radius: 4px;
  height: 2.75rem;
  display: flex;
  justify-content: space-between;
  background: ${palette.gray[2]};
`;

const BreadCrumb = styled.div`
  display: flex;
  align-items: center;
`;
const BreadCrumbItem = styled.div`
  font-size: 1.15rem;
  font-weight: bold;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  color: ${palette.cyan[6]};
  &:hover {
    cursor: pointer;
    color: ${palette.cyan[9]};
  }
`;
const BreadCrumbHomeItem = styled(BreadCrumbItem)`
  font-size: 1.5rem;
`;
const BreadCrumbItemSeperator = styled.div`
  font-size: 1rem;
  font-weight: bold;
`;

const ProgressDiv = styled.div`
  margin-right: 8px;
  align-items: center;
  display: flex;
  font-size: 1.125rem;
  font-weight: 500;
  letter-spacing: 2px;
`;

const ScoreComponent = ({
  user,
  testName,
  score,
  scoreReceived,
  liveDoneCount,
  doneCount,
  totalCount,
  error,
  loading,
  onSubmit,
  onChangeDetails,
  onMoveNextScore,
  onMovePrevScore,
  onMoveListScore,
}) => {
  const [xOffset, setXOffset] = useState(0);
  const [yOffset, setYOffset] = useState(0);
  const [modal, setModal] = useState(false);
  const [onLeaveToNextModal, setOnLeaveToNextModal] = useState(false);
  const [onLeaveToPrevModal, setOnLeaveToPrevModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const errorMsg = useRef('');

  if (error) {
    if (error.response && error.response.status === 404) {
      return (
        <EmptyScoreBlock>
          <h1>채점할 문제가 없습니다.</h1>
        </EmptyScoreBlock>
      );
    } else {
      console.log('error222', error);
      errorMsg.current = '에러가 발생하였습니다.';
      setErrorModal(true);
    }
  }

  if (!score) {
    return <div>...</div>;
  }

  const onMoveNextClick = () => {
    if (score.state === 2 || scoreReceived) {
      onMoveNextScore();
    } else {
      setOnLeaveToNextModal(true);
    }
  };

  const onMoveNextScoreConfirmClick = () => {
    onMoveNextScore();
    onMoveDismiss();
  };

  const onMovePrevScoreConfirmClick = () => {
    onMovePrevScore();
    onMoveDismiss();
  };

  const onMoveListScoreConfirmClick = () => {
    onMoveListScore();
    onMoveDismiss();
  };

  const onMoveDismiss = () => {
    setOnLeaveToNextModal(false);
    setOnLeaveToPrevModal(false);
    setErrorModal(false);
  };

  const onMovePrevClick = () => {
    if (score.state === 2 || scoreReceived) {
      onMovePrevScore();
    } else {
      setOnLeaveToPrevModal(true);
    }
  };

  const onFullScreenClick = () => {
    setModal(true);
  };

  const onChangeXOffset = e => {
    const value = parseInt(e.target.value);
    const offset = value ? value : 0;
    setXOffset(offset);
  };
  const onChangeYOffset = e => {
    const value = parseInt(e.target.value);
    const offset = value ? value : 0;
    setYOffset(offset);
  };

  const onChangeItem = changeDetail => {
    const { details } = score;
    var _details = [];
    for (const detail of details) {
      if (detail._id === changeDetail._id) {
        _details.push({ ...changeDetail });
      } else {
        _details.push({ ...detail });
      }
    }
    onChangeDetails({ details: _details });
  };

  const getCurrentPoint = () => {
    var correctPoint = 0;
    for (const detail of score.details) {
      console.log(detail);
      if (detail.correct) {
        correctPoint += detail.point;
      }
    }
    return correctPoint;
  };

  const getCurrentStateString = () => {
    if (score) {
      if (score.state === 2) {
        return '채점 완료';
      }
    }
    if (scoreReceived) {
      return '채점 완료';
    }

    return '미 채점';
  };

  const { testPaperNo, questionNo } = score.question;
  const { imgFileName, xPos, yPos, width, height } = score.question.area;

  const imgPath = `/answer/${testName}_분류/${testPaperNo}/${imgFileName}`;

  const scoreMyListPath = `/scoremylist/${testName}`;
  const scoredListPath = `/scoredlist/?testName=${testName}&scoreAuth=${user.username}&questionNo=${questionNo}`;

  console.log(liveDoneCount);
  const onConfirm = () => {
    setModal(false);
  };

  if(loading) 
    return null;

  return (
    <>
      <ScoreComponentBlock>
        <LocalNavBar>
          <BreadCrumb>
            <BreadCrumbHomeItem>
              <Link to="/testscorelist">
                <MdHome />
              </Link>
            </BreadCrumbHomeItem>
            <BreadCrumbItemSeperator>/</BreadCrumbItemSeperator>
            <BreadCrumbItem>
              <Link to={scoreMyListPath}>{testName}</Link>
            </BreadCrumbItem>
            <BreadCrumbItemSeperator>/</BreadCrumbItemSeperator>
            <BreadCrumbItem>
              <Link to={scoredListPath}>{questionNo}</Link>
            </BreadCrumbItem>
          </BreadCrumb>
          <ProgressDiv>
              {liveDoneCount == 0 ? doneCount : liveDoneCount} / {totalCount}
          </ProgressDiv>
        </LocalNavBar>

        <Container>
          <QuestionWrapper>
            <TitleBlock>{questionNo}번 답안영역</TitleBlock>
            <h4>문제지 번호 : {testPaperNo}</h4>
            <ButtonHolder>
              {/* <div>x : </div>
              <InputBlock type="text" onChange={onChangeXOffset} />
              <div>y : </div>
              <InputBlock type="text" onChange={onChangeYOffset} /> */}
              <Button onClick={onFullScreenClick}>이미지 확대</Button>
            </ButtonHolder>
            <ImgBlock
              src={imgPath}
              width={width}
              height={height}
              xPos={xPos + xOffset}
              yPos={yPos + yOffset}
            />
          </QuestionWrapper>

          <CriteriaWrapper>
            {score.details.map(detail => (
              <ScoreCriteriaItem
                key={detail._id}
                detail={detail}
                onChangeItem={onChangeItem}
              />
            ))}

            <StatusBlock>
              <ScoreStateBlock done={score.state === 2 || scoreReceived}>상태 : {getCurrentStateString()}</ScoreStateBlock>
              <h3>점수 : {getCurrentPoint()}</h3>
            </StatusBlock>
            <NavigationButtonsBlock>
              <NaviButton big onClick={onMovePrevClick}>
                <MdNavigateBefore />
              </NaviButton>
              <SubmitButton cyan big onClick={onSubmit}>
                답안 채점
              </SubmitButton>
              <NaviButton big onClick={onMoveNextClick}>
                <MdNavigateNext />
              </NaviButton>
            </NavigationButtonsBlock>
          </CriteriaWrapper>
        </Container>
      </ScoreComponentBlock>
      {/* <AskFullScreenImgViewerModal
        visible={modal}
        onConfirm={onConfirm}
        imgPath={imgPath}
      /> */}
      <Viewer 
        visible={modal}
        onClose={onConfirm}
        images={[{src: imgPath, alt: ''}]}

      />
      <AskModal
        title={'미채점 상태 입니다.'}
        description={'다음 채점 항목으로 이동하시겠습니까?'}
        visible={onLeaveToNextModal}
        onConfirm={onMoveNextScoreConfirmClick}
        onCancel={onMoveDismiss}
      />
      <AskModal
        title={'미채점 상태 입니다.'}
        description={'이전 채점 항목으로 이동하시겠습니까?'}
        visible={onLeaveToPrevModal}
        onConfirm={onMovePrevScoreConfirmClick}
        onCancel={onMoveDismiss}
      />
      <AskModal
        title={'오류가 발생하였습니다.'}
        visible={errorModal}
        description={errorMsg.current}
        onConfirm={onMoveDismiss}
        showCancel={false}
      />
    </>
  );
};

export default ScoreComponent;
