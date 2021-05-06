import mainAxios from '../axios/main-axios';

const createActivity = async (token, newActivity) => {
  const createActivityResult = await mainAxios.post(
    '/activities',
    newActivity,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return createActivityResult;
};

const updateActivity = (token, id, activity) => {
  const url = `/activities/${id}`;
  const updateActivityResult = mainAxios
    .put(url, activity, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.data);

  return updateActivityResult;
};

export { createActivity, updateActivity };
