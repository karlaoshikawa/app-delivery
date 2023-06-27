import React from 'react';
import PropTypes from 'prop-types';

export default function Input({ placeholder, dataTestId,
  onChange, name, label, type, value }) {
  return (
    <label htmlFor={ name }>
      {label}
      <input
        type={ type }
        id={ name }
        value={ value }
        data-testid={ dataTestId }
        placeholder={ placeholder }
        onChange={ onChange }
        name={ name }
      />
    </label>
  );
}
Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  dataTestId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
