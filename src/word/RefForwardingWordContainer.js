import React, { forwardRef } from "react";
import WordContainer from "./WordContainer";

const RefForwardingWordContainer = forwardRef((props, ref) => (
    <WordContainer {...props} forwardedRef={ref} />
));

export default RefForwardingWordContainer;
