import React, { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';

const Card = ({ props, children }) => {
  const [filter, setFilter] = useState(
    props.filterArray ? props.filterArray[0].value : ''
  );

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
        )}
      </div>
      {children(props.filterArray ? { ...props, filter } : props)}
    </div>
  );
};

export default Card;
