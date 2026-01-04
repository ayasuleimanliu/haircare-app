import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    setSubmitted(true);
  };

  return (
    <div className="contact">
      <h2>Tips for Using Your Oils</h2>
      <ul className="tips-list">
        <li><strong>Coconut Oil:</strong> Leave on for an hour or overnight before washing for deep hydration.</li>
        <li><strong>Argan Oil:</strong> Apply a few drops to wet or dry hair to reduce frizz and add shine.</li>
        <li><strong>Castor Oil:</strong> Mix with a lighter oil and massage into the scalp to stimulate growth.</li>
        <li><strong>Almond Oil:</strong> Use on ends or all over to nourish and reduce hair loss.</li>
        <li><strong>Rosemary Oil:</strong> Mix with olive or coconut oil and massage to boost circulation.</li>
        <li><strong>Jojoba Oil:</strong> Massage into scalp and leave for a few hours to balance oil and treat dandruff.</li>
      </ul>

      <h2>Contact Us For More Information</h2>
      <p>Email: <a href="mailto:aya.sleimanlb@gmail.com">aya.sleimanlb@gmail.com</a></p>
      <p>Phone: <a href="tel:+96178874289">+961 78874289</a></p>
      <p>Location: Saida-Meyi o Meyi-Hamshari Street, Lebanon</p>

     
      <h2>Send Us a Message</h2>
      {submitted ? (
        <p> Thank you for contacting us, {formData.name}! We’ll get back to you soon.</p>
      ) : (
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit">Send🌿</button>
        </form>
      )}
    </div>
  );
}

export default Contact;
