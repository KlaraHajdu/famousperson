import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header.jsx";
import { HowToPlayModalOpenProvider } from "./components/contextProviders/HowToPlayModalOpenProvider";
import StartGame from "./components/gameMasterComponents/StartGame.jsx";

function App() {
    return (
        <HowToPlayModalOpenProvider>
            <div className="App">
                <Header />
                <StartGame />
            </div>
        </HowToPlayModalOpenProvider>
    );
}

export default App;
