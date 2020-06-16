import React, { useState } from "react";

export const GameContext = React.createContext();

export const GameProvider = (props) => {
    const [game, setGame] = useState(null);

    return <GameContext.Provider value={[game, setGame]}>{props.children}</GameContext.Provider>;
};
