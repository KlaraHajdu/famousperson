import React, { useState } from "react";

export const BlueTeamPlayerIndexContext = React.createContext();

export const BlueTeamPlayerProvider = (props) => {
    const [blueTeamPlayerIndex, setBlueTeamPlayerIndex] = useState(null);

    return (
        <BlueTeamPlayerIndexContext.Provider value={[blueTeamPlayerIndex, setBlueTeamPlayerIndex]}>
            {props.children}
        </BlueTeamPlayerIndexContext.Provider>
    );
};
