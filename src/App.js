import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header.jsx";
import { HowToPlayModalOpenProvider } from "./components/contextProviders/HowToPlayModalOpenProvider";
import { GamePhaseProvider } from "./components/contextProviders/GamePhaseProvider";
import GamePhases from "./components/GamePhases.jsx";
import { dbRefobject } from "./database.js";

function App() {
    console.log(dbRefobject);

    return (
        <div className="App">
            <GamePhaseProvider>
                <HowToPlayModalOpenProvider>
                    <Header />
                </HowToPlayModalOpenProvider>
                <GamePhases />
            </GamePhaseProvider>
        </div>
    );
}

export default App;
