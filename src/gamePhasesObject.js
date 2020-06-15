import React from 'react';
import StartGame from "./components/gameMasterComponents/StartGame";
import JoinGame from "./components/JoinGame";
import WaitingRoom from "./components/WaitingRoom";

export const gamePhases = {
    startGame: {
        component: <StartGame />,
    },
    joinGame: {
        component: <JoinGame />,
    },
    waitingRoom: {
        component: <WaitingRoom/>,
    }
};
