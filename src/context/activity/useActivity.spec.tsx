
import { useContext } from 'react';
import useActivity from './useActivity';
import { renderHook } from '@testing-library/react';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
}));

describe('-------- useActivity --------', () => {
  it('should return the activity context value when set', () => {
    const mockContextValue = {
        'hello':'Hello'
    };

    useContext.mockReturnValue(mockContextValue) as any;

    const { result } = renderHook(() => useActivity());

    expect(result.current).toBe(mockContextValue);
  });

  it('should throw the custom error message when the context value is undefined', () => {
    useContext.mockReturnValue(undefined);

    expect(() => {
        try {
          useActivity();
        } catch (error) {
          expect(error.message).toBe('useActivity must be used within a OrderProvider');
          throw error;
        }
      }).toThrow('useActivity must be used within a OrderProvider');
  });
});