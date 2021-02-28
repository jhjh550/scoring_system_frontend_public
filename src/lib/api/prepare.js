import client from './client';

export const prepareImgsForTest = id => {
  return client.get(`/api/prepare`);
};

export const countNotProcessed = () => {
  return client.get('/api/prepare/countNotProcessed');
};

export const prepareImgsSecondProcess = () => {
  return client.get('/api/prepare/secondProcess');
};

export const fileCopy100_not_rotate = startNo => {
  return client.get(`/api/prepare/fileCopy/${startNo}`);
};

export const moveToAnswerGroupDir = () => {
  return client.get('/api/prepare/moveToAnswerGroupDir');
};
