import { req } from './axios';

export const signup = async (cpf, password) => {
  try {
    const json = await req.post('/signup', { cpf, password });
    return json.data ?? false;
  } catch (error) {
    alert(error.response.data.error);
    return false;
  }
};

export const login = async (cpf, password, navigate) => {
  try {
    const json = await req.post('/login', { cpf, password });
    localStorage.setItem('os_token', json.data.token);
    return json.data.token ?? false;
  } catch (error) {
    alert(error.response.data.error);
    return false;
  }
};
