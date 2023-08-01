import { Stack, Typography } from "@mui/material";
import useActivity from "../../context/activity/useActivity";
import { FilterTag } from "./FilterTag";

const FilterTagList = () => {
  const { filterInfo } = useActivity();
  return (
    <Stack direction="row" alignItems="center" sx={{ pb: "8px", pt: "4px" }}>
      <Typography component="h6" variant="h6">
        Filtros aplicados:
      </Typography>
      <Stack direction="row" alignItems="center" flexWrap="wrap">
        {filterInfo.search && <FilterTag>{filterInfo.search}</FilterTag>}
        {filterInfo.operation && <FilterTag>{filterInfo.operation}</FilterTag>}
        {filterInfo.period && <FilterTag>{filterInfo.period}</FilterTag>}
        {filterInfo.amount && <FilterTag>{filterInfo.amount}</FilterTag>}
      </Stack>
    </Stack>
  );
};

export default FilterTagList;
