import React, { useContext } from "react";
import { GamePhaseContext } from "./contextProviders/GamePhaseProvider";
import PlayGame from "./PlayGame.jsx";

function GamePhases() {
    const gamePhase = useContext(GamePhaseContext)[0];

    return  (<PlayGame />);
    // gamePhase && <div>{gamePhase.component}</div>;
   
}

export default GamePhases;
