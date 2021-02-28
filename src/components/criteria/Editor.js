import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';
import Button from '../common/Button';
import AskAnswerAreaModal from './AskAnswerAreaModal';
import { getTestImages } from '../../lib/api/testinfo';
// import listTestPapers from '../../lib/listTestPapers';

const EditorBlock = styled(Responsive)`
  padding-top: 5rem;
  padding-bottom: 5rem;
`;

const TitleInput = styled.input`
  font-size: 3rem;
  outline: none;
  padding-bottom: 0.5rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[4]};
  margin-bottom: 2rem;
  width: 80%;
`;
const LeftBox = styled.div`
  float: left;
  width: 50%;
`;
const RightBox = styled.div`
  float: right;
  width: 50%;
`;

const AnswerAreaBlock = styled.div`
  background: ${palette.gray[1]};
  display: flex;
  overflow: hidden;
  width: 100%;
`;

const ImgBlock = styled.img`
  object-fit: none;
  ${props =>
    css`
      object-position: -${props.xPos}px -${props.yPos}px;
    `}
`;

const Editor = ({ testName, criteria, onChangeField }) => {
  const onChangeScore = e => {
    onChangeField({ key: 'score', value: e.target.value });
  };
  const onChangeNo = e => {
    onChangeField({ key: 'no', value: e.target.value });
  };
  const handleFocus = e => {
    e.target.select();
  };

  const [modal, setModal] = useState(false);
  const [fileNames, setFileNames] = useState([]);
  const onAreaSetButtonClick = async () => {
    // testname 을 매개변수를 넘겨서 listTestPapers 를 서버에서 받아옴
    const files = await getTestImages(testName);
    setFileNames(files);
    setModal(true);
  };
  const onCancel = () => {
    setModal(false);
  };
  const onConfirm = () => {
    setModal(false);
  };

  const { xPos, yPos, width, height, imgFileName } = criteria.question.area;
  const imgPath = `/testinfo/${encodeURI(testName)}/${encodeURI(
    imgFileName,
  )}`;

  return (
    <>
      <EditorBlock>
        <LeftBox>
          문제 번호:
          <TitleInput
            className="left-box"
            autoFocus
            placeholder="문제 번호를 입력하세요."
            onChange={onChangeNo}
            onFocus={handleFocus}
            value={criteria.question.no}
          />
        </LeftBox>
        <RightBox>
          문제 점수 :
          <TitleInput
            className="right-box"
            placeholder="문제 점수를 입력하세요."
            onChange={onChangeScore}
            value={criteria.question.score}
          />
        </RightBox>
        <AnswerAreaBlock>
          <Button onClick={onAreaSetButtonClick}>영역 선택</Button>

          <div>
            <ImgBlock
              src={imgPath}
              width={width}
              height={height}
              xPos={xPos}
              yPos={yPos}
            />
          </div>
        </AnswerAreaBlock>
      </EditorBlock>
      <AskAnswerAreaModal
        testName={testName}
        area={criteria.question.area}
        fileNames={fileNames}
        visible={modal}
        onCancel={onCancel}
        onConfirm={onConfirm}
        onChangeField={onChangeField}
      />
    </>
  );
};

export default Editor;
