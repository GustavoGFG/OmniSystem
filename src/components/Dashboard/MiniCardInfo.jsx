import { transformToCurrency, transformToPercentage } from '@/utils/utils';
import React from 'react';
import { Skeleton } from '../ui/skeleton';

const MiniCardInfo = ({ props }) => {
  console.log(props.value);
  return (
    <div className="flex gap-3">
      {props.value && !isNaN(props.value) && (
        <>
          <div className="h-[60px] w-[60px] bg-slate-100 rounded-full flex items-center justify-center">
            <span className="text-newPrimary">{props.icon}</span>
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
                transformToCurrency(props.value)}
              {props.title === 'Agregações' &&
                transformToPercentage(props.value, 1)}
            </p>
            <p className="font-semibold text-sm">
              {props.title === 'Transações' && props.reference}
              {(props.title === 'Ticket Médio' || props.title === 'Venda') &&
                transformToCurrency(props.reference)}
              {props.title === 'Agregações' &&
                transformToPercentage(props.reference, 1)}
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
            <p>{transformToPercentage(props.value / props.reference - 1, 0)}</p>
          </div>
        </>
      )}
      {(!props.value || isNaN(props.value)) && (
        <>
          <Skeleton className="h-[60px] w-[60px] rounded-full" />
          <div className="p-[4px] w-full flex-1 flex flex-col gap-2">
            <Skeleton className="h-[25px] w-[120px]" />

            <Skeleton className="h-[18px] w-[90px]" />
          </div>
          <div
            className={`flex gap-1 items-center py-[10px] ${
              props.value >= props.reference
                ? 'text-newPrimary'
                : 'text-destructive'
            } `}
          >
            <Skeleton className="h-[25px] w-[40px]" />
          </div>
        </>
      )}
    </div>
  );
};

export default MiniCardInfo;
