import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Stethoscope, Calendar, Phone, Mail, MapPin,
  Clock, Star, Award, Users, Activity, ChevronRight,
  Video, MessageCircle, CheckCircle, XCircle, Circle
} from 'lucide-react';
import './DoctorsDirectory.css';

// Mock doctors data
const doctors = [
  {
    id: 'D-001',
    name: 'Dr. Sarah Johnson',
    specialty: 'General Medicine',
    experience: 15,
    rating: 4.9,
    patients: 1250,
    education: 'MD, Harvard Medical School',
    about: 'Experienced physician specializing in preventive care and chronic disease management.',
    availability: 'available',
    nextAvailable: '09:00 AM',
    consultationFee: 500,
    image: null,
    schedule: { mon: '9AM-5PM', tue: '9AM-5PM', wed: '9AM-5PM', thu: '9AM-5PM', fri: '9AM-3PM', sat: 'Off', sun: 'Off' }
  },
  {
    id: 'D-002',
    name: 'Dr. Michael Chen',
    specialty: 'Cardiology',
    experience: 20,
    rating: 4.8,
    patients: 890,
    education: 'DM, Johns Hopkins University',
    'about': 'Board-certified cardiologist with expertise in interventional cardiology.',
    availability: 'busy',
    nextAvailable: '02:00 PM',
    consultationFee: 800,
    image: null,
    schedule: { mon: '10AM-6PM', tue: '10AM-6PM', wed: 'Off', thu: '10AM-6PM', fri: '10AM-6PM', sat: '10AM-2PM', sun: 'Off' }
  },
  {
    id: 'D-003',
    name: 'Dr. Emily White',
    specialty: 'Orthopedics',
    experience: 12,
    rating: 4.7,
    patients: 680,
    education: 'MS, Stanford University',
    'about': 'Specialized in sports medicine and joint replacement surgeries.',
    availability: 'available',
    nextAvailable: '10:00 AM',
    consultationFee: 700,
    image: null,
    schedule: { mon: '8AM-4PM', tue: '8AM-4PM', wed: '8AM-4PM', thu: '8AM-4PM', fri: '8AM-2PM', sat: 'Off', sun: 'Off' }
  },
  {
    id: 'D-004',
    name: 'Dr. David Lee',
    specialty: 'Neurology',
    experience: 18,
    rating: 4.9,
    patients: 520,
    education: 'DM, Mayo Clinic',
    'about': 'Expert in treating neurological disorders including migraines and epilepsy.',
    availability: 'offline',
    nextAvailable: 'Tomorrow 9AM',
    consultationFee: 900,
    image: null,
    schedule: { mon: '9AM-5PM', tue: '9AM-5PM', wed: '9AM-5PM', thu: '9AM-5PM', fri: '9AM-5PM', sat: 'Off', sun: 'Off' }
  },
  {
    id: 'D-005',
    name: 'Dr. Lisa Anderson',
    specialty: 'Gynecology',
    experience: 14,
    rating: 4.8,
    patients: 1100,
    education: 'MD, UCLA Medical School',
    'about': 'Comprehensive womens health care specialist.',
    availability: 'available',
    nextAvailable: '11:00 AM',
    consultationFee: 600,
    image: null,
    schedule: { mon: '9AM-5PM', tue: '9AM-5PM', wed: '9AM-5PM', thu: 'Off', fri: '9AM-5PM', sat: '9AM-1PM', sun: 'Off' }
  },
  {
    id: 'D-006',
    name: 'Dr. Robert Kumar',
    specialty: 'Pediatrics',
    experience: 16,
    rating: 4.9,
    patients: 1500,
    education: 'MD, Yale School of Medicine',
    'about': 'Dedicated pediatrician with expertise in child development.',
    availability: 'busy',
    nextAvailable: '03:30 PM',
    consultationFee: 550,
    image: null,
    schedule: { mon: '8AM-4PM', tue: '8AM-4PM', wed: '8AM-4PM', thu: '8AM-4PM', fri: '8AM-4PM', sat: '8AM-12PM', sun: 'Off' }
  },
  {
    id: 'D-007',
    name: 'Dr. Priya Sharma',
    specialty: 'Dermatology',
    experience: 10,
    rating: 4.7,
    patients: 450,
    education: 'MD, AIIMS Delhi',
    'about': 'Specialized in cosmetic dermatology and skin treatments.',
    availability: 'available',
    nextAvailable: '09:30 AM',
    consultationFee: 650,
    image: null,
    schedule: { mon: '10AM-6PM', tue: '10AM-6PM', wed: '10AM-6PM', thu: '10AM-6PM', fri: '10AM-4PM', sat: 'Off', sun: 'Off' }
  },
  {
    id: 'D-008',
    name: 'Dr. James Wilson',
    specialty: 'Psychiatry',
    experience: 22,
    rating: 4.8,
    patients: 380,
    education: 'MD, Columbia University',
    'about': 'Expert in mental health and behavioral disorders.',
    availability: 'available',
    nextAvailable: '01:00 PM',
    consultationFee: 750,
    image: null,
    schedule: { mon: '11AM-7PM', tue: '11AM-7PM', wed: '11AM-7PM', thu: '11AM-7PM', fri: '11AM-5PM', sat: 'Off', sun: 'Off' }
  }
];

const specialties = ['All', 'General Medicine', 'Cardiology', 'Orthopedics', 'Neurology', 'Gynecology', 'Pediatrics', 'Dermatology', 'Psychiatry'];

const DoctorsDirectory = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const filteredDoctors = doctors.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'All' || doc.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const getStatusIcon = (status) => {
    switch(status) {
      case 'available':
        return <CheckCircle size={16} className="status-icon available" />;
      case 'busy':
        return <Circle size={16} className="status-icon busy" />;
      case 'offline':
        return <XCircle size={16} className="status-icon offline" />;
      default:
        return null;
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'available':
        return 'Available';
      case 'busy':
        return 'In Consultation';
      case 'offline':
        return 'Offline';
      default:
        return '';
    }
  };

  const handleBookAppointment = (doctor) => {
    navigate(`/booking?doctor=${encodeURIComponent(doctor.id)}`);
  };

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
          <div className="nav-link active" onClick={() => navigate('/doctors')}>
            <Stethoscope size={20} /> Doctors
          </div>
          <div className="nav-link" onClick={() => navigate('/rooms')}>
            <Calendar size={20} /> Rooms
          </div>
          <div className="nav-link" onClick={() => navigate('/booking')}>
            <Calendar size={20} /> Book Appointment
          </div>
          <div className="nav-link" onClick={() => navigate('/payments')}>
            <Calendar size={20} /> Payments
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
              placeholder="Search doctors by name or specialty..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="header-right">
            <div className="avatar">AD</div>
          </div>
        </header>

        <div className="doctors-content">
          <div className="doctors-header">
            <h2><Stethoscope size={24} /> Doctors Directory</h2>
            <div className="doctors-count">
              {filteredDoctors.length} doctors available
            </div>
          </div>

          {/* Specialty Filter */}
          <div className="specialty-filter">
            {specialties.map((specialty) => (
              <button
                key={specialty}
                className={`specialty-btn ${selectedSpecialty === specialty ? 'active' : ''}`}
                onClick={() => setSelectedSpecialty(specialty)}
              >
                {specialty}
              </button>
            ))}
          </div>

          {/* Status Legend */}
          <div className="status-legend">
            <span className="legend-item">
              <CheckCircle size={14} className="status-icon available" />
              Available
            </span>
            <span className="legend-item">
              <Circle size={14} className="status-icon busy" />
              In Consultation
            </span>
            <span className="legend-item">
              <XCircle size={14} className="status-icon offline" />
              Offline
            </span>
          </div>

          {/* Doctors Grid */}
          <div className="doctors-grid">
            {filteredDoctors.map((doctor) => (
              <div 
                className="doctor-card" 
                key={doctor.id}
                onClick={() => setSelectedDoctor(doctor)}
              >
                <div className="doctor-card-header">
                  <div className="doctor-avatar">
                    {doctor.name.split(' ').slice(1).map(n => n[0]).join('')}
                  </div>
                  <div className={`doctor-status ${doctor.availability}`}>
                    {getStatusIcon(doctor.availability)}
                    <span>{getStatusText(doctor.availability)}</span>
                  </div>
                </div>
                
                <div className="doctor-card-body">
                  <h3>{doctor.name}</h3>
                  <p className="doctor-specialty">{doctor.specialty}</p>
                  
                  <div className="doctor-rating">
                    <Star size={16} fill="#f59e0b" stroke="#f59e0b" />
                    <span>{doctor.rating}</span>
                    <span className="rating-patients">• {doctor.patients} patients</span>
                  </div>
                  
                  <div className="doctor-info">
                    <div className="info-item">
                      <Award size={14} />
                      <span>{doctor.experience} years exp.</span>
                    </div>
                    <div className="info-item">
                      <Clock size={14} />
                      <span>Next: {doctor.nextAvailable}</span>
                    </div>
                  </div>
                  
                  <div className="doctor-fee">
                    <span className="fee-label">Consultation Fee</span>
                    <span className="fee-amount">₹{doctor.consultationFee}</span>
                  </div>
                </div>
                
                <div className="doctor-card-footer">
                  <button 
                    className="book-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookAppointment(doctor);
                    }}
                  >
                    <Calendar size={16} /> Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredDoctors.length === 0 && (
            <div className="no-results">
              <Search size={48} />
              <h3>No doctors found</h3>
              <p>Try searching with a different name or specialty</p>
            </div>
          )}
        </div>

        {/* Doctor Details Modal */}
        {selectedDoctor && (
          <div className="modal-overlay" onClick={() => setSelectedDoctor(null)}>
            <div className="doctor-details-modal" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={() => setSelectedDoctor(null)}>×</button>
              
              <div className="details-header">
                <div className="details-avatar">
                  {selectedDoctor.name.split(' ').slice(1).map(n => n[0]).join('')}
                </div>
                <div className="details-title">
                  <h2>{selectedDoctor.name}</h2>
                  <p>{selectedDoctor.specialty}</p>
                  <div className={`status-badge ${selectedDoctor.availability}`}>
                    {getStatusIcon(selectedDoctor.availability)}
                    <span>{getStatusText(selectedDoctor.availability)}</span>
                  </div>
                </div>
              </div>

              <div className="details-stats">
                <div className="stat-box">
                  <Star size={20} fill="#f59e0b" stroke="#f59e0b" />
                  <span className="stat-value">{selectedDoctor.rating}</span>
                  <span className="stat-label">Rating</span>
                </div>
                <div className="stat-box">
                  <Users size={20} />
                  <span className="stat-value">{selectedDoctor.patients}</span>
                  <span className="stat-label">Patients</span>
                </div>
                <div className="stat-box">
                  <Award size={20} />
                  <span className="stat-value">{selectedDoctor.experience}</span>
                  <span className="stat-label">Years Exp.</span>
                </div>
              </div>

              <div className="about-section">
                <h4>About</h4>
                <p>{selectedDoctor.about}</p>
              </div>

              <div className="education-section">
                <h4><Award size={16} /> Education</h4>
                <p>{selectedDoctor.education}</p>
              </div>

              <div className="schedule-section">
                <h4><Clock size={16} /> Weekly Schedule</h4>
                <div className="schedule-grid">
                  {Object.entries(selectedDoctor.schedule).map(([day, time]) => (
                    <div className={`schedule-day ${time === 'Off' ? 'off' : ''}`} key={day}>
                      <span className="day-name">{day.charAt(0).toUpperCase() + day.slice(1)}</span>
                      <span className="day-time">{time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="contact-section">
                <h4>Quick Actions</h4>
                <div className="action-buttons">
                  <button className="action-btn primary" onClick={() => handleBookAppointment(selectedDoctor)}>
                    <Calendar size={18} /> Book Appointment
                  </button>
                  <button className="action-btn secondary">
                    <MessageCircle size={18} /> Send Message
                  </button>
                  <button className="action-btn secondary">
                    <Video size={18} /> Video Consultation
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DoctorsDirectory;
