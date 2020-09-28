export const startGame = (name, gameId) => {
    return {
        type: 'GAME_CREATED',
        payload: {
            ownName: name,
            gameMaster: name,
            gameId
        }
    };
};

export const joinGame = (name, gameId, gameMaster) => {
    return {
        type: 'GAME_JOINED',
        payload: {
            ownName: name,
            gameMaster: gameMaster,
            gameId
        }
    };
};

export const joinOwnTeam = (ownTeam) => {
    return {
        type: 'OWN_TEAM_JOINED',
        payload: {
            ownTeam
        }
    };
};

