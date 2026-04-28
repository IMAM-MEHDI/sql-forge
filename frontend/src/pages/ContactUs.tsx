import { useState, type SyntheticEvent } from 'react';
import { Mail, MessageSquare, Send, MapPin, Phone } from 'lucide-react';
import './ContactUs.css';

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, you would send this to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  return (
    <main className="container contact-main">
      <div className="contact-container">
        <div className="contact-header">
          <h1 className="contact-title">
            Get in Touch
          </h1>
          <p className="contact-subtitle">
            Have questions, feedback, or found a bug? Our team is here to help you master SQL.
          </p>
        </div>

        <div className="contact-grid">
          {/* Contact Info */}
          <div className="info-column">
            <div className="info-section">
              <h3 className="info-title">Contact Information</h3>
              <div className="info-list">
                <div className="info-item">
                  <div className="info-icon email"><Mail size={24} /></div>
                  <div className="info-text">
                    <h4>Email Us</h4>
                    <p>support@sqlforge.com</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon location"><MapPin size={24} /></div>
                  <div className="info-text">
                    <h4>Visit Us</h4>
                    <p>123 Database Row, Silicon Valley, CA</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon phone"><Phone size={24} /></div>
                  <div className="info-text">
                    <h4>Call Us</h4>
                    <p>+1 (555) 000-0000</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-panel community-panel">
              <h4><MessageSquare size={20} /> Community Support</h4>
              <p>
                Join our Discord or visit our Forum for faster community-driven help and SQL discussions.
              </p>
              <button 
                onClick={() => window.open('https://discord.gg/sqlforge', '_blank')}
                className="community-link"
              >
                Join our Discord →
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-panel form-panel">
            {submitted ? (
              <div className="success-state">
                <div className="success-icon"><Send size={64} /></div>
                <h2>Message Sent!</h2>
                <p>Thank you for reaching out. Our team will get back to you within 24-48 hours.</p>
                <button onClick={() => setSubmitted(false)} className="btn-secondary">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input 
                      id="name"
                      type="text" 
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input 
                      id="email"
                      type="email" 
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-group margin-sm">
                  <label htmlFor="subject">Subject</label>
                  <input 
                    id="subject"
                    type="text" 
                    required
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>
                <div className="form-group margin-lg">
                  <label htmlFor="message">Message</label>
                  <textarea 
                    id="message"
                    required
                    rows={6}
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
                <button type="submit" className="btn-primary submit-button">
                  <Send size={20} /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
