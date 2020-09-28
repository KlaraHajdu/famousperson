import React, { useState, useContext } from "react";
import { Button } from "react-bootstrap";
import DeletePlayer from "./DeletePlayer";
import { GameContext } from "../contextProviders/GameProvider";

export default function PlayGameMasterPart() {
    const game = useContext(GameContext)[0];

    const [wantToDelete, setWantToDelete] = useState(false);

    const pushDeleteButton = () => {
        setWantToDelete(true);
    };

    const handleClosing = () => {
        setWantToDelete(false);
        console.log(game);
    };

    return (
        <div>
            {wantToDelete ? (
                <DeletePlayer handleClosing={handleClosing} />
            ) : (
                <Button onClick={pushDeleteButton} variant="outline-secondary">
                    Delete a player
                </Button>
            )}
        </div>
    );
}
