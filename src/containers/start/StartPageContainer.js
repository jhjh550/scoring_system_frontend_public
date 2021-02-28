import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StartAdminPageComponent from '../../components/start/StartAdminPageComponent';
import StartPageComponent from '../../components/start/StartPageComponent';

const StartPageContainer = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  console.log('user', user);
  if (!user) return <></>;

  if (user.admin === true) {
    return <StartAdminPageComponent />;
  } else {
    return <StartPageComponent />;
  }
};

export default StartPageContainer;
