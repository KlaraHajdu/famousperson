import React, { useState } from "react";

export const GameContext = React.createContext();

export const GameProvider = (props) => {
    const getFromStorage = () => {
        let gameFromStorage = {};
        gameFromStorage["gameId"] = sessionStorage.getItem("gameId");
        gameFromStorage["gameMaster"] = sessionStorage.getItem("gameMaster");
        gameFromStorage["ownName"] = sessionStorage.getItem("ownName");
        gameFromStorage["ownTeam"] = sessionStorage.getItem("ownTeam");
        gameFromStorage["gamePhase"] = sessionStorage.getItem("gamePhase");
        gameFromStorage["players"] = [sessionStorage.getItem("players")];
        if (sessionStorage.getItem("greenTeam")) gameFromStorage["teams"] = { "greenTeam": sessionStorage.getItem("greenTeam").split(','), "blueTeam": sessionStorage.getItem("blueTeam").split(',') };
        return gameFromStorage;
    }
    const [game, setGame] = useState(getFromStorage ||null);

    return <GameContext.Provider value={[game, setGame]}>{props.children}</GameContext.Provider>;
};
