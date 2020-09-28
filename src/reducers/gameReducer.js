const gameReducer = (state=null, action) => {

    switch (action.type) {
        case 'GAME_CREATED':
            return {
                gameId: action.payload.gameId,
                ownName: action.payload.ownName,
                gameMaster: action.payload.gameMaster,
                players: []
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
                        
        default:
            return state;
    }
}

export default gameReducer;