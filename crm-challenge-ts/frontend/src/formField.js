import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function FormField({ id, label, name, type = 'text', value, onChange, pattern, title, required = true, error = ''}) {
  

  const [touched, setTouched] = useState(false);
  const [internalError, setInternalError] = useState('');

  const handleBlur = (e) => {
    setTouched(true);
    validateField(e.target);
  };

  const validateField = (input) => {
    if (!input.validity.valid) {
        setInternalError(input.validationMessage || 'Invalid Input');
    } else {
        setInternalError('');
    }
  };

  const handleChange = (e) => {
    onChange(e);
    if(touched) {
        validateField(e.target);
    }
  };

  return (
    <div>
      <label htmlFor={id}>
        {label}:
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          pattern={pattern}
          title={title}
          required={required}
        />
      </label>
      {error && <small style={{ color: 'red' }}>{error}</small>}
    </div>
  );
}

FormField.propTypes = {
  id:       PropTypes.string.isRequired,
  label:    PropTypes.string.isRequired,
  name:     PropTypes.string.isRequired,
  type:     PropTypes.string,
  value:    PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  pattern:  PropTypes.string,
  title:    PropTypes.string,
  required: PropTypes.bool,
  error:    PropTypes.string,
};
