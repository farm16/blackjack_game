import React, { PropsWithChildren } from "react";
import ContainerMUI from "@mui/material/Container";
import Box from "@mui/material/Box";

interface ContainerProps {}

export const Container = (props: PropsWithChildren<ContainerProps>) => {
  const { children } = props;
  return (
    <ContainerMUI maxWidth="sm">
      <Box
        display="flex"
        sx={{ my: 4, bgcolor: "red" }}
        justifyContent="center"
        alignItems="center"
      >
        {children}
      </Box>
    </ContainerMUI>
  );
};
