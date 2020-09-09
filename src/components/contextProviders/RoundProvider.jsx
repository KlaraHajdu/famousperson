import React, { useState } from "react";

export const RoundContext = React.createContext();

export const RoundProvider = props => {
    const [round, setRound] = useState(3);

    return (
        <RoundContext.Provider value={[round, setRound]}>{props.children}</RoundContext.Provider>
    );
};