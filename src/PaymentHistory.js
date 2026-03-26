import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, CreditCard, DollarSign, Calendar, Download, 
  Filter, CheckCircle, XCircle, Clock, Activity,
  ChevronLeft, ChevronRight, Eye
} from 'lucide-react';
import './PaymentHistory.css';

// Mock payment data
const allPayments = [
  { id: 'TXN-001', patientId: 'P-101', patientName: 'Rahul Sharma', date: '2026-03-24', service: 'General Checkup', amount: 500, status: 'completed', method: 'UPI', invoice: 'INV-2026-001' },
  { id: 'TXN-002', patientId: 'P-103', patientName: 'Amit Patel', date: '2026-03-24', service: 'Cardiology Consultation', amount: 800, status: 'completed', method: 'Card', invoice: 'INV-2026-002' },
  { id: 'TXN-003', patientId: 'P-102', patientName: 'Sunita Kumari', date: '2026-03-23', service: 'X-Ray', amount: 350, status: 'pending', method: 'Cash', invoice: 'INV-2026-003' },
  { id: 'TXN-004', patientId: 'P-104', patientName: 'Priya Singh', date: '2026-03-23', service: 'Ultrasound', amount: 600, status: 'completed', method: 'UPI', invoice: 'INV-2026-004' },
  { id: 'TXN-005', patientId: 'P-106', patientName: 'Kavita Reddy', date: '2026-03-22', service: 'Orthopedic Surgery', amount: 15000, status: 'completed', method: 'Card', invoice: 'INV-2026-005' },
  { id: 'TXN-006', patientId: 'P-107', patientName: 'Vikram Singh', date: '2026-03-22', service: 'Lab Tests', amount: 1200, status: 'completed', method: 'UPI', invoice: 'INV-2026-006' },
  { id: 'TXN-007', patientId: 'P-105', patientName: 'Raj Malhotra', date: '2026-03-21', service: 'Neurology Consultation', amount: 900, status: 'cancelled', method: 'Card', invoice: 'INV-2026-007' },
  { id: 'TXN-008', patientId: 'P-108', patientName: 'Meera Nair', date: '2026-03-21', service: 'Dermatology Treatment', amount: 450, status: 'completed', method: 'Cash', invoice: 'INV-2026-008' },
  { id: 'TXN-009', patientId: 'P-101', patientName: 'Rahul Sharma', date: '2026-03-20', service: 'Blood Test', amount: 400, status: 'completed', method: 'UPI', invoice: 'INV-2026-009' },
  { id: 'TXN-010', patientId: 'P-103', patientName: 'Amit Patel', date: '2026-03-20', service: 'ECG', amount: 250, status: 'completed', method: 'Card', invoice: 'INV-2026-010' },
  { id: 'TXN-011', patientId: 'P-102', patientName: 'Sunita Kumari', date: '2026-03-19', service: 'MRI Scan', amount: 3500, status: 'pending', method: 'Card', invoice: 'INV-2026-011' },
  { id: 'TXN-012', patientId: 'P-104', patientName: 'Priya Singh', date: '2026-03-19', service: 'Prenatal Checkup', amount: 550, status: 'completed', method: 'UPI', invoice: 'INV-2026-012' },
  { id: 'TXN-013', patientId: 'P-106', patientName: 'Kavita Reddy', date: '2026-03-18', service: 'Post-surgery Care', amount: 800, status: 'completed', method: 'Cash', invoice: 'INV-2026-013' },
  { id: 'TXN-014', patientId: 'P-107', patientName: 'Vikram Singh', date: '2026-03-18', service: 'Diabetes Management', amount: 700, status: 'completed', method: 'UPI', invoice: 'INV-2026-014' },
  { id: 'TXN-015', patientId: 'P-108', patientName: 'Meera Nair', date: '2026-03-17', service: 'Skin Biopsy', amount: 800, status: 'completed', method: 'Card', invoice: 'INV-2026-015' },
];

const PaymentHistory = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const itemsPerPage = 10;

  const filteredPayments = allPayments.filter(payment => {
    const matchesSearch = payment.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.invoice.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPayments = filteredPayments.slice(startIndex, startIndex + itemsPerPage);

  const totalAmount = allPayments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);
  
  const pendingAmount = allPayments
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed':
        return <CheckCircle size={16} className="status-icon completed" />;
      case 'pending':
        return <Clock size={16} className="status-icon pending" />;
      case 'cancelled':
        return <XCircle size={16} className="status-icon cancelled" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status) => {
    return `status-${status}`;
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
            <CreditCard size={20} /> Patients
          </div>
          <div className="nav-link" onClick={() => navigate('/doctors')}>
            <CreditCard size={20} /> Doctors
          </div>
          <div className="nav-link" onClick={() => navigate('/rooms')}>
            <CreditCard size={20} /> Rooms
          </div>
          <div className="nav-link" onClick={() => navigate('/booking')}>
            <CreditCard size={20} /> Book Appointment
          </div>
          <div className="nav-link active" onClick={() => navigate('/payments')}>
            <CreditCard size={20} /> Payments
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
              placeholder="Search by patient name, ID, or invoice..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="header-right">
            <button className="add-btn">
              <Download size={18} /> Export
            </button>
            <div className="avatar">AD</div>
          </div>
        </header>

        <div className="payments-content">
          <div className="payments-header">
            <h2><CreditCard size={24} /> Payment History</h2>
          </div>

          {/* Summary Cards */}
          <div className="summary-cards">
            <div className="summary-card">
              <div className="summary-icon completed">
                <CheckCircle size={24} />
              </div>
              <div className="summary-info">
                <h3>₹{totalAmount.toLocaleString()}</h3>
                <p>Total Received</p>
              </div>
            </div>
            <div className="summary-card">
              <div className="summary-icon pending">
                <Clock size={24} />
              </div>
              <div className="summary-info">
                <h3>₹{pendingAmount.toLocaleString()}</h3>
                <p>Pending Payments</p>
              </div>
            </div>
            <div className="summary-card">
              <div className="summary-icon total">
                <DollarSign size={24} />
              </div>
              <div className="summary-info">
                <h3>{allPayments.length}</h3>
                <p>Total Transactions</p>
              </div>
            </div>
            <div className="summary-card">
              <div className="summary-icon cancelled">
                <XCircle size={24} />
              </div>
              <div className="summary-info">
                <h3>{allPayments.filter(p => p.status === 'cancelled').length}</h3>
                <p>Cancelled</p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="filters-row">
            <div className="filter-group">
              <Filter size={16} />
              <select 
                value={statusFilter} 
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="results-count">
              Showing {paginatedPayments.length} of {filteredPayments.length} transactions
            </div>
          </div>

          {/* Payments Table */}
          <div className="payments-table-container">
            <table className="payments-table">
              <thead>
                <tr>
                  <th>Invoice</th>
                  <th>Patient</th>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedPayments.map((payment) => (
                  <tr key={payment.id}>
                    <td>
                      <span className="invoice-id">{payment.invoice}</span>
                    </td>
                    <td>
                      <div className="patient-cell">
                        <span className="patient-name">{payment.patientName}</span>
                        <span className="patient-id">{payment.patientId}</span>
                      </div>
                    </td>
                    <td>{payment.service}</td>
                    <td>
                      <div className="date-cell">
                        <Calendar size={14} />
                        {payment.date}
                      </div>
                    </td>
                    <td>
                      <span className="amount">₹{payment.amount.toLocaleString()}</span>
                    </td>
                    <td>
                      <span className="method">{payment.method}</span>
                    </td>
                    <td>
                      <span className={`status-badge ${getStatusClass(payment.status)}`}>
                        {getStatusIcon(payment.status)}
                        {payment.status}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="view-btn"
                        onClick={() => setSelectedPayment(payment)}
                      >
                        <Eye size={16} /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button 
              className="page-btn"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={18} /> Previous
            </button>
            <div className="page-numbers">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  className={`page-number ${currentPage === page ? 'active' : ''}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
            </div>
            <button 
              className="page-btn"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Payment Details Modal */}
        {selectedPayment && (
          <div className="modal-overlay" onClick={() => setSelectedPayment(null)}>
            <div className="payment-details-modal" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={() => setSelectedPayment(null)}>×</button>
              
              <div className="modal-header">
                <h3>Payment Details</h3>
                <span className={`status-badge large ${getStatusClass(selectedPayment.status)}`}>
                  {getStatusIcon(selectedPayment.status)}
                  {selectedPayment.status}
                </span>
              </div>

              <div className="invoice-header">
                <div className="invoice-info">
                  <span className="invoice-label">Invoice</span>
                  <span className="invoice-value">{selectedPayment.invoice}</span>
                </div>
                <div className="transaction-info">
                  <span className="invoice-label">Transaction ID</span>
                  <span className="invoice-value">{selectedPayment.id}</span>
                </div>
              </div>

              <div className="payment-details-grid">
                <div className="detail-item">
                  <span className="detail-label">Patient Name</span>
                  <span className="detail-value">{selectedPayment.patientName}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Patient ID</span>
                  <span className="detail-value">{selectedPayment.patientId}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Service</span>
                  <span className="detail-value">{selectedPayment.service}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Date</span>
                  <span className="detail-value">{selectedPayment.date}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Payment Method</span>
                  <span className="detail-value">{selectedPayment.method}</span>
                </div>
              </div>

              <div className="amount-section">
                <span className="amount-label">Total Amount</span>
                <span className="amount-value">₹{selectedPayment.amount.toLocaleString()}</span>
              </div>

              <div className="modal-actions">
                <button className="action-btn primary">
                  <Download size={18} /> Download Invoice
                </button>
                <button className="action-btn secondary">
                  Print Receipt
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PaymentHistory;
