import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';
import { MdZoomIn, MdZoomOut } from 'react-icons/md';

const FullScreen = styled.div`
  position: fixed;
  z-index: 30;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 90%;
  height: 90%;
  display: flex;
  background: ${palette.gray[1]};
  overflow: none;
`;
const Nav = styled.div`
  overflow: scroll;
  width: 240px;
  background: ${palette.gray[2]};
`;
const Section = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const ButtonWrapperBlock = styled.div`
  margin: 1rem;
`;
const ButtonHolder = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 2rem;
`;

const StyledButton = styled(Button)`
  height: 2rem;
  & + & {
    margin-left: 0.75rem;
  }
`;

const FileNameBlock = styled.div`
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

const AreaWrapper = styled.div`
  position: relative;
  overflow: auto;
  min-height: 4rem;
`;
const ImgWrapper = styled.div`
  position: relative;
  overflow: auto;
`;

const ZoomButtonWrapper = styled.div`
  left: 0;
  top: 0;
`;
const ZoomButton = styled(StyledButton)`
  font-size: 1.75rem;
  margin: 0.25rem;
`;
const AnswerArea = styled.div`
  position: absolute;
  z-index: 99;
`;

const AskAnswerAreaModal = ({
  visible,
  testName,
  area,
  fileNames,
  onConfirm,
  onCancel,
  onChangeField,
}) => {
  const [selectedFileName, setSelectedFileName] = useState('');
  const [zoomRatio, setZoomRatio] = useState(1.0);
  const [drag, setDrag] = useState(false);
  const [xPos, setXPos] = useState(area.xPos);
  const [yPos, setYPos] = useState(area.yPos);
  const [width, setWidth] = useState(area.width);
  const [height, setHeight] = useState(area.height);

  useEffect(() => {
    const initFileName = area.imgFileName ? area.imgFileName : fileNames[0];
    setSelectedFileName(initFileName);
    area.imgFileName = initFileName;
    setZoomRatio(1.0 / 1.5 / 1.5);
  }, [fileNames]);

  const ImgOriginX = useRef(0);
  const [scrollXOffset, setScrollXOffset] = useState(0);
  const imgEl = useRef(null);

  if (!visible) return null;

  const onModalConfirm = () => {
    if (
      selectedFileName !== '' &&
      xPos !== 0 &&
      yPos !== 0 &&
      width !== 0 &&
      height !== 0
    ) {
      const area = {
        imgFileName: selectedFileName,
        xPos: xPos,
        yPos: yPos,
        width: width,
        height: height,
      };
      onChangeField({ key: 'area', value: area });
    }
    onConfirm();
  };

  const onItemClick = e => {
    const clickedFileName = e.target.getAttribute('name');
    initArea();
    area.imgFileName = clickedFileName;
    setSelectedFileName(clickedFileName);
  };

  const onZoomInClicked = () => {
    setZoomRatio(zoomRatio * 1.5);
  };
  const onZoomOutClicked = () => {
    setZoomRatio(zoomRatio / 1.5);
  };
  const initArea = () => {
    setXPos(0);
    setYPos(0);
    setWidth(0);
    setHeight(0);

    setDrag(false);
  };
  const onMouseDown = e => {
    e.preventDefault();
    const { offsetX, offsetY } = e.nativeEvent;

    initArea();
    setDrag(true);
    setXPos(offsetX);
    setYPos(offsetY);
  };
  const onMouseMove = e => {
    e.preventDefault();
    const { offsetX, offsetY } = e.nativeEvent;

    if (drag) {
      const newWidth = offsetX - xPos;
      if(newWidth > 0){
        if(newWidth - width > 0){ // 늘어날때 
          setWidth(newWidth);
        }
      }
      const newHeight = offsetY - yPos;
      if(newHeight > 0){
        if(newHeight - height > 0){ // 늘어날때 
          setHeight(newHeight);
        }
      }
    }
  };

  const onMouseUp = e => {
    e.preventDefault();
    setDrag(false);
  };

  const onImageScroll = () => {
    const x = imgEl.current.getBoundingClientRect().x;
    const diff = ImgOriginX.current - x;
    setScrollXOffset(diff);
  };

  const onImageLoad = () => {
    const x = imgEl.current.getBoundingClientRect().x;
    ImgOriginX.current = x;
  };

  const styles = {
    transformOrigin: `0 0`,
    transform: `scale(${zoomRatio})`,
  };

  const answerAreaStyle = {
    left: `${xPos * zoomRatio - scrollXOffset}px`,
    top: `${yPos * zoomRatio}px`,
    width: `${width}px`,
    height: `${height}px`,
    opacity: 0.5,
    background: '#ff0000',
    transformOrigin: `0 0`,
    transform: `scale(${zoomRatio})`,
  };

  return (
    <FullScreen>
      <Container>
        <Nav>
          {fileNames.map(name => (
            <FileNameBlock
              key={name}
              name={name}
              active={area.imgFileName === name}
              onClick={onItemClick}
            >
              {name}
            </FileNameBlock>
          ))}
        </Nav>
        <Section>
          <ButtonWrapperBlock>
            <ButtonHolder>
              <StyledButton onClick={onCancel}>취소</StyledButton>
              <StyledButton cyan onClick={onModalConfirm}>
                확인
              </StyledButton>
            </ButtonHolder>

            <ZoomButtonWrapper>
              <ZoomButton onClick={onZoomInClicked}>
                <MdZoomIn />
              </ZoomButton>
              <ZoomButton onClick={onZoomOutClicked}>
                <MdZoomOut />
              </ZoomButton>
            </ZoomButtonWrapper>
          </ButtonWrapperBlock>

          <AreaWrapper
            onScroll={onImageScroll}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
          >
            <ImgWrapper>
              <img
                onLoad={onImageLoad}
                ref={imgEl}
                style={styles}
                src={`/testinfo/${encodeURI(testName)}/${encodeURI(
                  selectedFileName,
                )}`}
              />
            </ImgWrapper>
            <AnswerArea style={answerAreaStyle} />
          </AreaWrapper>
        </Section>
      </Container>
    </FullScreen>
  );
};

export default AskAnswerAreaModal;

