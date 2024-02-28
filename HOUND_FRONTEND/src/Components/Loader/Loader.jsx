/* eslint-disable react/prop-types */
import React from "react";
import { Box } from "@mui/material";
// import LoaderIcon from "../../../assets/svg/LoaderIcon";
import LoaderIcon from "../Svg/LoaderIcon";
import styles from "./Loader.styles";

function Loader() {
  return (
    <Box style={styles.loader}>
      <LoaderIcon  style={styles.icon} />
    </Box>
  );
}

export default Loader;
