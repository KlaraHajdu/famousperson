import React, { useState } from "react";

export const GamePhaseContext = React.createContext();

export const GamePhaseProvider = props => {
    const [GamePhase, setGamePhase] = useState(null);

    return (
        <GamePhaseContext.Provider value={[GamePhase, setGamePhase]}>{props.children}</GamePhaseContext.Provider>
    );
};