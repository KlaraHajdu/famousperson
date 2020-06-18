import React, { useContext } from "react";
import { GamePhaseContext } from "./contextProviders/GamePhaseProvider";

function GamePhases() {
    const gamePhase = useContext(GamePhaseContext)[0];

    return gamePhase && <div>{gamePhase.component}</div>;
}

export default GamePhases;
