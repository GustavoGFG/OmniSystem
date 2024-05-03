import { getEmployees } from '@/api/employees';
import { getGoals } from '@/api/goals';
import { getMistakes } from '@/api/mistakes';
import { getSales } from '@/api/sales';
import Header from '@/components/Global/Header/Header';
import Sidebar from '@/components/Global/Sidebar/Sidebar';
import { DataContext } from '@/contexts/DataContext';
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

const Home = () => {
  const [sidebarActive, setSidebarActive] = useState(true);
  const [sales, setSales] = useState([]);
  const [mistakes, setMistakes] = useState([]);
  const [goals, setGoals] = useState([]);
  const [employee, setEmployee] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const salesData = await getSales();
      const mistakesData = await getMistakes();
      const goalsData = await getGoals();
      const employeeData = await getEmployees();

      if (salesData.success) setSales(salesData.data);
      if (mistakesData.success) setMistakes(mistakesData.data);
      if (goalsData.success) setGoals(goalsData.data);
      if (employeeData.success) setEmployee(employeeData.data);
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        sales,
        setSales,
        mistakes,
        setMistakes,
        goals,
        setGoals,
        employee,
        setEmployee,
      }}
    >
      <Header
        sidebarActive={sidebarActive}
        setSidebarActive={setSidebarActive}
      />
      <main className="flex min-h-[calc(100vh-60px)] ">
        <Sidebar
          sidebarActive={sidebarActive}
          setSidebarActive={setSidebarActive}
        />
        <div
          className={`py-[15px] px-[20px] flex-1 w-full fixed right-[0px] bottom-[0px] top-[60px] left-[0px] overflow-y-auto ${
            sidebarActive
              ? 'xl:left-[350px] xl:w-[calc(100%-350px)]'
              : 'xl:left-[0px] xl:w-full'
          } duration-500 `}
        >
          <Outlet />
        </div>
      </main>
    </DataContext.Provider>
  );
};

export default Home;
