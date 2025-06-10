import React, { useState } from 'react';
import { addCustomer } from './api/customers';
import FormField from './formField';
import config, { customerMessages, regexPatterns } from './config';

export default function CustomerForm({ onSuccess }) {
  const defaultValues = { first_name: '', last_name: '', mail: '' }
  const [formData, setFormData] = useState(defaultValues);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);


   const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    e.target.setCustomValidity('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) {
      e.currentTarget.reportValidity();
      return;
    }
    setMessage(null);
    setLoading(true);
    try {
      await addCustomer(formData);
      setMessage(customerMessages.SUCCESS)
      setFormData(defaultValues);
      onSuccess();
    } catch {
      setMessage(customerMessages.FAILURE);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} >
      <FormField
        id="first_name"
        label="First Name"
        name="first_name"
        value={formData.first_name}
        onChange={handleChange}
        pattern={regexPatterns.NAME_PATTERN}
        title={regexPatterns.NAME_TITLE}
        required
      />

      <FormField
        id="last_name"
        label="Last Name"
        name="last_name"
        value={formData.last_name}
        onChange={handleChange}
        pattern={regexPatterns.NAME_PATTERN}
        title={regexPatterns.NAME_TITLE}
        required
      />

      <FormField
        id="mail"
        label="Email"
        name="mail"
        type="email"
        onChange={handleChange}
        value={formData.mail}
        pattern={regexPatterns.EMAIL_PATTERN}
        title={regexPatterns.EMAIL_TITLE}
        required
      />

      <button type="submit" disabled={loading}>{loading ? 'Saving…' : 'Add Customer'}</button>
      {message && <p>{message}</p>}
    </form>
  );
}
