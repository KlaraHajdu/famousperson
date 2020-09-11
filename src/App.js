import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header.jsx";
import { HowToPlayModalOpenProvider } from "./components/contextProviders/HowToPlayModalOpenProvider";
import { GamePhaseProvider } from "./components/contextProviders/GamePhaseProvider";
import { GameProvider } from "./components/contextProviders/GameProvider";
import GamePhases from "./components/GamePhases.jsx";
import { GlobalStyle } from "./static/myStyle";
import { GreenTeamPlayerProvider } from "./components/contextProviders/GreenTeamPlayerProvider";
import { BlueTeamPlayerProvider } from "./components/contextProviders/BlueTeamPlayerProvider";
import { RoundProvider } from "./components/contextProviders/RoundProvider";
import { ScoreProvider } from "./components/contextProviders/ScoreProvider.jsx";

function App() {
    return (
        <div className="App">
            <GameProvider>
                <GamePhaseProvider>
                    <RoundProvider>
                        <ScoreProvider>
                            <GreenTeamPlayerProvider>
                                <BlueTeamPlayerProvider>
                                    <HowToPlayModalOpenProvider>
                                        <Header />
                                    </HowToPlayModalOpenProvider>
                                    <GamePhases />
                                    <GlobalStyle />
                                </BlueTeamPlayerProvider>
                            </GreenTeamPlayerProvider>
                        </ScoreProvider>
                    </RoundProvider>
                </GamePhaseProvider>
            </GameProvider>
        </div>
    );
}

export default App;
