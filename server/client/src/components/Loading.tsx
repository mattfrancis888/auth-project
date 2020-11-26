import React from "react";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
const Loading = (): JSX.Element => {
    return <ClipLoader color={"white"} loading={true} />;
};
export default Loading;
