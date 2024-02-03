import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const LoginStore = () => {
  return (
    <div className="min-h-screen w-full flex flex-col-reverse  px-2  py-[80px] items-center justify-center gap-[60px] md:flex-row 2xl:px-[400px] xl:px-[200px] lg:px-[100px] md:px-5">
      <div className="flex-col items-center justify-center flex-1 px-[0%] w-[330px] md:w-[400px] m-auto">
        <h1 className="text-4xl mb-8 font-nunito text-emerald-900 font-bold">
          OMNI SYSTEM
        </h1>
        <p className="text-[30px] leading-[1.5]  tracking-[0.3px] font-caveat text">
          Uniting business excellence through streamlined operations. Elevate
          efficiency with seamless integration of sales, stock, and expiry
          control.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center py-[100px] gap-6 w-[400px] max-w-full h-full max-h-[600px] bg-[white] shadow-md shadow-emerald-900 rounded-md px-10">
        <Avatar className="w-[120px] h-[120px] mb-10">
          <AvatarImage src="https://logodownload.org/wp-content/uploads/2014/07/Starbucks-logo.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <select
          name=""
          id=""
          className="border-[1px] bg-zinc-50 w-full border-zinc-400 px-4 py-1 rounded-md min-h-[40px]"
        >
          <option value="200">200 - Aeroporto Confins P1</option>
          <option value="201">201 - Aeroporto Confins P2</option>
          <option value="202">202 - Aeroporto Confins Mezanino</option>
        </select>
        <input
          type="text"
          name="password"
          className="border-[1px] bg-zinc-50 w-full border-zinc-400 px-4 py-1 rounded-md min-h-[40px]"
          placeholder="Password"
        />
        <Link className="w-full" to="/home">
          <Button className="bg-newPrimary text-white font-bold w-full mt-[30px]">
            Login
          </Button>
        </Link>
        <a href="#" className="text-[#1877f2]">
          Forgot Passoword?
        </a>
      </div>
    </div>
  );
};

export default LoginStore;
