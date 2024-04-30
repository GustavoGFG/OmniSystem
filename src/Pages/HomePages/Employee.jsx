import Card from '@/components/Global/Card';
import React, { useEffect, useState } from 'react';
import { Form_Employee } from '@/components/Employee/Forms/Form_Employee';
import { getEmployees } from '@/api/employees';
import { Form_Modal } from '@/components/Global/Form_Modal';
import { Table_Employee } from '@/components/Employee/Tables/Table_Employee';

const Employee = () => {
  const [staff, setStaff] = useState([]);

  const fetchEmployeesSql = async () => {
    const response = await getEmployees();
    if (response.success) {
      setStaff(response.data);
    }
  };

  useEffect(() => {
    fetchEmployeesSql();
  }, []);

  return (
    <>
      <div className="flex justify-between font-bold text-newPrimary font-nunito text-2xl mb-[30px] px-[10px]">
        <h2 className="flex items-center">Colaboradores e Certificações</h2>
      </div>
      <div className="flex justify-between font-bold text-newPrimary font-nunito text-2xl mb-[30px] px-[10px]">
        <Form_Modal
          button_title="Novo Colaborador"
          modal_title="Novo Colaborador"
          modal_description="Cadastre um novo colaborador"
          children={setStaff => <Form_Employee child_props={setStaff} />}
          child_props={setStaff}
          width={400}
        />
      </div>

      <div id="table">
        <Card
          props={{
            title: 'Colaboradores',
            date: 'Hoje',
            staff: staff,
            filterArray: [
              { label: 'Nome', value: 'full_name' },
              { label: 'Cargo', value: 'role' },
              { label: 'Contratação', value: 'hire_date' },
              { label: 'Vendas', value: 'Sale' },
              { label: 'Ticket Médio', value: 'at' },
              { label: 'Erro de Caixa', value: 'Mistake' },
            ],
          }}
          children={data => <Table_Employee props={data} />}
        />
      </div>
    </>
  );
};

export default Employee;
