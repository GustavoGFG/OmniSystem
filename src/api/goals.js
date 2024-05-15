import { req, reqdev } from './axios';

export const getGoals = async () => {
  try {
    const json = await req.get('/salesgoal');
    return json.data;
  } catch (error) {
    alert(error.response.data.error);
    return false;
  }
};

export const addGoals = async data => {
  try {
    const os_token = localStorage.getItem('os_token');
    const json = await req.post('/salesgoal', data, {
      headers: { Authorization: `Bearer ${os_token}` },
    });
    return json.data;
  } catch (error) {
    if (error.response.data.error == 'There is a unique constraint violation') {
      return { success: false, error: 'Data já cadastrada' };
    }
    return { success: false, error: error.response.data.error };
  }
};
