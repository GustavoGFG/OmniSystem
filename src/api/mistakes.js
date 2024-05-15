import { req, reqdev } from './axios';

export const getMistakes = async () => {
  try {
    const json = await req.get('/mistake');
    return json.data;
  } catch (error) {
    alert(error.response.data.error);
    return false;
  }
};

export const addMistakes = async array => {
  try {
    const os_token = localStorage.getItem('os_token');
    const json = await req.post('/upsertmistakes', array, {
      headers: { Authorization: `Bearer ${os_token}` },
    });
    return json.data;
  } catch (error) {
    if (
      (error.response.data.error = 'There is a unique constraint violation')
    ) {
      return { success: false, error: 'Data já cadastrada' };
    }
    return { success: false, error: 'Erro no servidor' };
  }
};
