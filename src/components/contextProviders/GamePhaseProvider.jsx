import React, { useState } from "react";
import { gamePhases } from "../../gamePhasesObject";

export const GamePhaseContext = React.createContext();

export const GamePhaseProvider = (props) => {
   
    const parseFromSessionStorage = () => {
        let gamePhaseFromSS = sessionStorage.getItem("gamePhase");
        
            switch (gamePhaseFromSS) {
                case "waitingRoom":
                    return gamePhases.waitingRoom;
                case "addNames":
                    return gamePhases.addNames;
                case "playGame":
                    return gamePhases.playGame;
                default:
                    return null;
            }
        
    };

    const [GamePhase, setGamePhase] = useState(parseFromSessionStorage() || null);

    return <GamePhaseContext.Provider value={[GamePhase, setGamePhase]}>{props.children}</GamePhaseContext.Provider>;
};
