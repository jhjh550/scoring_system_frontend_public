import qs from 'qs';
import client from './client';

export const writeCriteria = ({ question, details }) => {
  return client.post('/api/criteria', { question, details });
};

export const readCriteria = id => {
  client.get(`/api/criteria/${id}`);
};

export const listCriteria = ({
  page,
  testName,
  testinfoId,
  userId,
  scoreAuth,
}) => {
  const queryString = qs.stringify({
    page,
    testinfoId,
    testName,
    userId,
    scoreAuth,
  });
  //console.log("queryString", queryString);
  return client.get(`/api/criteria?${queryString}`);
};

export const updateCriteria = ({ criteriaId, question, details }) => {
  return client
    .patch(`/api/criteria/${criteriaId}`, {
      question,
      details,
    })
    .catch(error => {
      console.log('update check', error);
    });
};

export const removeCriteria = id => client.delete(`/api/criteria/${id}`);

export const updateCriterias = async ({ criterias, changedCriterias }) => {
  console.log('changedCriterias', changedCriterias);
  const obj = await client.patch('/api/criteria', { changedCriterias });
  //console.log('api updateCriterias', obj);
  return obj;
};
