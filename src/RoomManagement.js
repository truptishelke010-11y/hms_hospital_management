import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bed, Users, Calendar, Plus, CheckCircle, XCircle,
  Clock, Activity, Filter, Search, Building
} from 'lucide-react';
import './RoomManagement.css';

// Mock room data
const roomData = {
  total: 50,
  available: 12,
  occupied: 38,
  floors: [
    { floor: 'Ground Floor', rooms: [
      { id: 'G-101', type: 'General', status: 'occupied', patient: 'Rahul Sharma', bed: 'Bed A', admitDate: '2026-03-20' },
      { id: 'G-102', type: 'General', status: 'available', patient: null, bed: 'Bed A', admitDate: null },
      { id: 'G-103', type: 'General', status: 'occupied', patient: 'Amit Patel', bed: 'Bed A', admitDate: '2026-03-18' },
      { id: 'G-104', type: 'General', status: 'occupied', patient: 'Vikram Singh', bed: 'Bed B', admitDate: '2026-03-21' },
      { id: 'G-105', type: 'General', status: 'available', patient: null, bed: 'Bed A', admitDate: null },
      { id: 'G-106', type: 'General', status: 'available', patient: null, bed: 'Bed B', admitDate: null },
      { id: 'G-107', type: 'Private', status: 'occupied', patient: 'Raj Malhotra', bed: 'Bed A', admitDate: '2026-03-22' },
      { id: 'G-108', type: 'Private', status: 'available', patient: null, bed: 'Bed A', admitDate: null },
      { id: 'G-109', type: 'Private', status: 'occupied', patient: 'Sunita Kumari', bed: 'Bed B', admitDate: '2026-03-23' },
      { id: 'G-110', type: 'Private', status: 'available', patient: null, bed: 'Bed A', admitDate: null },
    ]},
    { floor: '1st Floor', rooms: [
      { id: 'P-101', type: 'General', status: 'occupied', patient: 'Priya Singh', bed: 'Bed A', admitDate: '2026-03-15' },
      { id: 'P-102', type: 'General', status: 'occupied', patient: 'Meera Nair', bed: 'Bed A', admitDate: '2026-03-24' },
      { id: 'P-103', type: 'General', status: 'available', patient: null, bed: 'Bed A', admitDate: null },
      { id: 'P-104', type: 'General', status: 'occupied', patient: 'John Smith', bed: 'Bed B', admitDate: '2026-03-19' },
      { id: 'P-105', type: 'Private', status: 'occupied', patient: 'Anita Desai', bed: 'Bed A', admitDate: '2026-03-21' },
      { id: 'P-106', type: 'Private', status: 'available', patient: null, bed: 'Bed A', admitDate: null },
      { id: 'P-107', type: 'Private', status: 'occupied', patient: 'Ravi Kumar', bed: 'Bed B', admitDate: '2026-03-22' },
      { id: 'P-108', type: 'Private', status: 'occupied', patient: 'Lisa Thomas', bed: 'Bed A', admitDate: '2026-03-23' },
      { id: 'P-109', type: 'ICU', status: 'occupied', patient: 'Mohammad Khan', bed: 'Bed A', admitDate: '2026-03-24' },
      { id: 'P-110', type: 'ICU', status: 'available', patient: null, bed: 'Bed A', admitDate: null },
    ]},
    { floor: '2nd Floor', rooms: [
      { id: 'ICU-01', type: 'ICU', status: 'occupied', patient: 'Robert Brown', bed: 'Bed A', admitDate: '2026-03-22' },
      { id: 'ICU-02', type: 'ICU', status: 'occupied', patient: 'Jennifer Lee', bed: 'Bed A', admitDate: '2026-03-23' },
      { id: 'ICU-03', type: 'ICU', status: 'occupied', patient: 'Amit Patel', bed: 'Bed B', admitDate: '2026-03-18' },
      { id: 'ICU-04', type: 'ICU', status: 'available', patient: null, bed: 'Bed A', admitDate: null },
      { id: 'ICU-05', type: 'ICU', status: 'occupied', patient: 'Sarah Miller', bed: 'Bed B', admitDate: '2026-03-24' },
      { id: 'ICU-06', type: 'ICU', status: 'available', patient: null, bed: 'Bed A', admitDate: null },
      { id: 'ER-01', type: 'Emergency', status: 'occupied', patient: 'Unknown', bed: 'Bed A', admitDate: '2026-03-25' },
      { id: 'ER-02', type: 'Emergency', status: 'available', patient: null, bed: 'Bed A', admitDate: null },
      { id: 'ER-03', type: 'Emergency', status: 'occupied', patient: 'Mark Wilson', bed: 'Bed B', admitDate: '2026-03-24' },
      { id: 'ER-04', type: 'Emergency', status: 'available', patient: null, bed: 'Bed A', admitDate: null },
    ]}
  ]
};

const roomTypes = ['All', 'General', 'Private', 'ICU', 'Emergency'];

const RoomManagement = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(null);

  const getOccupancyPercentage = () => {
    return Math.round((roomData.occupied / roomData.total) * 100);
  };

  const getStatusIcon = (status) => {
    return status === 'available' 
      ? <CheckCircle size={16} className="status-icon available" />
      : <XCircle size={16} className="status-icon occupied" />;
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'General': return 'type-general';
      case 'Private': return 'type-private';
      case 'ICU': return 'type-icu';
      case 'Emergency': return 'type-emergency';
      default: return '';
    }
  };

  const filteredRooms = roomData.floors.map(floor => ({
    ...floor,
    rooms: floor.rooms.filter(room => {
      const matchesType = selectedType === 'All' || room.type === selectedType;
      const matchesSearch = room.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (room.patient && room.patient.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesType && matchesSearch;
    })
  })).filter(floor => floor.rooms.length > 0);

  const stats = [
    { label: 'Total Rooms', value: roomData.total, color: 'primary' },
    { label: 'Available', value: roomData.available, color: 'success' },
    { label: 'Occupied', value: roomData.occupied, color: 'danger' },
    { label: 'Occupancy', value: `${getOccupancyPercentage()}%`, color: 'warning' },
  ];

  return (
    <div className="dash-container">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-icon">🏥</span>
          <span className="brand-text">Medicare+</span>
        </div>
        <nav className="nav-menu">
          <div className="nav-link" onClick={() => navigate('/')}>
            <Activity size={20} /> Dashboard
          </div>
          <div className="nav-link" onClick={() => navigate('/patients')}>
            <Users size={20} /> Patients
          </div>
          <div className="nav-link" onClick={() => navigate('/doctors')}>
            <Activity size={20} /> Doctors
          </div>
          <div className="nav-link active" onClick={() => navigate('/rooms')}>
            <Bed size={20} /> Rooms
          </div>
          <div className="nav-link" onClick={() => navigate('/booking')}>
            <Calendar size={20} /> Book Appointment
          </div>
          <div className="nav-link" onClick={() => navigate('/payments')}>
            <Activity size={20} /> Payments
          </div>
        </nav>
        <div className="sidebar-footer">
          <p>© 2026 Medicare+</p>
        </div>
      </aside>

      <main className="main-area">
        <header className="header">
          <div className="search-bar">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search rooms or patients..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="header-right">
            <button className="add-btn">
              <Plus size={18} /> Add Room
            </button>
            <div className="avatar">AD</div>
          </div>
        </header>

        <div className="room-content">
          <div className="room-header">
            <h2><Bed size={24} /> Room Management</h2>
          </div>

          {/* Stats Overview */}
          <div className="room-stats">
            {stats.map((stat, index) => (
              <div className={`stat-card ${stat.color}`} key={index}>
                <div className="stat-icon">
                  {index === 0 && <Bed size={24} />}
                  {index === 1 && <CheckCircle size={24} />}
                  {index === 2 && <Users size={24} />}
                  {index === 3 && <Activity size={24} />}
                </div>
                <div className="stat-info">
                  <h3>{stat.value}</h3>
                  <p>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Overall Progress */}
          <div className="occupancy-section">
            <h3>Overall Room Occupancy</h3>
            <div className="occupancy-bar-container">
              <div className="occupancy-bar">
                <div 
                  className="occupancy-fill" 
                  style={{ width: `${getOccupancyPercentage()}%` }}
                ></div>
              </div>
              <div className="occupancy-labels">
                <span>{roomData.occupied} Occupied</span>
                <span>{roomData.available} Available</span>
              </div>
            </div>
          </div>

          {/* Filter */}
          <div className="filter-section">
            <div className="filter-group">
              <Filter size={16} />
              <span>Filter by type:</span>
              <div className="type-buttons">
                {roomTypes.map(type => (
                  <button
                    key={type}
                    className={`type-btn ${selectedType === type ? 'active' : ''} ${type !== 'All' ? getTypeColor(type) : ''}`}
                    onClick={() => setSelectedType(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Rooms by Floor */}
          <div className="floors-container">
            {filteredRooms.map((floor, floorIndex) => (
              <div className="floor-section" key={floorIndex}>
                <div className="floor-header">
                  <h3><Building size={18} /> {floor.floor}</h3>
                  <span className="floor-count">{floor.rooms.length} rooms</span>
                </div>
                <div className="rooms-grid">
                  {floor.rooms.map((room) => (
                    <div 
                      key={room.id}
                      className={`room-card ${room.status}`}
                      onClick={() => setSelectedRoom(room)}
                    >
                      <div className="room-header-card">
                        <span className="room-id">{room.id}</span>
                        {getStatusIcon(room.status)}
                      </div>
                      <div className="room-type">
                        <span className={`type-badge ${getTypeColor(room.type)}`}>{room.type}</span>
                      </div>
                      {room.patient ? (
                        <div className="room-occupied">
                          <span className="patient-name">{room.patient}</span>
                          <span className="bed-info">{room.bed}</span>
                          <span className="admit-date">
                            <Clock size={12} /> {room.admitDate}
                          </span>
                        </div>
                      ) : (
                        <div className="room-available">
                          <span>Available</span>
                          <button className="assign-btn">Assign</button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Room Details Modal */}
        {selectedRoom && (
          <div className="modal-overlay" onClick={() => setSelectedRoom(null)}>
            <div className="room-details-modal" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={() => setSelectedRoom(null)}>×</button>
              
              <div className="modal-header">
                <h3>Room {selectedRoom.id}</h3>
                <span className={`status-badge ${selectedRoom.status}`}>
                  {selectedRoom.status}
                </span>
              </div>

              <div className="room-info-grid">
                <div className="info-item">
                  <span className="label">Room Type</span>
                  <span className="value">{selectedRoom.type}</span>
                </div>
                <div className="info-item">
                  <span className="label">Bed</span>
                  <span className="value">{selectedRoom.bed}</span>
                </div>
              </div>

              {selectedRoom.patient ? (
                <div className="patient-section">
                  <h4><Users size={16} /> Current Patient</h4>
                  <div className="patient-info">
                    <span className="patient-name">{selectedRoom.patient}</span>
                    <span className="admit-date">
                      Admitted: {selectedRoom.admitDate}
                    </span>
                  </div>
                  <div className="modal-actions">
                    <button className="action-btn primary">View Patient</button>
                    <button className="action-btn secondary">Discharge</button>
                  </div>
                </div>
              ) : (
                <div className="available-section">
                  <p>This room is available for new patients.</p>
                  <div className="modal-actions">
                    <button className="action-btn primary">
                      <Plus size={16} /> Admit Patient
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default RoomManagement;