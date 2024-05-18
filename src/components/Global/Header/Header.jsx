import React from 'react';
import { RiMenuLine, RiArrowDownSFill } from '@remixicon/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dropdown } from './Dropdown';

const Header = ({ sidebarActive, setSidebarActive }) => {
  return (
    <header className="bg-white shadow-md relative z-10 h-[60px] px-[10px] sm:px-[30px] flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-xl sm:text-3xl font-nunito text-newPrimary font-bold md:w-[320px] mr-[20px]">
          OmniSystem
        </h1>
        <RiMenuLine
          size={30}
          className="text-newPrimary cursor-pointer"
          onClick={() => setSidebarActive(!sidebarActive)}
        />
      </div>
      <div className="flex items-center gap-3">
        <Avatar>
          {/* <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D" /> */}
          <AvatarImage src="../profile-3.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        {/* <p className="flex text-md font-roboto text-newPrimary font-semibold items-center">
          Rafael M. <RiArrowDownSFill size={20} />
        </p> */}
        <Dropdown />
      </div>
    </header>
  );
};

export default Header;
