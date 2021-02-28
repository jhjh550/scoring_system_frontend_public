import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const FullScreen = styled.div`
  position: fixed;
  z-index: 30;
  top: 4rem;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background: rgba(0, 0, 0, 0.25); */
  background: ${palette.gray[9]};
`;
const MenuWrapper = styled.div`
  width: 512px;
  // width 가 주어진 상태에서 좌우 중앙 정렬
  margin-left: auto;
  margin-right: auto;
  margin-top: -12rem;
  overflow: hidden;
`;
const MenuItem = styled.div`
  font-size: 3rem;
  font-weight: bold;
  letter-spacing: 5px;
  margin-bottom: 0.5rem;
  color: ${palette.gray[4]};
  &:hover {
    cursor: pointer;
    color: ${palette.cyan[6]};
  }
`;
const StartAdminPageComponent = () => {
  return (
    <FullScreen>
      <MenuWrapper>
        <Link to="/testlist">
          <MenuItem>채점기준 관리</MenuItem>
        </Link>
        <Link to="/scorerList">
          <MenuItem>채점자 관리</MenuItem>
        </Link>
        <Link to="/scoreResultList">
          <MenuItem>채점결과 관리</MenuItem>
        </Link>
      </MenuWrapper>
    </FullScreen>
  );
};

export default StartAdminPageComponent;
