import ProductCard from '@/components/ExpiryControl/ProductCard';
import { category, expiryDates, product } from '@/data/expiryControl';
import { sortByKey } from '@/utils/utils';
import React from 'react';

const ExpiryControl = () => {
  const array = expiryDates.map(item => {
    item['date'] = new Date(item.expiry_date);
    item['days_left'] = Math.ceil(
      (new Date(item.expiry_date) - new Date()) / (1000 * 60 * 60 * 24)
    );
    item['remove_days_before_expire'] = category.find(category => {
      return (
        category.id ==
        product.find(product => {
          return product.id == item.product_id;
        }).category_id
      );
    }).remove_days_before_expire;
    console.log(item.days_left);
    return item;
  });
  return (
    <div className="flex flex-col gap-4">
      {sortByKey(array, 'date').map((date, index) => {
        return <ProductCard key={index} date={date} />;
      })}
    </div>
  );
};

export default ExpiryControl;
