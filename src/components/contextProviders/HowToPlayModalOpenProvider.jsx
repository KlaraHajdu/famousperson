import React, { useState } from "react";

export const HowToPlayModalOpenContext = React.createContext();

export const HowToPlayModalOpenProvider = props => {
    const [HowToPlayModalOpen, setHowToPlayModalOpen] = useState();

    return (
        <HowToPlayModalOpenContext.Provider value={[HowToPlayModalOpen, setHowToPlayModalOpen]}>{props.children}</HowToPlayModalOpenContext.Provider>
    );
};