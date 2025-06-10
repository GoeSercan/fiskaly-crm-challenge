import React, { useState } from 'react';
import { addTss } from './api/customers';

export default function TssForm({ onTssCreated }) {
  const [customerId, setCustomerId] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customerId.trim()) return;
    setLoading(true);
    setMessage('');
    
    try {
      const response = await addTss(customerId.trim());
      if (response.data.success) {
        setMessage(`New TSS created: ${response.data.tss_id}`);
        setCustomerId('');
        onTssCreated();
      } else {
        setMessage(response.data.message || 'Failed to create TSS');
        console.log(response)
      }
    } catch (err) {
      setMessage(err.response?.data?.error || 'Error creating TSS');
    } finally {
      setLoading(false);
    }
  };

  return (
      <form onSubmit={handleSubmit} >
        <div>
          <label>
            Customer ID:
            <input
              type="text"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              placeholder="Enter Customer ID"
              required
            />
          </label>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create TSS'}
        </button>
        {message && <p style={{ color: message.includes('created') ? 'green' : 'red' }}>{message}</p>}
      </form>
  );
}