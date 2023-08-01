import { render, screen, act, waitFor, getByTestId, queryAllByText, findAllByRole, RenderResult } from '@testing-library/react';
import Index, { getStaticProps } from './index.page';
import mediaQuery from 'css-mediaquery';
import { theme } from '@/styles/material-theme';

//Crea una funcion que retorna otra función que simula ser una media query especifica
function createMatchMedia(width: number) {
  return (query: string): MediaQueryList => ({
    matches: mediaQuery.match(query, { width }) as boolean,
    media: '',
    addListener: () => {},
    removeListener: () => {},
    onchange: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => true,
  });
}

describe("IndexPage", () => {
  
  describe("when rendering default", () => {
    const texts=[
      {
        title: 'Titulo1',
        content: 'contenido1'
      },
      {
        title: 'Titulo2',
        content: 'contenido2'
      }
    ];
    const imgs=[{
      _id: "1",
      src: "/image-desktop.png",
      device: "desktop",
      alt: "Imagen 1"
    },
    {
      _id: "2",
      src: "/image-tablet.png",
      device: "tablet",
      alt: "Imagen 2"
    },
    {
      _id: "3",
      src: "/image-mobile.png",
      device: "mobile",
      alt: "Imagen 3"
    },

    ]
    it("should render card title", () => {

      render(<Index texts={texts} imgs={imgs} />)
      const title = screen.getByText("De ahora en adelante, hacés más con tu dinero");
      const h2_1 = screen.getByText('Tu nueva')
      const h2_2 = screen.getByText('billetera virtual')
      expect(title).toBeInTheDocument();
      expect(h2_1).toBeInTheDocument();
      expect(h2_2).toBeInTheDocument();

      /* const h1= screen.getByAltText('De ahora en adelante, hacés más con tu dinero')
      const h2= screen.getByAltText('Tu nueva billetera virtual')
      expect(h1).toBeInTheDocument;
      expect(h2).toBeInTheDocument(); */
    });
    it("should render desktop image",
      async () => {
        window.matchMedia = createMatchMedia(theme.breakpoints.values.laptop);
        
        const component= render(<Index texts={texts} imgs={imgs} />)

        const container = component.getByTestId('imageContainer');

        await waitFor(
          () => {
            const computedStyles = window.getComputedStyle(container);
            expect(container).toHaveStyle(`background-image: url('/image-desktop.png')`)
          }
        )
      });
      it("should render tablet image",
      async () => {
        window.matchMedia = createMatchMedia(theme.breakpoints.values.tablet);
        
        const component= render(<Index texts={texts} imgs={imgs} />)

        const container = component.getByTestId('imageContainer');

        await waitFor(
          () => {
            const computedStyles = window.getComputedStyle(container);
            expect(container).toHaveStyle(`background-image: url('/image-tablet.png')`)
          }
        )
      });
      it("should render mobile image",
      async () => {
        window.matchMedia = createMatchMedia(theme.breakpoints.values.tablet -1);
        
        const component= render(<Index texts={texts} imgs={imgs} />)

        const container = component.getByTestId('imageContainer');

        await waitFor(
          () => {
            const computedStyles = window.getComputedStyle(container);
            expect(container).toHaveStyle(`background-image: url('/image-mobile.png')`)
          }
        )
      })

      it("should use getStaticProps", async ()=>{
        expect(getStaticProps).toBeTruthy();
        
        /* await waitFor(
          ()=>{
            expect(fetchMongoText).toHaveBeenCalled();
            expect(fetchMongoImagesServer).toHaveBeenCalled();
          }
        ) */
      })
  });
});
