import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import React, { FC, useContext } from 'react';
import { DataUser } from '../../context/UserDataContext.jsx';;
import AccountItem from './AccountItem';
import Loader from '../utils/Loader';
import { theme } from '@/styles/material-theme';

type AccountDataProps={
  isEditable?:boolean
}

const AccountData: FC<AccountDataProps> = ({isEditable}) => {
  const { userData } = useContext(DataUser);
  const mobile = useMediaQuery(theme.breakpoints.down('tablet'));

  return (
    <Grid
      item
      sx={{
        backgroundColor: 'primary.main',
        borderRadius: 2,
        paddingY: mobile ? 2 : 5,
        paddingX: mobile ? 3 : 4,
      }}
      data-testid="account-data"
    >
      {userData ? (
        <>
          <Box>
            <Typography
              sx={{
                color: 'white',
                width: '100%',
                paddingX: mobile ? 0 : 1,
                fontWeight: mobile ? '' : 'bold',
                fontSize: 14,
              }}
            >
              Copia tu cvu o alias para ingresar o transferir dinero desde otra
              cuenta
            </Typography>
            
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              marginTop: 4,
            }}
          >
            <AccountItem title='CVU' value={userData.cvu} isEditable={isEditable}/>
            {mobile && <Box sx={{ borderBottom: '1px solid #ccc' }} />}
            <AccountItem title='Alias' value={userData.alias} isEditable={isEditable}/>
          </Box>
        </>
      ) : (
        <Loader />
      )}
    </Grid>
  );
};

export default AccountData;
