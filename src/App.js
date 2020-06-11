import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/header.jsx";
import { HowToPlayModalOpenProvider } from "./components/contextProviders/HowToPlayModalOpenProvider";

function App() {
    return (
        <HowToPlayModalOpenProvider>
            <div className="App">
                <Header />
            </div>
        </HowToPlayModalOpenProvider>
    );
}

export default App;
