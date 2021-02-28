import dotenv from 'dotenv';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from './modules';
import { tempSetUser, check } from './modules/user';
import { HelmetProvider } from 'react-helmet-async';

dotenv.config();

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

function loadUser() {
  try {
    const user = localStorage.getItem('user');
    if (!user) return; // 로그인 상태가 아니라면 아무것도 하지않음

    store.dispatch(tempSetUser(user));
    store.dispatch(check());
  } catch (e) {
    console.log('localStorage is not working');
  }
}

sagaMiddleware.run(rootSaga);
loadUser();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


// todo 1 : 채점기준 입력 validation - 문제번호 0, 점수 0 일때 입력하라고 alert 띄우기 
// DONE - todo 2 : 새 채점 기준 작성하기 버튼 layout 
// DONE - todo 3 : 채점 영역 선택할때 drag 로 선택할때 버그 수정할 것
// todo 4 : 채점기준 입력시 같은 내용 있으면 입력되지 않는다고 알리는 alert 띄우기 
// todo 5 : 채점기준 입력시 각 채점기준의 합이 총 점수와 동일하지 않으면 alert 띄우기
// todo 6 : 채점기준 입력시 선택된 이미지 영역 보여주는 곳에 zoom level 조절할 수 있어야 할듯?
// todo 7 : 채점할때 채점완료 버튼 누르지 않고 이전 버튼 눌렀을때 이전이 아닌 채점이 안된 문제가 보임
// todo 8 : 채점할때 x,y position 입력하는 부분 삭제할 것
