import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Calendar, Clock, Users, Stethoscope, CheckCircle, ChevronLeft, ChevronRight,
  Video, MessageCircle, Phone, Mail, Search, Activity, User, MapPin
} from 'lucide-react';
import './AppointmentBooking.css';

// Mock doctors data
const doctors = [
  { id: 'D-001', name: 'Dr. Sarah Johnson', specialty: 'General Medicine', available: true, nextAvailable: '09:00 AM' },
  { id: 'D-002', name: 'Dr. Michael Chen', specialty: 'Cardiology', available: false, nextAvailable: '02:00 PM' },
  { id: 'D-003', name: 'Dr. Emily White', specialty: 'Orthopedics', available: true, nextAvailable: '10:00 AM' },
  { id: 'D-004', name: 'Dr. David Lee', specialty: 'Neurology', available: true, nextAvailable: '11:00 AM' },
  { id: 'D-005', name: 'Dr. Lisa Anderson', specialty: 'Gynecology', available: true, nextAvailable: '09:30 AM' },
  { id: 'D-006', name: 'Dr. Robert Kumar', specialty: 'Pediatrics', available: false, nextAvailable: '03:30 PM' },
];

// Generate time slots
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour <= 17; hour++) {
    slots.push({ time: `${hour}:00`, available: Math.random() > 0.3 });
    slots.push({ time: `${hour}:30`, available: Math.random() > 0.4 });
  }
  return slots;
};

// Generate calendar days
const generateCalendarDays = (year, month) => {
  const days = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDay = firstDay.getDay();
  
  // Previous month days
  const prevMonth = new Date(year, month, 0);
  for (let i = startDay - 1; i >= 0; i--) {
    days.push({
      date: prevMonth.getDate() - i,
      currentMonth: false,
      isToday: false
    });
  }
  
  // Current month days
  const today = new Date();
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push({
      date: i,
      currentMonth: true,
      isToday: today.getDate() === i && today.getMonth() === month && today.getFullYear() === year
    });
  }
  
  // Next month days
  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      date: i,
      currentMonth: false,
      isToday: false
    });
  }
  
  return days;
};

const AppointmentBooking = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(searchParams.get('doctor') || '');
  const [bookingStep, setBookingStep] = useState(1);
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    phone: '',
    email: '',
    age: '',
    gender: '',
    reason: ''
  });
  const [bookedAppointments, setBookedAppointments] = useState([]);

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const calendarDays = generateCalendarDays(currentDate.getFullYear(), currentDate.getMonth());
  const timeSlots = generateTimeSlots();

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateSelect = (day) => {
    if (day.currentMonth) {
      setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day.date));
      setSelectedTime(null);
    }
  };

  const handleBookAppointment = () => {
    if (selectedDate && selectedTime && selectedDoctor && patientInfo.name && patientInfo.phone) {
      const newAppointment = {
        id: `APT-${Date.now()}`,
        date: selectedDate.toLocaleDateString(),
        time: selectedTime.time,
        doctor: doctors.find(d => d.id === selectedDoctor)?.name,
        patient: patientInfo.name,
        status: 'confirmed'
      };
      setBookedAppointments([...bookedAppointments, newAppointment]);
      setBookingStep(4);
    }
  };

  const handleInputChange = (e) => {
    setPatientInfo({
      ...patientInfo,
      [e.target.name]: e.target.value
    });
  };

  const canProceed = () => {
    if (bookingStep === 1) return selectedDate && selectedTime;
    if (bookingStep === 2) return selectedDoctor;
    if (bookingStep === 3) return patientInfo.name && patientInfo.phone && patientInfo.email;
    return false;
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
          <div className="nav-link" onClick={() => navigate('/doctors')}>
            <Stethoscope size={20} /> Doctors
          </div>
          <div className="nav-link" onClick={() => navigate('/rooms')}>
            <Calendar size={20} /> Rooms
          </div>
          <div className="nav-link active" onClick={() => navigate('/booking')}>
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
          <div className="header-title">
            <h2><Calendar size={20} /> Book Appointment</h2>
          </div>
          <div className="header-right">
            <div className="avatar">AD</div>
          </div>
        </header>

        <div className="booking-content">
          {/* Progress Steps */}
          <div className="booking-progress">
            <div className={`progress-step ${bookingStep >= 1 ? 'active' : ''} ${bookingStep > 1 ? 'completed' : ''}`}>
              <div className="step-number">1</div>
              <span>Select Date & Time</span>
            </div>
            <div className="progress-line"></div>
            <div className={`progress-step ${bookingStep >= 2 ? 'active' : ''} ${bookingStep > 2 ? 'completed' : ''}`}>
              <div className="step-number">2</div>
              <span>Choose Doctor</span>
            </div>
            <div className="progress-line"></div>
            <div className={`progress-step ${bookingStep >= 3 ? 'active' : ''} ${bookingStep > 3 ? 'completed' : ''}`}>
              <div className="step-number">3</div>
              <span>Patient Details</span>
            </div>
            <div className="progress-line"></div>
            <div className={`progress-step ${bookingStep >= 4 ? 'active' : ''}`}>
              <div className="step-number">4</div>
              <span>Confirmation</span>
            </div>
          </div>

          <div className="booking-main">
            {/* Step 1: Date & Time Selection */}
            {bookingStep === 1 && (
              <div className="step-content">
                <h3>Select Date & Time</h3>
                <div className="date-time-container">
                  <div className="calendar-section">
                    <div className="calendar-header">
                      <button onClick={prevMonth}><ChevronLeft size={20} /></button>
                      <h4>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h4>
                      <button onClick={nextMonth}><ChevronRight size={20} /></button>
                    </div>
                    <div className="calendar-grid">
                      {daysOfWeek.map(day => (
                        <div key={day} className="calendar-day-header">{day}</div>
                      ))}
                      {calendarDays.map((day, index) => (
                        <div 
                          key={index}
                          className={`calendar-day ${!day.currentMonth ? 'other-month' : ''} ${day.isToday ? 'today' : ''} ${selectedDate && selectedDate.getDate() === day.date && day.currentMonth ? 'selected' : ''}`}
                          onClick={() => handleDateSelect(day)}
                        >
                          {day.date}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="time-section">
                    <h4>Available Time Slots</h4>
                    {selectedDate ? (
                      <div className="time-slots">
                        {timeSlots.map((slot, index) => (
                          <button
                            key={index}
                            className={`time-slot ${selectedTime?.time === slot.time ? 'selected' : ''} ${!slot.available ? 'unavailable' : ''}`}
                            onClick={() => slot.available && setSelectedTime(slot)}
                            disabled={!slot.available}
                          >
                            {slot.time}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="select-date-msg">Please select a date first</p>
                    )}
                  </div>
                </div>
                <div className="step-actions">
                  <button 
                    className="next-btn"
                    onClick={() => setBookingStep(2)}
                    disabled={!canProceed()}
                  >
                    Next Step <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Doctor Selection */}
            {bookingStep === 2 && (
              <div className="step-content">
                <h3>Choose Doctor</h3>
                <div className="doctors-list">
                  {doctors.map(doctor => (
                    <div 
                      key={doctor.id}
                      className={`doctor-option ${selectedDoctor === doctor.id ? 'selected' : ''} ${!doctor.available ? 'unavailable' : ''}`}
                      onClick={() => doctor.available && setSelectedDoctor(doctor.id)}
                    >
                      <div className="doctor-avatar">
                        {doctor.name.split(' ').slice(1).map(n => n[0]).join('')}
                      </div>
                      <div className="doctor-info">
                        <h4>{doctor.name}</h4>
                        <p>{doctor.specialty}</p>
                        {doctor.available ? (
                          <span className="availability available">
                            <CheckCircle size={14} /> Available - Next: {doctor.nextAvailable}
                          </span>
                        ) : (
                          <span className="availability unavailable">
                            <Clock size={14} /> Next Available: {doctor.nextAvailable}
                          </span>
                        )}
                      </div>
                      {selectedDoctor === doctor.id && (
                        <CheckCircle size={24} className="selected-icon" />
                      )}
                    </div>
                  ))}
                </div>
                <div className="step-actions">
                  <button className="back-btn" onClick={() => setBookingStep(1)}>
                    <ChevronLeft size={18} /> Back
                  </button>
                  <button 
                    className="next-btn"
                    onClick={() => setBookingStep(3)}
                    disabled={!canProceed()}
                  >
                    Next Step <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Patient Details */}
            {bookingStep === 3 && (
              <div className="step-content">
                <h3>Patient Information</h3>
                <div className="patient-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input 
                        type="text" 
                        name="name"
                        value={patientInfo.name}
                        onChange={handleInputChange}
                        placeholder="Enter patient name"
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone Number *</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={patientInfo.phone}
                        onChange={handleInputChange}
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Email Address *</label>
                      <input 
                        type="email" 
                        name="email"
                        value={patientInfo.email}
                        onChange={handleInputChange}
                        placeholder="Enter email address"
                      />
                    </div>
                    <div className="form-group">
                      <label>Age</label>
                      <input 
                        type="number" 
                        name="age"
                        value={patientInfo.age}
                        onChange={handleInputChange}
                        placeholder="Enter age"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Gender</label>
                      <select name="gender" value={patientInfo.gender} onChange={handleInputChange}>
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Reason for Visit</label>
                      <input 
                        type="text" 
                        name="reason"
                        value={patientInfo.reason}
                        onChange={handleInputChange}
                        placeholder="Enter reason for visit"
                      />
                    </div>
                  </div>
                </div>
                <div className="step-actions">
                  <button className="back-btn" onClick={() => setBookingStep(2)}>
                    <ChevronLeft size={18} /> Back
                  </button>
                  <button 
                    className="next-btn confirm"
                    onClick={handleBookAppointment}
                    disabled={!canProceed()}
                  >
                    Confirm Booking <CheckCircle size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {bookingStep === 4 && (
              <div className="step-content confirmation">
                <div className="success-icon">
                  <CheckCircle size={64} />
                </div>
                <h3>Appointment Booked Successfully!</h3>
                <p>Your appointment has been confirmed. Here are the details:</p>
                
                <div className="confirmation-details">
                  <div className="detail-row">
                    <span>Patient Name</span>
                    <span>{patientInfo.name}</span>
                  </div>
                  <div className="detail-row">
                    <span>Date</span>
                    <span>{selectedDate?.toLocaleDateString()}</span>
                  </div>
                  <div className="detail-row">
                    <span>Time</span>
                    <span>{selectedTime?.time}</span>
                  </div>
                  <div className="detail-row">
                    <span>Doctor</span>
                    <span>{doctors.find(d => d.id === selectedDoctor)?.name}</span>
                  </div>
                  <div className="detail-row">
                    <span>Specialty</span>
                    <span>{doctors.find(d => d.id === selectedDoctor)?.specialty}</span>
                  </div>
                </div>

                <div className="confirmation-actions">
                  <button className="action-btn primary" onClick={() => navigate('/')}>
                    Go to Dashboard
                  </button>
                  <button className="action-btn secondary" onClick={() => {
                    setBookingStep(1);
                    setSelectedDate(null);
                    setSelectedTime(null);
                    setSelectedDoctor('');
                    setPatientInfo({ name: '', phone: '', email: '', age: '', gender: '', reason: '' });
                  }}>
                    Book Another
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Booking Summary Sidebar */}
          {bookingStep < 4 && (
            <div className="booking-sidebar">
              <h3>Booking Summary</h3>
              <div className="summary-card">
                <div className="summary-item">
                  <Calendar size={18} />
                  <div>
                    <span className="label">Date</span>
                    <span className="value">{selectedDate ? selectedDate.toLocaleDateString() : 'Not selected'}</span>
                  </div>
                </div>
                <div className="summary-item">
                  <Clock size={18} />
                  <div>
                    <span className="label">Time</span>
                    <span className="value">{selectedTime ? selectedTime.time : 'Not selected'}</span>
                  </div>
                </div>
                <div className="summary-item">
                  <Stethoscope size={18} />
                  <div>
                    <span className="label">Doctor</span>
                    <span className="value">
                      {selectedDoctor 
                        ? doctors.find(d => d.id === selectedDoctor)?.name 
                        : 'Not selected'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="contact-options">
                <h4>Need Help?</h4>
                <button className="contact-btn">
                  <Phone size={16} /> Call Us
                </button>
                <button className="contact-btn">
                  <Mail size={16} /> Email Support
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AppointmentBooking;