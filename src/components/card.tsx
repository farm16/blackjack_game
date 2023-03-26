import React, { FC } from "react";

interface CardProps {
  imgUrl: string;
  imgName: string;
  size?: "small" | "large";
}
export const Card: FC<CardProps> = (props) => {
  const { imgUrl, imgName, size = "large" } = props;
  return (
    <img
      width={size === "large" ? 100 : 75}
      height={size === "large" ? 150 : 100}
      src={imgUrl}
      alt={imgName}
      loading="lazy"
    />
  );
};
