import React from "react";
import { Box } from "@mui/system";

const styles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: "55px",
  paddingBottom: "55px",
};

export default function Form({ children, onSubmit }) {
  return (
    <Box sx={styles} component="form" onSubmit={onSubmit}>
      {children}
    </Box>
  );
}
