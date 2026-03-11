import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Users, 
  Calendar, 
  Phone, 
  LayoutDashboard, 
  Plus, 
  Trash2, 
  Edit2, 
  LogOut,
  CheckCircle2,
  Clock,
  MapPin,
  Mail,
  Menu,
  X,
  Stethoscope,
  HeartPulse,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Types
interface Doctor {
  id: number;
  name: string;
  specialization: string;
  available_days: string;
}

interface Appointment {
  id: number;
  patient_name: string;
  phone: string;
  email: string;
  doctor_id: number;
  doctor_name?: string;
  appointment_date: string;
  message: string;
  created_at: string;
}

// Components
const Navbar = ({ activePage, setActivePage, isAdmin, setIsAdmin }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'doctors', label: 'Doctors', icon: Users },
    { id: 'appointment', label: 'Book Appointment', icon: Calendar },
    { id: 'contact', label: 'Contact', icon: Phone },
  ];

  if (isAdmin) {
    navItems.push({ id: 'admin', label: 'Dashboard', icon: LayoutDashboard });
  }

  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => setActivePage('home')}>
              <div className="bg-emerald-600 p-1.5 rounded-lg">
                <HeartPulse className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">CarePoint</span>
            </div>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                  activePage === item.id 
                    ? 'text-emerald-600 bg-emerald-50' 
                    : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-50'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
            {!isAdmin ? (
              <button 
                onClick={() => setActivePage('login')}
                className="ml-4 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-all"
              >
                Admin Login
              </button>
            ) : (
              <button 
                onClick={() => setIsAdmin(false)}
                className="ml-4 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition-all flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActivePage(item.id);
                    setIsOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                    activePage === item.id 
                      ? 'text-emerald-600 bg-emerald-50' 
                      : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </div>
                </button>
              ))}
              {!isAdmin ? (
                <button 
                  onClick={() => {
                    setActivePage('login');
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-slate-900"
                >
                  Admin Login
                </button>
              ) : (
                <button 
                  onClick={() => {
                    setIsAdmin(false);
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-red-600"
                >
                  Logout
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const HomePage = ({ onBookClick }: { onBookClick: () => void }) => (
  <div className="space-y-16 pb-16">
    {/* Hero Section */}
    <section className="relative h-[600px] flex items-center overflow-hidden bg-slate-900">
      <div className="absolute inset-0 z-0 opacity-40">
        <img 
          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000" 
          alt="Hospital" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl text-white"
        >
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Your Health, Our <span className="text-emerald-400">Priority</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Experience world-class healthcare with our team of expert doctors and state-of-the-art facilities. We are dedicated to providing compassionate care for you and your family.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={onBookClick}
              className="px-8 py-4 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-900/20"
            >
              Book Appointment
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-xl font-semibold hover:bg-white/20 transition-all">
              Our Services
            </button>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Services Section */}
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Specialized Services</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">We offer a wide range of medical services to meet all your healthcare needs.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: Stethoscope, title: 'General Checkup', desc: 'Regular health screenings and comprehensive examinations for all ages.' },
          { icon: Activity, title: 'Emergency Care', desc: '24/7 emergency services with a dedicated team of trauma specialists.' },
          { icon: HeartPulse, title: 'Cardiology', desc: 'Advanced heart care including diagnostics, treatment, and rehabilitation.' }
        ].map((service, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -5 }}
            className="p-8 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
              <service.icon className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
            <p className="text-slate-600 leading-relaxed">{service.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Info Section */}
    <section className="bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=1000" 
              alt="Medical Team" 
              className="rounded-3xl shadow-xl"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900">Why Choose CarePoint?</h2>
            <p className="text-slate-600 leading-relaxed">
              With over 20 years of experience, we have built a reputation for excellence in patient care. Our hospital is equipped with the latest medical technology and staffed by renowned specialists.
            </p>
            <ul className="space-y-4">
              {[
                'Highly Qualified Medical Staff',
                'Modern Diagnostic Equipment',
                'Personalized Treatment Plans',
                'Patient-Centric Approach'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-slate-700">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
);

const DoctorsPage = ({ doctors }: { doctors: Doctor[] }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div className="mb-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-4">Our Expert Doctors</h1>
      <p className="text-slate-600">Meet our team of highly qualified specialists dedicated to your well-being.</p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {doctors.map((doctor) => (
        <motion.div 
          key={doctor.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all"
        >
          <div className="h-48 bg-slate-100 relative">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${doctor.name}`} 
              alt={doctor.name}
              className="w-full h-full object-contain p-4"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-1">{doctor.name}</h3>
            <p className="text-emerald-600 font-medium mb-4">{doctor.specialization}</p>
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <Clock className="h-4 w-4" />
              <span>Available: {doctor.available_days}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const AppointmentPage = ({ doctors, onSubmit }: { doctors: Doctor[], onSubmit: (data: any) => void }) => {
  const [formData, setFormData] = useState({
    patient_name: '',
    phone: '',
    email: '',
    doctor_id: '',
    appointment_date: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setSuccess(true);
        setFormData({
          patient_name: '',
          phone: '',
          email: '',
          doctor_id: '',
          appointment_date: '',
          message: ''
        });
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        <div className="bg-emerald-600 p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Book an Appointment</h1>
          <p className="text-emerald-100">Fill out the form below and we'll get back to you shortly.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {success && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100 flex items-center gap-3"
            >
              <CheckCircle2 className="h-5 w-5" />
              Appointment booked successfully!
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Patient Name *</label>
              <input 
                required
                type="text"
                value={formData.patient_name}
                onChange={(e) => setFormData({...formData, patient_name: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Phone Number *</label>
              <input 
                required
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Email Address *</label>
              <input 
                required
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Appointment Date *</label>
              <input 
                required
                type="date"
                value={formData.appointment_date}
                onChange={(e) => setFormData({...formData, appointment_date: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Select Doctor *</label>
            <select 
              required
              value={formData.doctor_id}
              onChange={(e) => setFormData({...formData, doctor_id: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
            >
              <option value="">Choose a specialist...</option>
              {doctors.map(doc => (
                <option key={doc.id} value={doc.id}>{doc.name} ({doc.specialization})</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Message / Description</label>
            <textarea 
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              placeholder="Briefly describe your symptoms or reason for visit..."
            />
          </div>

          <button 
            disabled={isSubmitting}
            type="submit"
            className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-900/10 disabled:opacity-50"
          >
            {isSubmitting ? 'Processing...' : 'Confirm Appointment'}
          </button>
        </form>
      </div>
    </div>
  );
};

const ContactPage = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Get in Touch</h1>
          <p className="text-slate-600">Have questions? We're here to help. Contact us through any of these channels.</p>
        </div>

        <div className="space-y-6">
          {[
            { icon: MapPin, title: 'Our Location', detail: '123 Medical Plaza, Healthcare City, HC 54321' },
            { icon: Phone, title: 'Phone Number', detail: '+1 (555) 123-4567' },
            { icon: Mail, title: 'Email Address', detail: 'contact@carepoint.com' }
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">{item.title}</h3>
                <p className="text-slate-600">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="h-64 bg-slate-100 rounded-3xl overflow-hidden relative">
          <img 
            src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1000" 
            alt="Map" 
            className="w-full h-full object-cover opacity-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white px-6 py-3 rounded-full shadow-lg font-bold text-emerald-600 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Find us on Map
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Name" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500" />
            <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500" />
          </div>
          <input type="text" placeholder="Subject" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500" />
          <textarea rows={5} placeholder="Your Message" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500" />
          <button className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all">Send Message</button>
        </form>
      </div>
    </div>
  </div>
);

const AdminDashboard = ({ doctors, appointments, onRefresh }: { doctors: Doctor[], appointments: Appointment[], onRefresh: () => void }) => {
  const [view, setView] = useState<'stats' | 'doctors' | 'appointments'>('stats');
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [newDoctor, setNewDoctor] = useState({ name: '', specialization: '', available_days: '' });

  const handleDeleteDoctor = async (id: number) => {
    if (confirm('Are you sure you want to delete this doctor?')) {
      await fetch(`/api/doctors/${id}`, { method: 'DELETE' });
      onRefresh();
    }
  };

  const handleDeleteAppointment = async (id: number) => {
    if (confirm('Are you sure you want to delete this appointment?')) {
      await fetch(`/api/appointments/${id}`, { method: 'DELETE' });
      onRefresh();
    }
  };

  const handleAddDoctor = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/doctors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newDoctor)
    });
    setNewDoctor({ name: '', specialization: '', available_days: '' });
    onRefresh();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 space-y-2">
          <button 
            onClick={() => setView('stats')}
            className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all flex items-center gap-3 ${view === 'stats' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            <LayoutDashboard className="h-5 w-5" />
            Overview
          </button>
          <button 
            onClick={() => setView('doctors')}
            className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all flex items-center gap-3 ${view === 'doctors' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            <Users className="h-5 w-5" />
            Manage Doctors
          </button>
          <button 
            onClick={() => setView('appointments')}
            className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all flex items-center gap-3 ${view === 'appointments' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            <Calendar className="h-5 w-5" />
            Appointments
          </button>
        </div>

        {/* Content */}
        <div className="flex-1">
          {view === 'stats' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                    <Users className="h-6 w-6" />
                  </div>
                  <span className="text-4xl font-bold text-slate-900">{doctors.length}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">Total Doctors</h3>
                <p className="text-slate-500">Active medical specialists</p>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <span className="text-4xl font-bold text-slate-900">{appointments.length}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">Total Appointments</h3>
                <p className="text-slate-500">Booked consultations</p>
              </div>
            </div>
          )}

          {view === 'doctors' && (
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <h3 className="text-xl font-bold mb-6">Add New Doctor</h3>
                <form onSubmit={handleAddDoctor} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input 
                    required
                    placeholder="Doctor Name"
                    value={newDoctor.name}
                    onChange={e => setNewDoctor({...newDoctor, name: e.target.value})}
                    className="px-4 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <input 
                    required
                    placeholder="Specialization"
                    value={newDoctor.specialization}
                    onChange={e => setNewDoctor({...newDoctor, specialization: e.target.value})}
                    className="px-4 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <input 
                    required
                    placeholder="Available Days"
                    value={newDoctor.available_days}
                    onChange={e => setNewDoctor({...newDoctor, available_days: e.target.value})}
                    className="px-4 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button type="submit" className="md:col-span-3 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-500 transition-all flex items-center justify-center gap-2">
                    <Plus className="h-5 w-5" />
                    Add Doctor
                  </button>
                </form>
              </div>

              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="px-6 py-4 text-sm font-bold text-slate-700">Name</th>
                      <th className="px-6 py-4 text-sm font-bold text-slate-700">Specialization</th>
                      <th className="px-6 py-4 text-sm font-bold text-slate-700">Availability</th>
                      <th className="px-6 py-4 text-sm font-bold text-slate-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {doctors.map(doc => (
                      <tr key={doc.id}>
                        <td className="px-6 py-4 text-slate-900 font-medium">{doc.name}</td>
                        <td className="px-6 py-4 text-slate-600">{doc.specialization}</td>
                        <td className="px-6 py-4 text-slate-600">{doc.available_days}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button className="p-2 text-slate-400 hover:text-emerald-600 transition-colors">
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteDoctor(doc.id)}
                              className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {view === 'appointments' && (
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="px-6 py-4 text-sm font-bold text-slate-700">Patient</th>
                      <th className="px-6 py-4 text-sm font-bold text-slate-700">Doctor</th>
                      <th className="px-6 py-4 text-sm font-bold text-slate-700">Date</th>
                      <th className="px-6 py-4 text-sm font-bold text-slate-700">Contact</th>
                      <th className="px-6 py-4 text-sm font-bold text-slate-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {appointments.map(app => (
                      <tr key={app.id}>
                        <td className="px-6 py-4">
                          <div className="font-medium text-slate-900">{app.patient_name}</div>
                          <div className="text-xs text-slate-400 line-clamp-1">{app.message}</div>
                        </td>
                        <td className="px-6 py-4 text-slate-600">{app.doctor_name}</td>
                        <td className="px-6 py-4 text-slate-600">{app.appointment_date}</td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-slate-600">{app.phone}</div>
                          <div className="text-xs text-slate-400">{app.email}</div>
                        </td>
                        <td className="px-6 py-4">
                          <button 
                            onClick={() => handleDeleteAppointment(app.id)}
                            className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const LoginPage = ({ onLogin }: { onLogin: () => void }) => {
  const [creds, setCreds] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(creds)
    });
    if (res.ok) {
      onLogin();
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-slate-50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-slate-100"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <LayoutDashboard className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Admin Login</h1>
          <p className="text-slate-500">Enter your credentials to access the dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">{error}</div>}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Username</label>
            <input 
              required
              type="text"
              value={creds.username}
              onChange={e => setCreds({...creds, username: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="admin"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Password</label>
            <input 
              required
              type="password"
              value={creds.password}
              onChange={e => setCreds({...creds, password: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="••••••••"
            />
          </div>
          <button className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-900/10">
            Sign In
          </button>
        </form>
        <p className="mt-6 text-center text-xs text-slate-400">
          Demo: admin / admin123
        </p>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [isAdmin, setIsAdmin] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const fetchData = async () => {
    try {
      const [docsRes, appsRes] = await Promise.all([
        fetch('/api/doctors'),
        fetch('/api/appointments')
      ]);
      const docs = await docsRes.json();
      const apps = await appsRes.json();
      setDoctors(docs);
      setAppointments(apps);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderPage = () => {
    switch (activePage) {
      case 'home': return <HomePage onBookClick={() => setActivePage('appointment')} />;
      case 'doctors': return <DoctorsPage doctors={doctors} />;
      case 'appointment': return <AppointmentPage doctors={doctors} onSubmit={fetchData} />;
      case 'contact': return <ContactPage />;
      case 'login': return <LoginPage onLogin={() => { setIsAdmin(true); setActivePage('admin'); }} />;
      case 'admin': return isAdmin ? <AdminDashboard doctors={doctors} appointments={appointments} onRefresh={fetchData} /> : <LoginPage onLogin={() => { setIsAdmin(true); setActivePage('admin'); }} />;
      default: return <HomePage onBookClick={() => setActivePage('appointment')} />;
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Navbar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        isAdmin={isAdmin} 
        setIsAdmin={setIsAdmin} 
      />
      
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-emerald-600 p-1.5 rounded-lg">
                  <HeartPulse className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold tracking-tight">CarePoint Hospital</span>
              </div>
              <p className="text-slate-400 max-w-sm">
                Providing quality healthcare services with compassion and excellence. Our mission is to improve the health and well-being of the communities we serve.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4 text-slate-400">
                <li><button onClick={() => setActivePage('home')} className="hover:text-emerald-400 transition-colors">Home</button></li>
                <li><button onClick={() => setActivePage('doctors')} className="hover:text-emerald-400 transition-colors">Doctors</button></li>
                <li><button onClick={() => setActivePage('appointment')} className="hover:text-emerald-400 transition-colors">Book Appointment</button></li>
                <li><button onClick={() => setActivePage('contact')} className="hover:text-emerald-400 transition-colors">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Emergency</h4>
              <div className="space-y-4">
                <p className="text-slate-400">24/7 Hotline:</p>
                <p className="text-2xl font-bold text-emerald-400">+1 (555) 911-0000</p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-slate-500 text-sm">
            © {new Date().getFullYear()} CarePoint Hospital. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
