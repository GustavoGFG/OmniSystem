import { req } from './axios';

export const signup = async (cpf, password) => {
  try {
    const json = await req.post('/signup', { cpf, password });

    localStorage.setItem('os_token', json.data.token);
    return { success: true, token: json.data.token };
  } catch (error) {
    // alert(error.response.data.error);
    // return false;
    return { success: false, error: error.response.data.error };
  }
};

export const login = async (cpf, password, navigate) => {
  try {
    const json = await req.post('/login', { cpf, password });
    console.log(json);
    localStorage.setItem('os_token', json.data.token);
    return { success: true, token: json.data.token };
  } catch (error) {
    // alert(error.response.data.error);
    return { success: false, error: error.response.data.error };
  }
};
