import { InputAdornment, TextField, useMediaQuery } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { theme } from '@/styles/material-theme';

interface SearchActivityProps {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  placeholder: string;
}

const SearchActivity: React.FC<SearchActivityProps> = ({
  searchValue,
  setSearchValue,
  placeholder,
}) => {
  const tablet = useMediaQuery(theme.breakpoints.between('tablet', 'laptop'));
  const desktop = useMediaQuery(theme.breakpoints.up('desktop'));

  return (
    <TextField
      sx={{
        borderRadius: '6px',
        width: '100%',
        backgroundColor: '#fff',
        marginBottom: tablet || desktop ? '20px' : 0,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
        fieldset: { borderColor: '#D2FFEC' },
        '& .MuiOutlinedInput-root': {
          '&.Mui-focused fieldset': {
            borderColor: 'secondary.main',
          },
          '&:hover fieldset': {
            borderColor: 'secondary.main',
          },
        },
      }}
      variant='outlined'
      placeholder={placeholder}
      data-testid="search-input"
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <SearchRoundedIcon />
          </InputAdornment>
        ),
      }}
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
    />
  );
};

export default SearchActivity;
