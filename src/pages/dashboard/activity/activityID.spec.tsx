import { render, screen } from '@testing-library/react';
import Home from './[id].page';
import { NextRouter } from 'next/router';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn() as any,
}));

describe.skip('Home component', () => {
  it('should render DMH | Actividad', () => {
    const mockRouter = {
      query: { id: "hello" }, 
    };

    useRouter.mockReturnValue({mockRouter});
    render(<Home />);

    const pageTitle = screen.getByText('DMH | Actividad');
    expect(pageTitle).toBeInTheDocument();
  });
});
