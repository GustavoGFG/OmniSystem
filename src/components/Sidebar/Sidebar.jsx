import { links } from '@/data/homeLinks';
import React from 'react';
import SidebarLink from './SidebarLink';
import { ToggleGroup } from '@/components/ui/toggle-group';

const Sidebar = ({ sidebarActive }) => {
  return (
    <ToggleGroup type="single">
      <ul
        className={`py-[15px] px-[30px] self-start h-full w-[350px] bg-newPrimary flex flex-col gap-[20px] relative ${
          sidebarActive
            ? 'translate-x-[-350px] xl:translate-x-[0px]'
            : 'translate-x-[0px] xl:translate-x-[-350px]'
        } duration-500 z-10`}
      >
        {links.map((link, index) => (
          <SidebarLink key={index} props={link} />
        ))}
      </ul>
    </ToggleGroup>
  );
};

export default Sidebar;
