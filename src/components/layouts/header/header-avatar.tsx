import { DataUser } from "../../../context/UserDataContext";
import {
  Box,
  IconButton,
  Skeleton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useRouter } from "next/router";
import { FC, ReactElement, useContext } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import AvatarNameText from "./avatarNameText";
import { theme } from "@/styles/material-theme";

type Props = {
  variant?: "index" | "signIn" | "home" | null;
};

const HeaderAvatar: FC<Props> = ({
  variant,
}: Props): ReactElement<any, any> | null => {
  const { userData, setModalFlag } = useContext(DataUser);
  const router = useRouter();
  const mobile = useMediaQuery(theme.breakpoints.down("tablet"));

  if (variant === "home") {
    return (
      <Box
        sx={{
          "& .MuiButton-root": { textTransform: "none" },
          display: "flex",
          gap: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "secondary.main",
            borderRadius: 4,
            display: "flex",
            minHeight: 38,
            minWidth: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => router.push("/dashboard")}
        >
          {userData === null || userData?.firstname === undefined ? (
            <Skeleton
              variant="circular"
              width={30}
              height={30}
              sx={{ bgcolor: "grey.500", borderRadius: 5 }}
            >
              <Typography
                sx={{
                  color: "primary.main",
                  fontWeight: "bold",
                }}
              ></Typography>
            </Skeleton>
          ) : (
            <Typography
              sx={{
                color: "primary.main",
                fontWeight: "bold",
              }}
            >
              {userData?.firstname?.charAt(0).toUpperCase()}
              {userData?.lastname?.charAt(0).toUpperCase()}
            </Typography>
          )}
        </Box>
        {!mobile ? (
          <AvatarNameText />
        ) : (
          <IconButton
            onClick={() => setModalFlag(true)}
            sx={{ color: "secondary.main" }}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Box>
    );
  }

  return <></>;
};

export default HeaderAvatar;
