import { ReactElement } from 'react';
import { renderToString } from 'react-dom/server';

const renderString = (jsx: ReactElement): string => {
    console.log(renderToString(jsx))
  return renderToString(jsx);
}

export default renderString;