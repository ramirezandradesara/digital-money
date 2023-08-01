import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';


const Logout: React.FC = () => {
    const router = useRouter();


    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                await fetch('/api/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            }

            localStorage.removeItem('token');
            router.push('/');
        } catch (error) {
            console.error('Ocurrió un error al cerrar sesión:', error);
        }
    };

    return (
        <div>            
            <Button variant="contained" onClick={handleLogout}>Cerrar sesión</Button>
        </div>
    );
};

export default Logout;

