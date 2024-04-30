import Header from '@/components/Global/Header/Header';
import Sidebar from '@/components/Global/Sidebar/Sidebar';
import { DataContext } from '@/contexts/DataContext';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

const Home = () => {
  const [sidebarActive, setSidebarActive] = useState(true);
  return (
    <DataContext.Provider value={{}}>
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
