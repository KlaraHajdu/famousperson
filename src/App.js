import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { createGlobalStyle } from "styled-components";
import Header from "./components/Header.jsx";
import { HowToPlayModalOpenProvider } from "./components/contextProviders/HowToPlayModalOpenProvider";
import { GamePhaseProvider } from "./components/contextProviders/GamePhaseProvider";
import { GameProvider } from "./components/contextProviders/GameProvider";
import GamePhases from "./components/GamePhases.jsx";

const GlobalStyle = createGlobalStyle`
    .container {
        float: left;
        position: relative;
        left: 50%;
        width: 600px;}
    .container.fixer{
        float: left;
        position: relative;
        left: -50%;
        background-color: rgba(255, 255, 255, 0.9);
        padding: 2em;
        margin: 3em 3em 3em 0em;
        border-radius: 10px;
    }
`;

function App() {
    return (
        <div className="App">
            <GameProvider>
                <GamePhaseProvider>
                    <HowToPlayModalOpenProvider>
                        <Header />
                    </HowToPlayModalOpenProvider>
                    <GamePhases />
                    <GlobalStyle />
                </GamePhaseProvider>
            </GameProvider>
        </div>
    );
}

export default App;
