import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { login, signup } from '@/api/login-signup';
import { useState } from 'react';

const LoginStore = () => {
  const [registered, setRegistered] = useState(true);
  const [loading, setLoading] = useState(false);
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    const response = await login(cpf, password, navigate);
    setLoading(false);
    if (response) {
      navigate('/home/dashboard'); // Redirect to '/home/dashboard' after successful login
    }
  };
  const handleSignup = async () => {
    setLoading(true);
    const response = await signup(cpf, password, navigate);
    setLoading(false);
    if (response) {
      navigate('/home/dashboard'); // Redirect to '/home/dashboard' after successful login
    }
  };

  return (
    <div className="overflow-y-hidden lg:max-h-screen min-h-screen w-full flex flex-col  px-2  py-[80px] items-center justify-center gap-0 md:gap-[60px] md:flex-row 2xl:px-[400px] xl:px-[200px] lg:px-[100px] md:px-5">
      <img
        src="../public/logo.png"
        className="fixed left-0 bottom-0 translate-x-[-30%] translate-y-[30%] w-[60vw] blur-lg opacity-20 md:block hidden"
      ></img>
      <div className="flex-col text-center md:text-start items-center justify-center md:flex-1 px-[0%] w-[330px] md:w-[400px] md:m-auto">
        <h1 className="text-4xl mb-8 font-nunito text-newPrimary font-bold">
          OMNI SYSTEM
        </h1>
        <p className="text-[30px] leading-[1.5]  tracking-[0.3px] font-caveat text hidden md:block">
          Uniting business excellence through streamlined operations. Elevate
          efficiency with seamless integration of sales, stock, and expiry
          control.
        </p>
      </div>
      <div className="z-1 m-0 flex flex-col items-center justify-center py-[100px] gap-6 w-[400px] max-w-full h-full max-h-[600px] bg-[white] shadow-md shadow-emerald-900 rounded-md px-10">
        <Avatar className="w-[150px] h-[150px] mb-10 overflow-visible">
          {/* <AvatarImage src="https://logodownload.org/wp-content/uploads/2014/07/Starbucks-logo.png" /> */}
          <AvatarImage src="../public/logo.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <input
          type="text"
          name="cpf"
          className="border-[1px] bg-zinc-50 w-full border-zinc-400 px-4 py-1 rounded-md min-h-[40px]"
          placeholder="CPF"
          value={cpf}
          onChange={e => setCpf(e.target.value)}
          disabled={loading}
        />

        <input
          type="password"
          name="password"
          className="border-[1px] bg-zinc-50 w-full border-zinc-400 px-4 py-1 rounded-md min-h-[40px]"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          disabled={loading}
        />
        <Button
          className="w-full"
          variant={'omnisystem'}
          onClick={() => {
            registered
              ? handleLogin(cpf, password)
              : handleSignup(cpf, password);
          }}
          disabled={loading}
        >
          {registered ? 'Login' : 'Sign up'}
        </Button>
        <div className="text-gray-500">
          {registered ? 'Not registered?' : 'Already registered?'}{' '}
          <button
            className="text-newPrimary cursor-pointer disabled:cursor-not-allowed disabled:text-gray-300"
            onClick={() => setRegistered(!registered)}
            disabled={loading}
          >
            {registered ? 'Create an account' : 'Login'}
          </button>
        </div>
        <button
          href="#"
          className="text-newPrimary cursor-pointer disabled:cursor-not-allowed disabled:text-gray-300"
          disabled={loading}
        >
          Forgot Password?
        </button>
      </div>
    </div>
  );
};

export default LoginStore;
