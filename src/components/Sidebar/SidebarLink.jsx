import React from 'react';
import { Link } from 'react-router-dom';
import { ToggleGroupItem } from '@/components/ui/toggle-group';

const SidebarLink = ({ props }) => {
  return (
    <Link to={props.page}>
      <ToggleGroupItem
        value={props.name}
        aria-label={`Toggle ${props.name}`}
        className="w-full"
      >
        <li className=" font-bold h-[45px] w-full rounded-md px-[15px] flex items-center gap-[10px]">
          <i className={` text-[30px] ${props.icon}`}></i>
          <span>{props.name}</span>
        </li>
      </ToggleGroupItem>
    </Link>
  );
};

export default SidebarLink;
