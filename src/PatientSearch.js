import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Search, Users, Calendar, Phone, Mail, MapPin, 
  Clock, Activity, Pill, AlertCircle, ChevronRight,
  FileText, Heart, Thermometer, Eye
} from 'lucide-react';
import './PatientSearch.css';

// Mock patient data
const allPatients = [
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
    doctor: 'Dr. Sarah Johnson',
    medicalHistory: ['Diabetes', 'Hypertension'],
    vitals: { bp: '120/80', pulse: 72, temp: '98.6°F', weight: '75kg' },
    treatments: ['Paracetamol 500mg', 'IV Fluids', 'Full Rest'],
    reports: [
      { type: 'Blood Test', date: '2026-03-21', status: 'Completed' },
      { type: 'X-Ray', date: '2026-03-22', status: 'Pending' }
    ]
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
    doctor: 'Dr. Emily White',
    medicalHistory: ['Asthma'],
    vitals: { bp: '110/70', pulse: 68, temp: '98.2°F', weight: '58kg' },
    treatments: ['Physiotherapy', 'Pain Relief Gel', 'Avoid heavy lifting'],
    reports: [
      { type: 'MRI Scan', date: '2026-03-23', status: 'Completed' }
    ]
  },
  { 
    id: 'P-103', 
    name: 'Amit Patel', 
    age: 45, 
    gender: 'Male',
    bloodGroup: 'B+', 
    phone: '9988776655', 
    email: 'amit.patel@email.com',
    address: '78, Sector 15, Noida',
    issue: 'Cardiac Checkup',
    status: 'Active',
    admittedDate: '2026-03-18',
    room: 'ICU-03',
    doctor: 'Dr. Michael Chen',
    medicalHistory: ['Heart Disease', 'High Cholesterol'],
    vitals: { bp: '140/90', pulse: 88, temp: '99.1°F', weight: '82kg' },
    treatments: ['ECG Monitoring', 'Cardiac Medications', 'Low Salt Diet'],
    reports: [
      { type: 'ECG', date: '2026-03-19', status: 'Completed' },
      { type: 'Echo Test', date: '2026-03-24', status: 'Scheduled' }
    ]
  },
  { 
    id: 'P-104', 
    name: 'Priya Singh', 
    age: 32, 
    gender: 'Female',
    bloodGroup: 'AB+', 
    phone: '9876123456', 
    email: 'priya.singh@email.com',
    address: '56, Lake View, Bangalore',
    issue: 'Pregnancy - 6 Months',
    status: 'Active',
    admittedDate: '2026-03-15',
    room: 'P-201',
    doctor: 'Dr. Lisa Anderson',
    medicalHistory: ['Thyroid'],
    vitals: { bp: '115/75', pulse: 70, temp: '98.4°F', weight: '65kg' },
    treatments: ['Prenatal Vitamins', 'Regular Checkups', 'Iron Supplements'],
    reports: [
      { type: 'Ultrasound', date: '2026-03-16', status: 'Completed' },
      { type: 'Blood Test', date: '2026-03-20', status: 'Completed' }
    ]
  },
  { 
    id: 'P-105', 
    name: 'Raj Malhotra', 
    age: 52, 
    gender: 'Male',
    bloodGroup: 'O-', 
    phone: '9988774433', 
    email: 'raj.m@email.com',
    address: '34, Civil Lines, Jaipur',
    issue: 'Neurology Consultation',
    status: 'Discharged',
    admittedDate: '2026-03-10',
    room: 'G-108',
    doctor: 'Dr. David Lee',
    medicalHistory: ['Migraine', 'Sleep Disorder'],
    vitals: { bp: '125/82', pulse: 74, temp: '98.3°F', weight: '78kg' },
    treatments: ['Pain Management', 'Sleep Therapy'],
    reports: [
      { type: 'CT Scan', date: '2026-03-11', status: 'Completed' }
    ]
  },
  { 
    id: 'P-106', 
    name: 'Kavita Reddy', 
    age: 29, 
    gender: 'Female',
    bloodGroup: 'A+', 
    phone: '9876543211', 
    email: 'kavita.r@email.com',
    address: '89, Jubilee Hills, Hyderabad',
    issue: 'Orthopedic Surgery',
    status: 'Active',
    admittedDate: '2026-03-23',
    room: 'P-305',
    doctor: 'Dr. Emily White',
    medicalHistory: [],
    vitals: { bp: '118/78', pulse: 76, temp: '98.5°F', weight: '62kg' },
    treatments: ['Post-surgery Care', 'Physical Therapy', 'Pain Management'],
    reports: [
      { type: 'X-Ray', date: '2026-03-23', status: 'Completed' }
    ]
  },
  { 
    id: 'P-107', 
    name: 'Vikram Singh', 
    age: 41, 
    gender: 'Male',
    bloodGroup: 'B-', 
    phone: '9988776656', 
    email: 'vikram.s@email.com',
    address: '12, Model Town, Ludhiana',
    issue: 'Diabetes Management',
    status: 'Active',
    admittedDate: '2026-03-21',
    room: 'G-302',
    doctor: 'Dr. Sarah Johnson',
    medicalHistory: ['Type 2 Diabetes', 'Obesity'],
    vitals: { bp: '130/85', pulse: 80, temp: '98.8°F', weight: '95kg' },
    treatments: ['Insulin Therapy', 'Diet Control', 'Exercise Plan'],
    reports: [
      { type: 'HbA1c Test', date: '2026-03-22', status: 'Completed' },
      { type: 'Lipid Profile', date: '2026-03-22', status: 'Completed' }
    ]
  },
  { 
    id: 'P-108', 
    name: 'Meera Nair', 
    age: 38, 
    gender: 'Female',
    bloodGroup: 'O+', 
    phone: '9877001122', 
    email: 'meera.nair@email.com',
    address: '67, Marine Drive, Kochi',
    issue: 'Dermatology Consultation',
    status: 'Pending',
    admittedDate: '2026-03-24',
    room: 'P-108',
    doctor: 'Dr. Lisa Anderson',
    medicalHistory: ['Skin Allergy'],
    vitals: { bp: '112/72', pulse: 68, temp: '98.4°F', weight: '56kg' },
    treatments: ['Topical Ointments', 'Skin Care Routine'],
    reports: [
      { type: 'Skin Biopsy', date: '2026-03-25', status: 'Scheduled' }
    ]
  }
];

const PatientSearch = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [patients, setPatients] = useState(allPatients);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (searchQuery) {
      const filtered = allPatients.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.phone.includes(searchQuery)
      );
      setPatients(filtered);
    } else {
      setPatients(allPatients);
    }
  }, [searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
    setShowDetails(true);
  };

  const closeDetails = () => {
    setShowDetails(false);
    setSelectedPatient(null);
  };

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
            <Users size={20} /> Patients
          </div>
         {/* <div className="nav-link" onClick={() => navigate('/doctors')}>
            <Stethoscope size={20} /> Doctors
          </div>
          <div className="nav-link" onClick={() => navigate('/rooms')}>
            <Bed size={20} /> Rooms
          </div> */}
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
          <div className="search-bar">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search patients by name, ID, or phone..." 
              value={searchQuery}
              onChange={handleSearch}
              autoFocus
            />
          </div>
          <div className="header-right">
            <button className="add-btn" onClick={() => navigate('/booking')}>
              <Users size={18} /> Add Patient
            </button>
            <div className="avatar">AD</div>
          </div>
        </header>

        <div className="patient-content">
          <div className="patient-header">
            <h2><Users size={24} /> Patient Directory</h2>
            <div className="patient-stats">
              <span className="stat-item">
                <span className="stat-dot active"></span>
                Active: {patients.filter(p => p.status === 'Active').length}
              </span>
              <span className="stat-item">
                <span className="stat-dot pending"></span>
                Pending: {patients.filter(p => p.status === 'Pending').length}
              </span>
              <span className="stat-item">
                <span className="stat-dot discharged"></span>
                Discharged: {patients.filter(p => p.status === 'Discharged').length}
              </span>
            </div>
          </div>

          {searchQuery && (
            <div className="search-results-info">
              Found {patients.length} result(s) for "{searchQuery}"
            </div>
          )}

          <div className="patient-grid">
            {patients.map((patient) => (
              <div 
                className="patient-card" 
                key={patient.id}
                onClick={() => handlePatientClick(patient)}
              >
                <div className="patient-card-header">
                  <div className="patient-avatar">
                    {patient.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className={`patient-status ${getStatusClass(patient.status)}`}>
                    {patient.status}
                  </div>
                </div>
                <div className="patient-card-body">
                  <h3>{patient.name}</h3>
                  <p className="patient-id">{patient.id}</p>
                  <div className="patient-info-row">
                    <span><Calendar size={14} /> {patient.age} yrs, {patient.gender}</span>
                    <span><Heart size={14} /> {patient.bloodGroup}</span>
                  </div>
                  <div className="patient-issue">
                    <AlertCircle size={14} /> {patient.issue}
                  </div>
                  <div className="patient-doctor">
                    <span>Assigned Doctor:</span>
                    <strong>{patient.doctor}</strong>
                  </div>
                </div>
                <div className="patient-card-footer">
                  <span className="room-info">Room: {patient.room}</span>
                  <ChevronRight size={20} />
                </div>
              </div>
            ))}
          </div>

          {patients.length === 0 && (
            <div className="no-results">
              <Search size={48} />
              <h3>No patients found</h3>
              <p>Try searching with a different name, ID, or phone number</p>
            </div>
          )}
        </div>

        {/* Patient Details Modal */}
        {showDetails && selectedPatient && (
          <div className="modal-overlay" onClick={closeDetails}>
            <div className="patient-details-modal" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={closeDetails}>×</button>
              
              <div className="details-header">
                <div className="details-avatar">
                  {selectedPatient.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="details-title">
                  <h2>{selectedPatient.name}</h2>
                  <p>{selectedPatient.id} • {selectedPatient.gender}, {selectedPatient.age} years</p>
                  <div className={`status-badge ${getStatusClass(selectedPatient.status)}`}>
                    {selectedPatient.status}
                  </div>
                </div>
              </div>

              <div className="details-grid">
                <div className="detail-section">
                  <h4><Phone size={16} /> Contact Information</h4>
                  <div className="detail-row">
                    <span>Phone:</span>
                    <span>{selectedPatient.phone}</span>
                  </div>
                  <div className="detail-row">
                    <span>Email:</span>
                    <span>{selectedPatient.email}</span>
                  </div>
                  <div className="detail-row">
                    <span>Address:</span>
                    <span>{selectedPatient.address}</span>
                  </div>
                </div>

                <div className="detail-section">
                  <h4><Activity size={16} /> Medical Information</h4>
                  <div className="detail-row">
                    <span>Blood Group:</span>
                    <span className="blood-group">{selectedPatient.bloodGroup}</span>
                  </div>
                  <div className="detail-row">
                    <span>Current Issue:</span>
                    <span>{selectedPatient.issue}</span>
                  </div>
                  <div className="detail-row">
                    <span>Assigned Doctor:</span>
                    <span>{selectedPatient.doctor}</span>
                  </div>
                  <div className="detail-row">
                    <span>Room:</span>
                    <span>{selectedPatient.room}</span>
                  </div>
                  <div className="detail-row">
                    <span>Admitted Date:</span>
                    <span>{selectedPatient.admittedDate}</span>
                  </div>
                </div>
              </div>

              <div className="vitals-section">
                <h4><Thermometer size={16} /> Current Vitals</h4>
                <div className="vitals-grid">
                  <div className="vital-card">
                    <span className="vital-label">Blood Pressure</span>
                    <span className="vital-value">{selectedPatient.vitals.bp}</span>
                    <span className="vital-unit">mmHg</span>
                  </div>
                  <div className="vital-card">
                    <span className="vital-label">Pulse</span>
                    <span className="vital-value">{selectedPatient.vitals.pulse}</span>
                    <span className="vital-unit">bpm</span>
                  </div>
                  <div className="vital-card">
                    <span className="vital-label">Temperature</span>
                    <span className="vital-value">{selectedPatient.vitals.temp}</span>
                    <span className="vital-unit">°F</span>
                  </div>
                  <div className="vital-card">
                    <span className="vital-label">Weight</span>
                    <span className="vital-value">{selectedPatient.vitals.weight}</span>
                    <span className="vital-unit">kg</span>
                  </div>
                </div>
              </div>

              {selectedPatient.medicalHistory.length > 0 && (
                <div className="history-section">
                  <h4><FileText size={16} /> Medical History</h4>
                  <div className="history-tags">
                    {selectedPatient.medicalHistory.map((history, idx) => (
                      <span key={idx} className="history-tag">{history}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="treatments-section">
                <h4><Pill size={16} /> Treatment Plan</h4>
                <ul className="treatments-list">
                  {selectedPatient.treatments.map((treatment, idx) => (
                    <li key={idx}>
                      <ChevronRight size={16} /> {treatment}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="reports-section">
                <h4><FileText size={16} /> Medical Reports</h4>
                <div className="reports-table">
                  <div className="report-row header">
                    <span>Report Type</span>
                    <span>Date</span>
                    <span>Status</span>
                  </div>
                  {selectedPatient.reports.map((report, idx) => (
                    <div className="report-row" key={idx}>
                      <span>{report.type}</span>
                      <span>{report.date}</span>
                      <span className={`report-status ${report.status.toLowerCase()}`}>
                        {report.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PatientSearch;
