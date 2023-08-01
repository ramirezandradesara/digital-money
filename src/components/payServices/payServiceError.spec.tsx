import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PayServiceError from './PayServiceError';

describe('PayServiceError', () => {
  const handleClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders component with correct props', () => {
    const text = 'Error Text';
    const description = 'Error Description';
    const buttonText = 'Retry';

    const { getByText } = render(
      <PayServiceError
        text={text}
        description={description}
        buttonText={buttonText}
        handleClick={handleClick}
      />
    );

    expect(getByText(text)).toBeInTheDocument();
    expect(getByText(description)).toBeInTheDocument();
    expect(getByText(buttonText)).toBeInTheDocument();
  });

});
