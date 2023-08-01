import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import { ActivityContext, IFilterInfo } from './ActivityContext';
import FilterModal from '../../components/activity/FilterModal';
import useActivity from './useActivity';

jest.mock('../activity/useActivity', () => ({
    __esModule: true,
    default: jest.fn(),
  }));
const mockDispatch = jest.fn();
const mockFilterInfo: IFilterInfo = {
  operation: '',
  period: '',
  amount: '',
  search: '',
};
const mockContextValue = {
  filterInfo: mockFilterInfo,
  dispatch: mockDispatch,
};
const mockUseActivity = jest.fn().mockReturnValue({ filterInfo: mockFilterInfo, dispatch: mockDispatch });
const customRenderOperation = () => {
  render(
    <ActivityContext.Provider value={mockContextValue}>
      <FilterModal filterOptions={['Ingresos', 'Egresos']} filterType="OPERATION" />
    </ActivityContext.Provider>
  );
};

describe.skip('--------- FilterModal ---------------', () => {
    beforeEach(() => {
        mockDispatch.mockClear();
        mockUseActivity.mockClear();
        jest.clearAllMocks();
      });

  it('should render operation options',  async () => {
    (useActivity as jest.Mock).mockImplementation(mockUseActivity);
    customRenderOperation();

    const option1 = screen.getByLabelText('Ingresos');
    const option2 = screen.getByLabelText('Egresos');

    await waitFor(() => {fireEvent.change(option1)});
    expect(mockDispatch).toHaveBeenCalled();

    fireEvent.change(option2);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'OPERATION',
      payload: 'Egresos',
    });
  });
});