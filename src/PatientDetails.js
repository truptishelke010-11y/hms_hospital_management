import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, User, Calendar, Phone, Mail, MapPin, 
  Activity, Heart, Thermometer, Pill, FileText, 
  Clock, AlertCircle, CheckCircle, ChevronRight,
  Stethoscope, Bed
} from 'lucide-react';
import './PatientDetails.css';

const patients = [
  { 
    id: 'P-101', 
    name: 'Rahul Sharma', 
    age: 34, 
    gender: 'Male',
    bloodGroup: 'O+', 
    phone: '9876543210', 
    email: 'rahul.sharma@email.com',
    address: '123, MG Road, Mumbai',
    issue: 'High Fever',
    status: 'Active',
    admittedDate: '2026-03-20',
    room: 'G-205',
    floor: '2nd Floor',
    doctor: 'Dr. Sarah Johnson',
    doctorId: 'D-001',
    medicalHistory: ['Diabetes', 'Hypertension'],
    allergies: ['Penicillin'],
    vitals: { bp: '120/80', pulse: 72, temp: '98.6°F', weight: '75kg', spo2: '98%' },
    treatments: [
      { name: 'Paracetamol 500mg', frequency: 'Every 6 hours', duration: '5 days' },
      { name: 'IV Fluids', frequency: 'Once daily', duration: '3 days' },
      { name: 'Full Rest', frequency: 'Continuous', duration: '7 days' }
    ],
    reports: [
      { type: 'Blood Test', date: '2026-03-21', status: 'Completed', result: 'Normal' },
      { type: 'X-Ray', date: '2026-03-22', status: 'Pending', result: '-' }
    ],
    notes: 'Patient showing improvement. Continue current medication.',
    emergencyContact: { name: 'Priya Sharma', relation: 'Wife', phone: '9876543211' }
  },
  { 
    id: 'P-102', 
    name: 'Sunita Kumari', 
    age: 28, 
    gender: 'Female',
    bloodGroup: 'A-', 
    phone: '8877665544', 
    email: 'sunita.k@email.com',
    address: '45, Park Avenue, Delhi',
    issue: 'Back Pain',
    status: 'Pending',
    admittedDate: '2026-03-22',
    room: 'P-102',
    floor: '1st Floor',
    doctor: 'Dr. Emily White',
    doctorId: 'D-003',
    medicalHistory: ['Asthma'],
    allergies: [],
    vitals: { bp: '110/70', pulse: 68, temp: '98.2°F', weight: '58kg', spo2: '99%' },
    treatments: [
      { name: 'Physiotherapy', frequency: 'Once daily', duration: '10 days' },
      { name: 'Pain Relief Gel', frequency: 'Twice daily', duration: '7 days' }
    ],
    reports: [
      { type: 'MRI Scan', date: '2026-03-23', status: 'Completed', result: 'Normal' }
    ],
    notes: 'Patient requires physiotherapy sessions.',
    emergencyContact: { name: 'Rajesh Kumar', relation: 'Husband', phone: '8877665545' }
  }
];

const PatientDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const foundPatient = patients.find(p => p.id === id);
    if (foundPatient) {
      setPatient(foundPatient);
    } else {
      navigate('/patients');
    }
  }, [id, navigate]);

  if (!patient) {
    return <div className="loading">Loading...</div>;
  }

  const getStatusClass = (status) => {
    switch(status.toLowerCase()) {
      case 'active': return 'status-active';
      case 'pending': return 'status-pending';
      case 'discharged': return 'status-discharged';
      default: return '';
    }
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
          <div className="nav-link active" onClick={() => navigate('/patients')}>
            <User size={20} /> Patients
          </div>
          <div className="nav-link" onClick={() => navigate('/doctors')}>
            <Stethoscope size={20} /> Doctors
          </div>
          <div className="nav-link" onClick={() => navigate('/rooms')}>
            <Bed size={20} /> Rooms
          </div>
          <div className="nav-link" onClick={() => navigate('/booking')}>
            <Calendar size={20} /> Book Appointment
          </div>
          <div className="nav-link" onClick={() => navigate('/payments')}>
            <FileText size={20} /> Payments
          </div>
        </nav>
        <div className="sidebar-footer">
          <p>© 2026 Medicare+</p>
        </div>
      </aside>

      <main className="main-area">
        <header className="header">
          <button className="back-btn" onClick={() => navigate('/patients')}>
            <ArrowLeft size={18} /> Back
          </button>
          <div className="header-right">
            <div className="avatar">AD</div>
          </div>
        </header>

        <div className="patient-details-content">
          {/* Patient Header */}
          <div className="patient-header-section">
            <div className="patient-main-info">
              <div className="patient-avatar-large">
                {patient.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="patient-title">
                <h1>{patient.name}</h1>
                <p className="patient-id">{patient.id} • {patient.gender}, {patient.age} years</p>
                <div className={`patient-status-badge ${getStatusClass(patient.status)}`}>
                  {patient.status}
                </div>
              </div>
            </div>
            <div className="patient-quick-stats">
              <div className="quick-stat">
                <Bed size={20} />
                <div>
                  <span className="stat-label">Room</span>
                  <span className="stat-value">{patient.room}</span>
                </div>
              </div>
              <div className="quick-stat">
                <Stethoscope size={20} />
                <div>
                  <span className="stat-label">Doctor</span>
                  <span className="stat-value">{patient.doctor}</span>
                </div>
              </div>
              <div className="quick-stat">
                <Calendar size={20} />
                <div>
                  <span className="stat-label">Admitted</span>
                  <span className="stat-value">{patient.admittedDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="patient-tabs">
            <button 
              className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`tab-btn ${activeTab === 'vitals' ? 'active' : ''}`}
              onClick={() => setActiveTab('vitals')}
            >
              Vitals
            </button>
            <button 
              className={`tab-btn ${activeTab === 'treatments' ? 'active' : ''}`}
              onClick={() => setActiveTab('treatments')}
            >
              Treatments
            </button>
            <button 
              className={`tab-btn ${activeTab === 'reports' ? 'active' : ''}`}
              onClick={() => setActiveTab('reports')}
            >
              Reports
            </button>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === 'overview' && (
              <div className="overview-grid">
                <div className="detail-card">
                  <h3><User size={18} /> Personal Information</h3>
                  <div className="detail-row">
                    <span>Blood Group</span>
                    <span className="blood-group">{patient.bloodGroup}</span>
                  </div>
                  <div className="detail-row">
                    <span>Phone</span>
                    <span>{patient.phone}</span>
                  </div>
                  <div className="detail-row">
                    <span>Email</span>
                    <span>{patient.email}</span>
                  </div>
                  <div className="detail-row">
                    <span>Address</span>
                    <span>{patient.address}</span>
                  </div>
                </div>

                <div className="detail-card">
                  <h3><Activity size={18} /> Medical Information</h3>
                  <div className="detail-row">
                    <span>Current Issue</span>
                    <span>{patient.issue}</span>
                  </div>
                  <div className="detail-row">
                    <span>Floor</span>
                    <span>{patient.floor}</span>
                  </div>
                  <div className="detail-row">
                    <span>Emergency Contact</span>
                    <span>{patient.emergencyContact.name} ({patient.emergencyContact.relation})</span>
                  </div>
                </div>

                <div className="detail-card">
                  <h3><AlertCircle size={18} /> Medical History</h3>
                  <div className="history-tags">
                    {patient.medicalHistory.map((item, idx) => (
                      <span key={idx} className="history-tag">{item}</span>
                    ))}
                    {patient.medicalHistory.length === 0 && <span className="no-data">No history</span>}
                  </div>
                  {patient.allergies.length > 0 && (
                    <>
                      <h4 style={{marginTop: '16px'}}>Allergies</h4>
                      <div className="allergy-tags">
                        {patient.allergies.map((item, idx) => (
                          <span key={idx} className="allergy-tag">{item}</span>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                <div className="detail-card notes-card">
                  <h3><FileText size={18} /> Doctor's Notes</h3>
                  <p>{patient.notes}</p>
                </div>
              </div>
            )}

            {activeTab === 'vitals' && (
              <div className="vitals-grid">
                <div className="vital-card-large">
                  <div className="vital-icon">
                    <Activity size={24} />
                  </div>
                  <div className="vital-info">
                    <span className="vital-label">Blood Pressure</span>
                    <span className="vital-value">{patient.vitals.bp}</span>
                    <span className="vital-unit">mmHg</span>
                  </div>
                </div>
                <div className="vital-card-large">
                  <div className="vital-icon">
                    <Heart size={24} />
                  </div>
                  <div className="vital-info">
                    <span className="vital-label">Pulse Rate</span>
                    <span className="vital-value">{patient.vitals.pulse}</span>
                    <span className="vital-unit">bpm</span>
                  </div>
                </div>
                <div className="vital-card-large">
                  <div className="vital-icon">
                    <Thermometer size={24} />
                  </div>
                  <div className="vital-info">
                    <span className="vital-label">Temperature</span>
                    <span className="vital-value">{patient.vitals.temp}</span>
                    <span className="vital-unit">°F</span>
                  </div>
                </div>
                <div className="vital-card-large">
                  <div className="vital-icon">
                    <Activity size={24} />
                  </div>
                  <div className="vital-info">
                    <span className="vital-label">SpO2</span>
                    <span className="vital-value">{patient.vitals.spo2}</span>
                    <span className="vital-unit">%</span>
                  </div>
                </div>
                <div className="vital-card-large">
                  <div className="vital-icon">
                    <User size={24} />
                  </div>
                  <div className="vital-info">
                    <span className="vital-label">Weight</span>
                    <span className="vital-value">{patient.vitals.weight}</span>
                    <span className="vital-unit">kg</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'treatments' && (
              <div className="treatments-list">
                {patient.treatments.map((treatment, idx) => (
                  <div className="treatment-card" key={idx}>
                    <div className="treatment-icon">
                      <Pill size={24} />
                    </div>
                    <div className="treatment-info">
                      <h4>{treatment.name}</h4>
                      <div className="treatment-details">
                        <span><Clock size={14} /> {treatment.frequency}</span>
                        <span><Calendar size={14} /> Duration: {treatment.duration}</span>
                      </div>
                    </div>
                    <div className="treatment-status">
                      <CheckCircle size={20} />
                      Active
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reports' && (
              <div className="reports-list">
                <div className="reports-table">
                  <div className="report-row header">
                    <span>Report Type</span>
                    <span>Date</span>
                    <span>Result</span>
                    <span>Status</span>
                  </div>
                  {patient.reports.map((report, idx) => (
                    <div className="report-row" key={idx}>
                      <span>{report.type}</span>
                      <span>{report.date}</span>
                      <span>{report.result}</span>
                      <span className={`report-status ${report.status.toLowerCase()}`}>
                        {report.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientDetails;
