import React, {FC} from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import useActivity from "../../context/activity/useActivity";
import { Typography } from "@mui/material";

interface IFilterModalProps {
    filterOptions: string[];
    filterType: "OPERATION" | "PERIOD" | "AMOUNT" | "SEARCH" | "DELETE_FILTERS";
  }

export const FilterModal:FC<IFilterModalProps> = ({ filterOptions, filterType }) => {
  const { filterInfo, dispatch } = useActivity();
  const filterTypeString = JSON.stringify(filterType).toLowerCase();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: filterType,
      payload: (event.target as HTMLInputElement).value,
    });
  };

  return (
    <FormControl sx={{ width: "100%", variant: 'h5'}}>
      <RadioGroup
        name="controlled-radio-buttons-group"
        // @ts-ignore: Unreachable code error
        value={filterInfo[filterTypeString]}
        onChange={handleChange}
        sx={{ width: "100%" }}
      >
        {filterOptions.map((option: string) => (
          <FormControlLabel
            key={option}
            labelPlacement="start"
            value={option}
            label={<Typography style={{ fontSize: '15px' }}>{option}</Typography>}
            control={<Radio sx={{ color:"rgba(0, 0, 0, 0.5)" }} />}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              marginLeft: "0",
              color: "rgba(0, 0, 0, 0.5)",
            }}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default FilterModal;
