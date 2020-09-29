import React, { useState } from "react";

export const GreenTeamPlayerIndexContext = React.createContext();

export const GreenTeamPlayerProvider = (props) => {
    const [greenTeamPlayerIndex, setGreenTeamPlayerIndex] = useState(sessionStorage.getItem("greenTeamPlayerIndex") ||null);

    return (
        <GreenTeamPlayerIndexContext.Provider value={[greenTeamPlayerIndex, setGreenTeamPlayerIndex]}>
            {props.children}
        </GreenTeamPlayerIndexContext.Provider>
    );
};
