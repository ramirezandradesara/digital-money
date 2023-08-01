import { Box } from "@mui/material";
import React, { ReactNode } from "react";

interface SectionWrapperProps {
  bgcolor?: string;
  color?: string;
  children: ReactNode;
}

const SectionWrapper = ({
  bgcolor = "#201F22",
  color = "#fff",
  children,
}: SectionWrapperProps) => {
  return (
    <Box
      width={"100%"}
      color={color}
      bgcolor={bgcolor}
      padding={"30px"}
      mb={"20px"}
      border={`1px solid ${color}`}
      borderRadius={"5px"}
      boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
    >
      {children}
    </Box>
  );
};

export default SectionWrapper;
