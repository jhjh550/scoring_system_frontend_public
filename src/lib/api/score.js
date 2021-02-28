import client from './client';
import qs from 'qs';

export const read = payload => {
  const { testName, scoreId, questionNo } = payload;
  var path = `/api/score/score/${testName}`;
  if (scoreId || questionNo) {
    const queryString = qs.stringify({ scoreId, questionNo });
    path = path + `?${queryString}`;
  }

  return client.get(path);
};

export const update = score => {
  console.log('update score test', score);

  return client.patch(`/api/score/${score.score._id}`, {
    question: score.score.question,
    details: score.score.details,
    state: 2,
  });
  // .then(response => {
  //   if (response) {
  //     if (response.status != 202) {
  //       // 알람 창 띄우기
  //       console.log(response);
  //     }
  //   }
  // })
  // .catch(error => {
  //   alert(error.response.statusText);

  //   if (error) {
  //     if (error.response.status != 202) {
  //       // 알람 창 띄우기
  //       console.log(error.response);
  //     }
  //   }
  // });
};

export const list = payload => {
  const queryString = qs.stringify({
    userId: payload.userId,
    page: payload.page,
    testName: payload.testName,
    scoreAuth: payload.scoreAuth,
    questionNo: payload.questionNo,
  });
  return client.get(`/api/score?${queryString}`);
};

export const prev = score => {
  return client.get(`/api/score/prev/${score.score._id}`);
};
