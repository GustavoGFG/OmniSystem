import React from 'react';

const MiniCardInfo = ({ props }) => {
  return (
    <div className="flex gap-3">
      <div className="h-[60px] w-[60px] bg-slate-100 rounded-full flex items-center justify-center">
        <i className={`text-[35px] text-newPrimary ${props.icon}`}></i>
      </div>
      <div className="p-[4px]">
        <p
          className={`${
            props.value >= props.reference
              ? 'text-newPrimary'
              : 'text-destructive'
          } font-semibold text-xl`}
        >
          {props.title === 'Transações' && props.value}
          {(props.title === 'Ticket Médio' || props.title === 'Venda') &&
            'R$ ' +
              props.value.toLocaleString('pt-BR', {
                style: 'decimal',
                minimumFractionDigits: 2,
              })}
          {props.title === 'Agregações' && (props.value * 100).toFixed(0) + '%'}
        </p>
        <p className="font-semibold text-sm">
          {props.title === 'Transações' && props.reference}
          {(props.title === 'Ticket Médio' || props.title === 'Venda') &&
            'R$ ' +
              props.reference.toLocaleString('pt-BR', {
                style: 'decimal',
                minimumFractionDigits: 2,
              })}
          {props.title === 'Agregações' && props.reference * 100 + '%'}
        </p>
      </div>
      <div
        className={`flex gap-1 items-center py-[10px] ${
          props.value >= props.reference
            ? 'text-newPrimary'
            : 'text-destructive'
        } `}
      >
        <i
          className={`text-[14px] ${
            props.value > props.reference
              ? 'ri-arrow-up-fill'
              : 'ri-arrow-down-fill'
          } `}
        ></i>
        <p>
          {Math.abs((100 * (1 - props.value / props.reference)).toFixed(0))}%
        </p>
      </div>
    </div>
  );
};

export default MiniCardInfo;
