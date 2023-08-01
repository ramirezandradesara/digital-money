import { render, screen } from '@testing-library/react'
import GeneralFooter from './general-footer'


describe('GeneralFooter', () => {
    describe('when rendering default layout', () => {
        it('should render the copyright text', () => {
            render(<GeneralFooter />);
            const copyrightText = screen.getByText('© 2023 Digital Money House');
            expect(copyrightText).toBeInTheDocument();
        });        
    });
});
