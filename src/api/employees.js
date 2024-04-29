import { req } from './axios';

export const getEmployees = async () => {
  try {
    const json = await req.get('/employeedata');
    return json.data;
  } catch (error) {
    alert(error.response.data.error);
    return false;
  }
};

export const addEmployees = async data => {
  try {
    const os_token = localStorage.getItem('os_token');
    const json = await req.post('/employee', data, {
      headers: { Authorization: `Bearer ${os_token}` },
    });
    return json.data;
  } catch (error) {
    if (
      (error.response.data.error = 'There is a unique constraint violation')
    ) {
      return { success: false, error: 'CPF já cadastrado' };
    }
    return { success: false, error: 'Erro no servidor' };
  }
};
