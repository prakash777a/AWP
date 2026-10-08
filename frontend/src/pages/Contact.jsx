import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, Clock, Globe } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Sending...');
    // Simulate API call
    setTimeout(() => {
      setStatus('Message sent successfully! Our team will contact you shortly.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus(''), 5000);
    }, 1500);
  };

  return (
    <div className="contact-page">
      {/* Mini header for non-hero pages */}
      <div className="page-header pattern-bg">
        <div className="container">
          <h1 className="page-title">Get in Touch</h1>
          <p className="page-subtitle">We are here to assist you with all your travel needs.</p>
        </div>
      </div>

      <section className="section container">
        <div className="grid grid-cols-2 contact-layout">
          
          {/* Contact Information Details */}
          <div className="contact-info-wrapper">
            <h2 style={{ fontSize: 'var(--font-h2)', color: 'var(--primary)', marginBottom: 'var(--spacing-md)' }}>
              Let's craft your<br/>next adventure.
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-xl)', fontSize: '1.1rem' }}>
              Whether you want to customize a premium tour package, need support for an existing booking, or simply have inquiries, our travel experts are available 24/7.
            </p>
            
            <div className="info-list">
              <div className="info-card card hover-lift">
                <div className="info-icon-wrapper"><MapPin size={24} /></div>
                <div>
                  <h4 className="info-heading">Headquarters</h4>
                  <p className="info-text">123 Travel Vista Blvd, Suite 500<br/>San Francisco, CA 94107, USA</p>
                </div>
              </div>

              <div className="info-card card hover-lift">
                <div className="info-icon-wrapper"><Phone size={24} /></div>
                <div>
                  <h4 className="info-heading">Call Us</h4>
                  <p className="info-text">
                    <span className="d-block">+1 (555) 123-4567</span>
                    <span className="info-subtext">Toll-free in NA</span>
                  </p>
                </div>
              </div>

              <div className="info-card card hover-lift">
                <div className="info-icon-wrapper"><Mail size={24} /></div>
                <div>
                  <h4 className="info-heading">Email Support</h4>
                  <p className="info-text">
                    <span className="d-block">support@tourvista.com</span>
                    <span className="info-subtext">Replies within 2 hours</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-wrapper card">
            <div className="card-body" style={{ padding: '2.5rem' }}>
              <h3 className="card-title" style={{ fontSize: 'var(--font-h3)', marginBottom: 'var(--spacing-lg)' }}>Send a Message</h3>
              
              {status && (
                <div className={`alert ${status.includes('successfully') ? 'alert-success' : 'alert-info'} mb-4`}>
                  {status}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="form-container">
                <div className="form-row">
                  <div className="form-group w-50">
                    <label className="form-label" htmlFor="name">Full Name</label>
                    <input type="text" id="name" name="name" className="form-control" value={formData.name} onChange={handleChange} required placeholder="Jane Doe" />
                  </div>
                  <div className="form-group w-50">
                    <label className="form-label" htmlFor="email">Email Address</label>
                    <input type="email" id="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required placeholder="jane@example.com" />
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label" htmlFor="subject">Subject</label>
                  <input type="text" id="subject" name="subject" className="form-control" value={formData.subject} onChange={handleChange} required placeholder="E.g. Inquiry about Paris Package" />
                </div>
                
                <div className="form-group">
                  <label className="form-label" htmlFor="message">Your Message</label>
                  <textarea id="message" name="message" className="form-control" rows="5" value={formData.message} onChange={handleChange} required placeholder="How can we help you plan your perfect trip?"></textarea>
                </div>
                
                <button type="submit" className="btn btn-primary btn-large" style={{ width: '100%', marginTop: '1rem' }} disabled={status === 'Sending...'}>
                  <Send size={20} /> {status === 'Sending...' ? 'Transmitting...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
          
        </div>
      </section>
    </div>
  );
};

export default Contact;
