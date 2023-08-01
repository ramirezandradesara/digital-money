

import React from 'react';
import { render } from '@testing-library/react';
import ActivityItem from './ActivityItem';

describe('ActivityItem', () => {
  interface Activity {
    id: number;
    description: string;
    amount: number;
    dated: string;
  }

  const mockedActivity: Activity = {
    id: 1,
    description: 'Sample activity',
    amount: 100,
    dated: '2023-05-30T12:00:00Z',
  };

  it('should render activity item with correct data', () => {
    const { getByText } = render(<ActivityItem activity={mockedActivity} />);

    const descriptionElement = getByText(/Sample activity/i);
    expect(descriptionElement).toBeInTheDocument();

    const amountElement = getByText('$ 100');
    expect(amountElement).toBeInTheDocument();

  });

  it('should render activity item with negative amount', () => {
    const negativeActivity = {
      ...mockedActivity,
      amount: -50,
    };

    const { getByText } = render(<ActivityItem activity={negativeActivity} />);

    const amountElement = getByText('-$ 50');
    expect(amountElement).toBeInTheDocument();
  });
});

