import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Link,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import { DataUser } from '../../../context/UserDataContext.jsx';
import ActivityItem from './ActivityItem';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SearchActivity from './SearchActivity';
import { theme } from '@/styles/material-theme';
import Loader from '@/components/utils/Loader';

const Activity: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [searchValue, setSearchValue] = useState<string>('');
  const { userData } = useContext(DataUser);
  const mobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const tablet = useMediaQuery(theme.breakpoints.between('tablet', 'laptop'));
  const [token, setToken] = useState<string | null>('');

  const fetchActivities = async () => {
    if (token) {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://digitalmoney.ctd.academy/api/accounts/${userData.id}/activity`,
          {
            headers: {
              'Content-Type': 'application/json',
              authorization: token,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          const limitedActivities = data.reverse();
          setActivities(limitedActivities);
        } else {
          console.error('Error fetching activities:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching activities:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  useEffect(() => {
    setToken(localStorage.getItem('token'));
    if (userData && token) {
      fetchActivities();
    }
  }, [userData, token]);

  return (
    <Box
      sx={{
        marginTop: mobile || tablet ? 16 : 0,
        display: 'flex',
        flexDirection: 'column',
        gap: mobile || tablet ? 2 : 3,
        minHeight: '70vh',
      }}
    >
      <SearchActivity
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        placeholder='Buscar en tu actividad'
      />

      <Box
        sx={{
          paddingTop: '35px',
          paddingBottom: '20px',
          paddingX: '30px',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
          borderRadius: '8px',
          marginBottom: '16px',
          backgroundColor: 'white',
        }}
      >
        {isLoading ? (
          <Loader height='150px' />
        ) : (
          <Box id='activity-container'>
            <Typography variant='h4' sx={{ marginBottom: 2 }}>
              Tu actividad
            </Typography>
            {activities
              ?.filter((activity) =>
                activity.description
                  .toLowerCase()
                  .includes(searchValue.toLowerCase())
              )
              .slice(0,10)
              .map((activity) => (
                <ActivityItem
                  key={activity.id}
                  activity={activity}
                  data-testid='activity-item'
                />
              ))}
            {activities.length > 0 && !isLoading ? (
              <Link
                href='/dashboard/activity'
                underline='none'
                sx={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px solid black',
                  paddingTop: 3,
                }}
              >
                <Typography variant='h5' data-testid='see-all-activities'>
                  Ver toda tu actividad
                </Typography>
                <IconButton sx={{ padding: 0 }}>
                  <ArrowForwardIcon sx={{ color: 'black' }} />
                </IconButton>
              </Link>
            ) : (
              <Typography
                variant='h4'
                sx={{
                  marginBottom: 2,
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                }}
                data-testid='no-activities'
              >
                No tienes actividad registrada
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Activity;
