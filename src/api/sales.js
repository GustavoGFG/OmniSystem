import { req, reqdev } from './axios';

export const getSales = async () => {
  try {
    const json = await req.get('/dailysale');
    return json.data;
  } catch (error) {
    alert(error.response.data.error);
    return false;
  }
};

export const addSales = async array => {
  try {
    const os_token = localStorage.getItem('os_token');
    const json = await req.post('/upsertsales', array, {
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
