import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/common/Header';
import { logout } from '../../modules/user';
import { withRouter } from 'react-router-dom';

const HeaderContainer = ({ history }) => {
  const { user, score } = useSelector(({ user, score }) => ({
    user: user.user,
    score: score.score,
  }));
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
    history.push('/');
  };
  useEffect(() => {
    if (!user) {
      history.push('/login');
    }
  }, []);

  const onHeadClick = () => {
    history.push('/');
  };
  return <Header user={user} onLogout={onLogout} onHeadClick={onHeadClick} />;
};

export default withRouter(HeaderContainer);
