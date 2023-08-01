import React, { FC } from "react";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Autocomplete, { AutocompleteChangeReason } from "@mui/material/Autocomplete";
import { AccountActivityType } from "../../utils/types/interfaces.types";
import useActivity from '../../context/activity/useActivity';

interface ISearchBarProps {
  placeholder?: string;
  transactions: AccountActivityType[] | [];
}

const SearchBar: FC<ISearchBarProps> = ({
  placeholder = "Buscar",
  transactions,
}) => {
  const { filterInfo, dispatch } = useActivity();
  const deleteDuplicates = (arr: AccountActivityType[] | []) => {
    const transactionsMap = arr.map((trans) => {
      return [trans.description, trans];
    });

    // @ts-ignore: Unreachable code error
    return [...new Map(transactionsMap).values()];
  };
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: any
  ) => {
    dispatch({ type: "SEARCH", payload: value });
  };
  return (
    <Autocomplete
      id="free-solo-demo"
      freeSolo
      options={deleteDuplicates(transactions).map(
        (option) => option.description
      )}
      disableClearable
     inputValue={filterInfo.search}
      onInputChange={(_, newInputValue) => {
        dispatch({ type: "SEARCH", payload: newInputValue });
      }}
      sx={{
        height: "100%",
      }}
      // @ts-ignore: Unreachable code error
     onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
              backgroundColor: "white",
              borderRadius: "4px",
              "&:focus": {
                outline: "none",
              },
            },
          }}
          placeholder={placeholder}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};

export default SearchBar;