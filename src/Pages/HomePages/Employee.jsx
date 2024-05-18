import Card from '@/components/Global/Card';
import React from 'react';
import { Form_Employee } from '@/components/Employee/Forms/Form_Employee';
import { Form_Modal } from '@/components/Global/Form_Modal';
import { Table_Employee } from '@/components/Employee/Tables/Table_Employee';
import { Toast } from '@/components/ui/toast';
import { Toaster } from '@/components/ui/toaster';
import { PlusCircle } from 'lucide-react';

const Employee = () => {
  return (
    <>
      <div className="flex justify-between font-bold text-newPrimary font-nunito text-2xl mb-[30px] px-[10px]">
        <h2 className="flex items-center">Colaboradores e Certificações</h2>
      </div>
      <div className="flex justify-between font-bold text-newPrimary font-nunito text-2xl mb-[30px] px-[10px]">
        <Form_Modal
          icon={<PlusCircle className="w-5" />}
          button_title="Novo Colaborador"
          modal_title="Novo Colaborador"
          modal_description="Cadastre um novo colaborador"
          children={Form_Employee}
          width={400}
        />
      </div>

      <div id="table">
        <Card
          props={{
            title: 'Colaboradores',
            date: 'Hoje',
            filterArray: [
              { label: 'Nome', value: 'full_name' },
              { label: 'Cargo', value: 'role' },
              { label: 'Admissão', value: 'hire_date' },
              { label: 'Demissão', value: 'resign_date' },
              { label: 'Ticket Médio', value: 'average_ticket' },
              { label: 'Erro de Caixa', value: 'mistake' },
            ],
          }}
          children={data => <Table_Employee props={data} />}
        />
      </div>
      <Toaster />
    </>
  );
};

export default Employee;
