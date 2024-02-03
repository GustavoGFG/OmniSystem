import React from 'react';

const Card = ({ props, children }) => {
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
        <span>...</span>
      </div>
      {children(props)}
    </div>
  );
};

export default Card;
