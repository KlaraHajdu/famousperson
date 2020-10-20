import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { HowToPlayModalOpenProvider } from "./components/contextProviders/HowToPlayModalOpenProvider";
import { GamePhaseProvider } from "./components/contextProviders/GamePhaseProvider";
import GamePhases from "./components/GamePhases.jsx";
import { GlobalStyle } from "./static/myStyle";

function App() {
    return (
        <div className="App">
            <GamePhaseProvider>
                <HowToPlayModalOpenProvider>
                    <Header />
                </HowToPlayModalOpenProvider>
                <GamePhases />
                <Footer />
                <GlobalStyle />
            </GamePhaseProvider>
        </div>
    );
}

export default App;
