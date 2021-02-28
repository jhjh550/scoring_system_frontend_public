import client from './client';
import qs from 'qs';

export const exportExcel = query => {
  const { testName } = query;
  const path = `/api/score/export/${testName}`;
  return client.get(path);
};
