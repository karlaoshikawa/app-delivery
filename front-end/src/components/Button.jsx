import React from 'react';
import PropTypes from 'prop-types';

export default function Button({ dataTestId, content, onClick, isDisabled }) {
  return (
    <button
      type="button"
      data-testid={ dataTestId }
      onClick={ onClick }
      disabled={ isDisabled }
    >
      {content}

    </button>
  );
}

Button.propTypes = {
  content: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  dataTestId: PropTypes.string.isRequired,
};
