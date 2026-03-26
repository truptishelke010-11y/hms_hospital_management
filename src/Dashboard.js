import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, 
  BarChart, Bar, PieChart, Pie, Cell, Legend 
} from 'recharts';
import { 
  Users, Calendar, Clock, Search, Activity, Pill, UserPlus, 
  DollarSign, Bed, CheckCircle, XCircle, AlertCircle, 
  Stethoscope, CreditCard, CalendarDays, ArrowRight
} from 'lucide-react';
import './Dashboard.css';

// Mock data
const revenueData = [
  { month: 'Jan', revenue: 45000, patients: 120 },
  { month: 'Feb', revenue: 52000, patients: 145 },
  { month: 'Mar', revenue: 48000, patients: 132 },
  { month: 'Apr', revenue: 61000, patients: 168 },
  { month: 'May', revenue: 55000, patients: 155 },
  { month: 'Jun', revenue: 67000, patients: 182 },
];

const patientFlowData = [
  { day: 'Mon', admissions: 12, discharges: 8 },
  { day: 'Tue', admissions: 18, discharges: 15 },
  { day: 'Wed', admissions: 15, discharges: 12 },
  { day: 'Thu', admissions: 22, discharges: 18 },
  { day: 'Fri', admissions: 20, discharges: 16 },
  { day: 'Sat', admissions: 10, discharges: 14 },
  { day: 'Sun', admissions: 8, discharges: 10 },
];

const appointmentStatusData = [
  { name: 'Pending', value: 15, color: '#f59e0b' },
  { name: 'Completed', value: 42, color: '#10b981' },
  { name: 'Cancelled', value: 8, color: '#ef4444' },
];

const todayAppointments = [
  { id: 1, time: '09:00 AM', patient: 'Rahul Sharma', doctor: 'Dr. Sarah Johnson', type: 'General Checkup', status: 'pending' },
  { id: 2, time: '10:30 AM', patient: 'Priya Patel', doctor: 'Dr. Michael Chen', type: 'Cardiology', status: 'confirmed' },
  { id: 3, time: '11:00 AM', patient: 'Amit Kumar', doctor: 'Dr. Emily White', type: 'Orthopedics', status: 'pending' },
  { id: 4, time: '02:00 PM', patient: 'Sunita R.', doctor: 'Dr. Sarah Johnson', type: 'Follow-up', status: 'confirmed' },
  { id: 5, time: '03:30 PM', patient: 'Raj Malhotra', doctor: 'Dr. David Lee', type: 'Neurology', status: 'pending' },
];

const roomData = {
  total: 50,
  available: 12,
  occupied: 38,
  categories: [
    { type: 'General', total: 20, occupied: 14, available: 6 },
    { type: 'Private', total: 15, occupied: 12, available: 3 },
    { type: 'ICU', total: 10, occupied: 8, available: 2 },
    { type: 'Emergency', total: 5, occupied: 4, available: 1 },
  ]
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/patients?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const stats = [
    { icon: Users, label: 'Total Patients', value: '2,015', color: '#3b82f6', bg: '#dbeafe' },
    { icon: Calendar, label: 'Today\'s Appointments', value: '65', color: '#8b5cf6', bg: '#ede9fe' },
    { icon: Clock, label: 'Upcoming', value: '15', color: '#f59e0b', bg: '#fef3c7' },
    { icon: Activity, label: 'Daily Reviews', value: '85%', color: '#10b981', bg: '#d1fae5' },
    { icon: DollarSign, label: 'Revenue (Monthly)', value: '$67,000', color: '#06b6d4', bg: '#cffafe' },
    { icon: Bed, label: 'Room Occupancy', value: '76%', color: '#ec4899', bg: '#fce7f3' },
  ];

  return (
    <div className="dash-container">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-icon">🏥</span>
          <span className="brand-text">Medicare+</span>
        </div>
        <nav className="nav-menu">
          <div className="nav-link active" onClick={() => navigate('/')}>
            <Activity size={20} /> Dashboard
          </div>
          <div className="nav-link" onClick={() => navigate('/patients')}>
            <Users size={20} /> Patients
          </div>
          <div className="nav-link" onClick={() => navigate('/doctors')}>
            <Stethoscope size={20} /> Doctors
          </div>
          <div className="nav-link" onClick={() => navigate('/rooms')}>
            <Bed size={20} /> Rooms
          </div>
          <div className="nav-link" onClick={() => navigate('/booking')}>
            <CalendarDays size={20} /> Book Appointment
          </div>
          <div className="nav-link" onClick={() => navigate('/payments')}>
            <CreditCard size={20} /> Payments
          </div>
        </nav>
        <div className="sidebar-footer">
          <p>© 2026 Medicare+</p>
        </div>
      </aside>

      <main className="main-area">
        <header className="header">
          <form className="search-bar" onSubmit={handleSearch}>
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search patients by name or ID..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <div className="header-right">
            <div className="datetime">
              <span className="date">{currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span className="time">{currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <button className="add-btn" onClick={() => navigate('/booking')}>
              <UserPlus size={18} /> New Patient
            </button>
            <div className="avatar">AD</div>
          </div>
        </header>

        <div className="dashboard-content">
          {/* Stats Row */}
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div className="stat-card" key={index} style={{ '--accent-color': stat.color, '--accent-bg': stat.bg }}>
                <div className="stat-icon" style={{ background: stat.bg, color: stat.color }}>
                  <stat.icon size={24} />
                </div>
                <div className="stat-info">
                  <h3>{stat.value}</h3>
                  <p>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="charts-row">
            <div className="card chart-card">
              <div className="card-header">
                <h3>Revenue Trends</h3>
                <span className="card-subtitle">Last 6 months</span>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                  <Tooltip 
                    formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="card chart-card">
              <div className="card-header">
                <h3>Patient Flow Analysis</h3>
                <span className="card-subtitle">This week</span>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={patientFlowData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Legend />
                  <Bar dataKey="admissions" name="Admissions" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="discharges" name="Discharges" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Room & Appointments Row */}
          <div className="info-row">
            {/* Room Availability */}
            <div className="card room-card">
              <div className="card-header">
                <h3><Bed size={20} /> Room Availability</h3>
                <button className="view-all-btn" onClick={() => navigate('/rooms')}>View All <ArrowRight size={16} /></button>
              </div>
              <div className="room-summary">
                <div className="room-stat">
                  <span className="room-number available">{roomData.available}</span>
                  <span className="room-label">Available</span>
                </div>
                <div className="room-stat">
                  <span className="room-number occupied">{roomData.occupied}</span>
                  <span className="room-label">Occupied</span>
                </div>
                <div className="room-stat">
                  <span className="room-number total">{roomData.total}</span>
                  <span className="room-label">Total</span>
                </div>
              </div>
              <div className="room-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${(roomData.occupied / roomData.total) * 100}%` }}></div>
                </div>
                <span className="occupancy-text">{Math.round((roomData.occupied / roomData.total) * 100)}% Occupancy</span>
              </div>
              <div className="room-categories">
                {roomData.categories.map((cat, idx) => (
                  <div className="room-category" key={idx}>
                    <span className="cat-name">{cat.type}</span>
                    <div className="cat-bars">
                      <div className="cat-bar occupied" style={{ width: `${(cat.occupied / cat.total) * 100}%` }}></div>
                      <div className="cat-bar available" style={{ width: `${(cat.available / cat.total) * 100}%` }}></div>
                    </div>
                    <span className="cat-count">{cat.available}/{cat.total}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Appointment Status Pie Chart */}
            <div className="card appointment-pie-card">
              <div className="card-header">
                <h3>Appointments Overview</h3>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={appointmentStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {appointmentStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="pie-legend">
                {appointmentStatusData.map((item, index) => (
                  <div className="legend-item" key={index}>
                    <span className="legend-dot" style={{ background: item.color }}></span>
                    <span className="legend-label">{item.name}</span>
                    <span className="legend-value">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Today's Appointments */}
            <div className="card appointments-card">
              <div className="card-header">
                <h3><CalendarDays size={20} /> Today's Appointments</h3>
                <span className="appointment-count">{todayAppointments.length} total</span>
              </div>
              <div className="appointments-list">
                {todayAppointments.map((apt) => (
                  <div className="appointment-item" key={apt.id}>
                    <div className="apt-time">
                      <Clock size={14} />
                      {apt.time}
                    </div>
                    <div className="apt-details">
                      <h4>{apt.patient}</h4>
                      <p>{apt.doctor} • {apt.type}</p>
                    </div>
                    <div className={`apt-status ${apt.status}`}>
                      {apt.status === 'confirmed' ? <CheckCircle size={16} /> : <Clock size={16} />}
                      {apt.status}
                    </div>
                  </div>
                ))}
              </div>
              <button className="view-all-btn full-width" onClick={() => navigate('/booking')}>
                View All Appointments <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <h3>Quick Actions</h3>
            <div className="actions-grid">
              <button className="action-btn" onClick={() => navigate('/booking')}>
                <CalendarDays size={24} />
                <span>Book Appointment</span>
              </button>
              <button className="action-btn" onClick={() => navigate('/patients')}>
                <Users size={24} />
                <span>Patient Records</span>
              </button>
              <button className="action-btn" onClick={() => navigate('/rooms')}>
                <Bed size={24} />
                <span>Room Management</span>
              </button>
              <button className="action-btn" onClick={() => navigate('/payments')}>
                <CreditCard size={24} />
                <span>Payment History</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
