import React, { useState } from "react";
import { Button } from "react-bootstrap";
import DeletePlayer from "./DeletePlayer";

export default function PlayGameMasterPart() {

    const [wantToDelete, setWantToDelete] = useState(false);

    const pushDeleteButton = () => {
        setWantToDelete(true);
    };

    const handleClosing = () => {
        setWantToDelete(false);
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
