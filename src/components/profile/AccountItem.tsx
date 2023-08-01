import React, { ChangeEvent, FC, useContext, useState } from 'react';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import { Done } from '@mui/icons-material';
import { DataUser } from '../../context/UserDataContext.jsx';
import * as yup from 'yup';

interface AccountItemProps {
  title: string;
  value: string;
  isEditable?: boolean
}

const AccountItem: FC<AccountItemProps> = ({ title, value, isEditable }) => {
  const { userData, setUserData, token } = useContext(DataUser);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isEditingAlias, setIsEditingAlias] = useState<boolean>(false);
  const [newAlias, setNewAlias] = useState<string>('');
  const aliasSchema = yup
    .string()
    .matches(/^[A-Za-z]+\.[A-Za-z]+\.[A-Za-z]+$/, 'Invalid alias format');
  const [aliasError, setAliasError] = useState<string>('');

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(value)
      .then(() => setIsCopied(true))
      .catch((err) => console.error('Failed to copy: ', err))
      .finally(() => setTimeout(() => setIsCopied(false), 2000));
  };

  const handleEditAlias = () => {
    setIsEditingAlias(true);
    setNewAlias(value);
  };

  const handleAliasChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAliasError('');
    setNewAlias(e.target.value);
  };
  const handleSaveNewAlias = async () => {
    const endpoint = `https://digitalmoney.ctd.academy/api/accounts/${userData.id}`;
    try {
      await aliasSchema.validate(newAlias);
      const response = await fetch(endpoint, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
        body: JSON.stringify({ alias: newAlias }),
      });

      if (response.ok) {
        const updatedUserData = { ...userData, alias: newAlias };
        setUserData(updatedUserData);
        setIsEditingAlias(false);
        setNewAlias('');
      } else {
        console.error('Failed to update alias');
      }
    } catch (error) {
      console.error('Alias validation error:', error);
      setAliasError(
        'Formato de alias incorrecto, por favor utiliza el formato XXX.XXX.XXX'
      );
    }
  };
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <Box sx={{ display: 'flex', gap: '0', alignItems: 'center' }}>
          <Typography
            sx={{
              paddingX: 1,
              fontWeight: 'bold',
              fontSize: 18,
              color: 'secondary.main',
            }}
          >
            {title}
          </Typography>
          {title === 'Alias' && isEditable &&(
            <>
              {isEditingAlias ? (
                <IconButton onClick={() => handleSaveNewAlias()} data-testid="done-icon">
                  <Done style={{ color: 'white', fontSize:"22px" }} />
                </IconButton>
              ) : (
                <IconButton onClick={() => handleEditAlias()} data-testid="edit-icon">
                  <EditIcon style={{ color: 'white', fontSize:"22px" }} />
                </IconButton>
              )}
            </>
          )}
        </Box>
        {isEditingAlias ? (
          <TextField
            variant='outlined'
            value={newAlias}
            onChange={(e) => handleAliasChange(e)}
            fullWidth
            autoFocus
            data-testid="edit-alias-input"
            sx={{
              fontSize: 16,
              padding: 0,
              color: 'white',
              paddingLeft: '4px',
              fieldset: { borderColor: 'transparent' },
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: 'transparent',
                },
                '&:hover fieldset': {
                  borderColor: 'transparent',
                },
              },
            }}
            inputProps={{
              style: {
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: 4,
                color: 'white',
              },
            }}
          />
        ) : (
          <Typography
            sx={{
              color: 'white',
              width: '100%',
              paddingX: 1,
              fontSize: 14,
            }}
          >
            {value}
          </Typography>
        )}
        {aliasError && (
          <Typography
            sx={{
              color: 'error.main',
              fontSize: 16,
              paddingTop: 1,
              paddingLeft: 1,
            }}
            data-testid="format-alias-error"
          >
            {aliasError}
          </Typography>
        )}
      </Box>
      <Box>
        {isCopied ? (
          <Typography
            sx={{
              width: '100%',
              paddingX: 1,
              fontWeight: 'bold',
              color: 'secondary.main',
              fontSize: 15,
            }}
          >
            Copied!
          </Typography>
        ) : (
          <ContentCopyIcon
            sx={{ color: 'secondary.main', cursor: 'pointer' }}
            onClick={handleCopyClick}
            data-testid="copy-icon"
          />
        )}
      </Box>
    </Box>
  );
};

export default AccountItem;
