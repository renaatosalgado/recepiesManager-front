import React from "react";
import { Link, Typography } from "@mui/material";

export default function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://www.linkedin.com/in/renato-salgado-dias-b5423b1b0/"
        target="_blank"
      >
        Renato Salgado Dias
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
