import { Stack, styled, Box } from "@mui/material";

export const HorizontalStack = styled(Stack)(() => ({
  flexDirection: "row",
  alignItems: "center",
}));

export const HorizontalSpacedStack = styled(HorizontalStack)(() => ({
  justifyContent: "space-between",
}));

export const HorizontalCenteredStack = styled(HorizontalStack)(() => ({
  justifyContent: "center",
}));

export const HorizontalEndStack = styled(HorizontalStack)(() => ({
  justifyContent: "flex-end",
}));

export const HorizontalStartStack = styled(HorizontalStack)(() => ({
  justifyContent: "flex-start",
}));

export const BalanceBox = styled(Box)(() => ({
  border: "1px solid",
  borderColor: "#C1FD35",
  borderRadius: "30px",
  padding: "0.5rem",
  width: "80%",
  maxWidth: "300px",
  display: "flex",
  justifyContent: "flex-end",
}));
