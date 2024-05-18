import { category, product } from '@/data/expiryControl';
import { transformToCurrency, transformToPercentage } from '@/utils/utils';
import { format } from 'date-fns';
import { Trash, Trash2 } from 'lucide-react';
import React from 'react';
import Card from '../Global/Card';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';

const ProductCard = ({ date }) => {
  return (
    <div className="bg-white p-[10px] md:p-[20px] overflow-hidden shadow-md rounded-md w-full flex h-full gap-[10px] md:gap-[20px] justify-between items-center">
      <div className="flex gap-4">
        <img
          src={
            product.find(item => {
              return item.id == date.product_id;
            }).image
          }
          className="w-[60px] h-[60px] rounded-md shadow-black/30 shadow-md"
        />
        <div className="flex flex-col justify-between py-1 text-[12px] md:text-sm text-slate-800/80">
          <h2>
            {
              product.find(item => {
                return item.id == date.product_id;
              }).name
            }
          </h2>
          <p>
            Validade:{' '}
            <span className="font-bold text-black">
              {format(date.expiry_date, 'dd/MM/yyyy')}
            </span>
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1 md:gap-4 text-[12px] md:text-sm">
        <div className="flex flex-col md:flex-row min-w-[60px]">
          {date.days_left < 0 && (
            <p className="font-bold text-red-500">Vencido</p>
          )}
          {date.days_left >= 0 && (
            <>
              <p className=" text-slate-800/80">{'Vence em:  '}</p>
              <span
                className={`${date.days_left <= date.remove_days_before_expire ? 'text-red-500' : 'text-green-600'} font-bold`}
              >
                {`${date.days_left} ${date.days_left == 1 ? 'dia' : 'dias'}`}
              </span>
            </>
          )}
        </div>
        <Button className="disabled:opacity-10" variant="ghost" type="button">
          <Trash2 />
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
