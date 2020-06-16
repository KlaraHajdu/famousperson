import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header.jsx";
import { HowToPlayModalOpenProvider } from "./components/contextProviders/HowToPlayModalOpenProvider";
import { GamePhaseProvider } from "./components/contextProviders/GamePhaseProvider";
import { GameProvider } from "./components/contextProviders/GameProvider";
import GamePhases from "./components/GamePhases.jsx";

function App() {
    return (
        <div className="App">
            <GameProvider>
                <GamePhaseProvider>
                    <HowToPlayModalOpenProvider>
                        <Header />
                    </HowToPlayModalOpenProvider>
                    <GamePhases />
                </GamePhaseProvider>
            </GameProvider>
        </div>
    );
}

export default App;
