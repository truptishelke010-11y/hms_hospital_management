import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import PatientSearch from './PatientSearch';
import DoctorsDirectory from './DoctorsDirectory';
import PaymentHistory from './PaymentHistory';
import PatientDetails from './PatientDetails';
import RoomManagement from './RoomManagement';
import AppointmentBooking from './AppointmentBooking';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={!isLoggedIn ? <Login onLogin={() => setIsLoggedIn(true)} /> : <Navigate to="/" />} />
          <Route path="/" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/patients" element={isLoggedIn ? <PatientSearch /> : <Navigate to="/login" />} />
          <Route path="/doctors" element={isLoggedIn ? <DoctorsDirectory /> : <Navigate to="/login" />} />
          <Route path="/payments" element={isLoggedIn ? <PaymentHistory /> : <Navigate to="/login" />} />
          <Route path="/patient/:id" element={isLoggedIn ? <PatientDetails /> : <Navigate to="/login" />} />
          <Route path="/rooms" element={isLoggedIn ? <RoomManagement /> : <Navigate to="/login" />} />
          <Route path="/booking" element={isLoggedIn ? <AppointmentBooking /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
