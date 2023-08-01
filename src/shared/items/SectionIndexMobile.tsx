import { Stack, Theme, Typography } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { theme } from "../../styles/material-theme";

export type SectionIndexProps = {
  section: string;
};

const SectionIndexMobile = ({ section }: SectionIndexProps) => {
  return (
    <Stack
      direction={"row"}
      alignItems="center"
      mb={2}
      sx={{
        [theme.breakpoints.up("tablet")]: {
          display: "none",
        },
      }}
    >
      <ArrowForwardRoundedIcon sx={{ color: "#808080" }} />
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: "600",
          textDecorationLine: "underline",
          color: (theme: Theme) => "#808080",
        }}
      >
        {section}
      </Typography>
    </Stack>
  );
};

export default SectionIndexMobile;
