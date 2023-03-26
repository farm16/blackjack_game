import React, { FC } from "react";
import Typography, { TypographyProps } from "@mui/material/Typography";

interface TextProps extends TypographyProps {
  text: string;
}
export const Text: FC<TextProps> = (props) => {
  const { text, ...rest } = props;
  return <Typography {...rest}>{text}</Typography>;
};
