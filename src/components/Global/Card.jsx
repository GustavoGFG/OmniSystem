import React, { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { ArrowUp } from 'lucide-react';

const Card = ({ props, children }) => {
  const [filter, setFilter] = useState(
    props.filterArray ? props.filterArray[0].value : ''
  );
  const [ascendent, setAscendent] = useState(false);

  return (
    <div className="bg-white p-[10px] md:p-[20px] overflow-hidden shadow-md rounded-md w-full flex flex-col h-full gap-[10px] md:gap-[20px]">
      <div className="flex justify-between">
        <p className="text-newPrimary font-bold">
          {props.title}
          <span className="font-light text-gray-400 text-[14px]">
            {' '}
            | {props.date}
          </span>
        </p>
        {props.filterArray && (
          <div className="flex items-center gap-2">
            <ArrowUp
              className={`${ascendent ? '' : 'rotate-180'} text-black/30 hover:text-black cursor-pointer transition-all duration-300 transform`}
              onClick={() => {
                setAscendent(!ascendent);
              }}
            />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue defaultValue={filter} />
              </SelectTrigger>
              <SelectContent>
                {props.filterArray.map((item, i) => (
                  <SelectItem key={i} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      {children(props.filterArray ? { ...props, filter, ascendent } : props)}
    </div>
  );
};

export default Card;
