import qs from 'qs';
import client from './client';

export const writeTestInfo = ({ testName, testDate }) => {
  return client.post('/api/testinfo', { testName, testDate });
};

export const readTestInfo = id => {
  client.get(`/api/testinfo/${id}`);
};

export const listTestInfo = ({ page }) => {
  const pageQueryString = qs.stringify({ page });
  return client.get(`/api/testinfo?${pageQueryString}`);
};

export const updateTestInfo = ({
  testinfoId,
  testName,
  testCode,
  testDate,
}) => {
  console.log('api', testinfoId, testName, testDate);
  return client.patch(`/api/testinfo/${testinfoId}`, {
    testName,
    testCode,
    testDate,
  });
};

export const removeTestInfo = id => {
  const res = client.delete(`/api/testinfo/${id}`);
  return res;
};

export const deleteAllData = async () => {
  const res = await client.delete('/api/testinfo/');
  // console.log(res);
  return res;
};

export const getTestImages = async testName => {
  const res = await client.get(`/api/testimg/${encodeURI(testName)}`);
  // console.log(res.data);
  return res.data;
};

export const generateTestInfo = async () =>{
  const res = await client.get('/api/prepare/testinfo');
  return res;
}

/**
 * todo : testinfo 에서 score 로 소속을 옮겨야?
 */
export const generateEmptyScoreInfo = async () => {
  const res = await client.get('/api/prepare/scores')
  return res;
}
