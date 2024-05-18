import FormikGoal from '@/components/DSR/FormikGoal';
import ProductCard from '@/components/ExpiryControl/ProductCard';
import { Form_Modal } from '@/components/Global/Form_Modal';
import { category, expiryDates, product } from '@/data/expiryControl';
import { sortByKey } from '@/utils/utils';
import { CalendarClock, Package, PlusCircle, Tags } from 'lucide-react';
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
    return item;
  });
  return (
    <>
      <div className="flex justify-between font-bold text-newPrimary font-nunito text-2xl mb-[30px] px-[10px]">
        <h2 className="flex items-center">Controle de Validades</h2>
      </div>
      <div className="flex gap-4 justify-end">
        <Form_Modal
          icon={<CalendarClock className="w-5" />}
          button_title="Nova Validade"
          modal_title="Validade"
          modal_description="Registre o vencimento de um produto"
          children={FormikGoal}
          width={400}
        />
        <Form_Modal
          icon={<Package className="w-5" />}
          button_title="Novo Produto"
          modal_title="Produto"
          modal_description="Registre um novo produto"
          children={FormikGoal}
          width={400}
        />
        <Form_Modal
          icon={<Tags className="w-5" />}
          button_title="Nova Categoria"
          modal_title="Categoria"
          modal_description="Registre uma nova categoria"
          children={FormikGoal}
          width={400}
        />
      </div>
      <div className="flex flex-col gap-4">
        {sortByKey(array, 'date').map((date, index) => {
          return <ProductCard key={index} date={date} />;
        })}
      </div>
    </>
  );
};

export default ExpiryControl;
