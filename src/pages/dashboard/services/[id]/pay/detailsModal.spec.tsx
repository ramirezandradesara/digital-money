import React from 'react';
import { render, screen } from '@testing-library/react';
import DetailsModal from './detailsModal';

describe('DetailsModal component tests', () => {
    test('Render component', () => {
        render(<DetailsModal service={undefined} setModal={undefined} />);
        
        const title = screen.getByText(/Detalles del pago/i);

        expect(title).toBeInTheDocument();
    });
});