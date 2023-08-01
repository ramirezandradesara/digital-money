import { render, getByText, fireEvent, screen } from '@testing-library/react';
import Logout from './logout';
import mockRouter from 'next-router-mock';

jest.mock('next/router', () => require('next-router-mock'));

//mockear local storage
const removeItem = jest.spyOn(Storage.prototype,'removeItem');

global.fetch = jest.fn();


describe('Logout', () => {

    it('should render', () => {
        const { getByText } = render(< Logout />);
        expect(getByText('Cerrar sesión')).toBeInTheDocument()
    })
    it('should go to index page on click',()=>{
        mockRouter.push("/home");
        const { getByText } = render(< Logout />);
        fireEvent.click(getByText('Cerrar sesión'));
        expect(mockRouter.asPath).toEqual('/')
    })
    it('should drop token from localStorage',()=>{
        const { getByText } = render(< Logout />);
        fireEvent.click(getByText('Cerrar sesión'));
        expect(removeItem).toHaveBeenCalled();
    })
    it('should make an API call',()=>{

        const { getByText } = render(< Logout />);
        
        global.localStorage.setItem('token','asdasdasdsad');

        fireEvent.click(getByText('Cerrar sesión'));
        expect(global.fetch).toHaveBeenCalled();
    }
    )
})