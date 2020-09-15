import React from "react";
import StartGame from "./components/gameMasterComponents/StartGame";
import JoinGame from "./components/JoinGame";
import WaitingRoom from "./components/WaitingRoom";
import AddNames from "./components/AddNames";
import PlayGame from "./components/PlayGame";
import EndGame from "./components/EndGame";

export const gamePhases = {
    startGame: {
        component: <StartGame />,
    },
    joinGame: {
        component: <JoinGame />,
    },
    waitingRoom: {
        component: <WaitingRoom />,
    },
    addNames: {
        component: <AddNames />,
    },
    playGame: {
        component: <PlayGame />,
    },
    endGame: {
        component: <EndGame />,
    },
};
