import { render, screen } from '@testing-library/react';
import CardIndex from './cardIndex';

describe("CardIndex", () => {
    describe("when rendering default", () => {
        it('should render title and content', () => {
            render(
                <CardIndex title='Titulo' content='Contenido' />
            )
            const title = screen.getByText('Titulo');
            const content= screen.getByText('Contenido');
            expect(title).toBeInTheDocument()
            expect(content).toBeInTheDocument()
        }
        )
    });
});