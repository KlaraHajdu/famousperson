const initialState = {
    gameId: sessionStorage.getItem("gameId") || null,
    ownName: sessionStorage.getItem("ownName") || null,
    gameMaster: sessionStorage.getItem("gameMaster") || null,
    ownTeam: sessionStorage.getItem("ownTeam") || null,
    players: sessionStorage.getItem("players") && sessionStorage.getItem("players").split(",") || null,
}

const gameReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'GAME_CREATED':
            return {
                gameId: action.payload.gameId,
                ownName: action.payload.ownName,
                gameMaster: action.payload.gameMaster,
                
            }
        
            case 'GAME_JOINED':
                return {
                    ownName: action.payload.ownName,
                    gameId: action.payload.gameId,
                    gameMaster: action.payload.gameMaster,
            }
        
            case 'OWN_TEAM_JOINED':
                return {
                    ...state,
                    ownTeam: action.payload.ownTeam
            }
        
            case 'PLAYERS_UPDATED':
                return {
                    ...state,
                    players: action.payload.players
            }
                        
        default:
            return state;
    }
}

export default gameReducer;