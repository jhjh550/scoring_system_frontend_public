import React, { useRef } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';
import ScrollContainer from 'react-indiana-drag-scroll'

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

const Section = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: scroll;
`;

const ButtonHolder = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 1rem;
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

const Img = styled.img`
  object-fit: none;
`;

const AskFullScreenImgViewerModal = ({
  visible,
  imgPath,
  xPos,
  yPos,
  onConfirm,
}) => {
  const imgEl = useRef(null);
  if (!visible) return null;
  const onImageLoad = () => {
    console.log('img loaded');
  };

  return (
    <FullScreen>
      <Container>
        <Section>
          <ButtonHolder>
            <Button onClick={onConfirm}>닫기</Button>
          </ButtonHolder>
          <ScrollContainer className="scroll-container" hideScrollbars={false}>
            <AreaWrapper>
              <ImgWrapper>
                <Img onLoad={onImageLoad} ref={imgEl} src={imgPath} />
              </ImgWrapper>
            </AreaWrapper>
          </ScrollContainer>
        </Section>
      </Container>
    </FullScreen>
  );
};

export default AskFullScreenImgViewerModal;
