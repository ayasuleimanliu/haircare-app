
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Checkout.css';

function Checkout() {
  const location = useLocation();
  const selectedOils = location.state?.selectedOils || [];
  const [confirmation, setConfirmation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

   
    const order = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      address: formData.get('address'),
      oils: selectedOils.map(oil => ({
        id: oil.id || null,         
        name: oil.name,
        price: oil.price,
        quantity: oil.quantity || 1  
      }))
    };

    try {
      const res = await fetch('http://localhost:5000/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setConfirmation(`⚠️ Something went wrong. ${err.error ? err.error : 'Please try again.'}`);
        return;
      }

      const data = await res.json();
      if (data.success) {
        setConfirmation(
          ` Thank you, ${order.name}! Your order was placed successfully.\n\n📞 ${order.phone}\n📧 ${order.email}\n🏠 ${order.address}`
        );
        e.target.reset();
      } else {
        setConfirmation('⚠️ Something went wrong. Please try again.');
      }
    } catch {
      setConfirmation('⚠️ Server error. Please try again later.');
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout">
        <h1>Checkout</h1>
        <p>You should enter your details below to confirm your purchase 🌿</p>

        <h2>Oils Selected:</h2>
        <ul>
          {selectedOils.map((oil, index) => (
            <li key={index}>
              🧴 {oil.name} — <strong>{oil.price}</strong> (Qty: {oil.quantity || 1})
            </li>
          ))}
        </ul>

        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" placeholder="Enter your full name" required />
          </label>
          <label>
            Phone Number:
            <input type="tel" name="phone" placeholder="e.g. +961 70000000" required />
          </label>
          <label>
            Email:
            <input type="email" name="email" placeholder="example@email.com" required />
          </label>
          <label>
            Address:
            <textarea name="address" placeholder="Street, City, Country" required />
          </label>
          <button type="submit">Order Confirm</button>
        </form>

        {confirmation && <div className="confirmation-message">{confirmation}</div>}
      </div>
    </div>
  );
}

export default Checkout;
