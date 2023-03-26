import React, { FC } from "react";
import ButtonMUI, { ButtonProps as ButtonPropsMUI } from "@mui/material/Button";

interface ButtonProps extends ButtonPropsMUI {
  text: string;
}
export const Button: FC<ButtonProps> = (props) => {
  const { text, sx, ...rest } = props;
  return (
    <ButtonMUI
      sx={{ ...sx, ...{ borderRadius: 50, minWidth: 100, minHeight: 100 } }}
      {...rest}
    >
      {text}
    </ButtonMUI>
  );
};
