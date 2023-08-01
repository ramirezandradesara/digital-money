import { Avatar, styled } from "@mui/material";

export const UserAvatar = styled(Avatar)(() => ({
  backgroundColor: "#C1FD35",
  color: "#C1FD35",
  fontWeight: "600",
}));

export const TransactionAvatar = styled(UserAvatar)(() => ({
  width: 30,
  height: 30,
}));
