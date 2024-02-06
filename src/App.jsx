import './App.css';

import LoginStore from './Pages/LoginStore';
import Home from '@/Pages/Home';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'remixicon/fonts/remixicon.css';
import Dashboard from './Pages/HomePages/Dashboard';
import DSR from './Pages/HomePages/DSR';
import Employee from './Pages/HomePages/Employee';

function App() {
  return (
    <div className="min-h-screen bg-[var(--bgColor)]">
      <Routes>
        <Route path="/" element={<LoginStore />} />
        <Route path="home" element={<Home />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="salesreport" element={<DSR />} />
          <Route path="employees" element={<Employee />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
