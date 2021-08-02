import { Typography } from "@material-ui/core";
import React from "react";

const Price = (props) => {
  const rand = Math.floor(Math.random() * 1000) + 1;

  return (
    <Typography style={{ color: rand < 50 ? "red" : "green" }}>
      $ {rand}
    </Typography>
  );
};

export default Price;
