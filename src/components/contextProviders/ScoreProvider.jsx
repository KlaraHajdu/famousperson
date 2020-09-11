import React, { useState } from "react";

export const ScoreContext = React.createContext();

export const ScoreProvider = (props) => {
    const [score, setScore] = useState(null);

    return <ScoreContext.Provider value={[score, setScore]}>{props.children}</ScoreContext.Provider>;
};