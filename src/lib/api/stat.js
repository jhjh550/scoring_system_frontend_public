import client from './client';
import qs from 'qs';

export const processedStat = query => {
  return client.post(`/api/score/stat`, { query });
};

export const testInfoScoredStat = query => {
  const { testName } = query;

  var path = `/api/score/stat`;
  const queryString = qs.stringify({ testName });
  path = path + `?${queryString}`;

  return client.get(path);
};
