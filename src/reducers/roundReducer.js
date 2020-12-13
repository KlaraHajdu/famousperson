const initialState = {
    round: sessionStorage.getItem("round") || 1,
    teamOnTurn: sessionStorage.getItem("teamOnTurn") || "greenTeam",
    greenPlayerIndex: sessionStorage.getItem("greenTeamPlayerIndex") || "0",
    bluePlayerIndex: sessionStorage.getItem("blueTeamPlayerIndex") || "0",
    turnOngoing: sessionStorage.getItem("turnOngoing") || "0",
} 

const roundReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case 'ROUND_ENDED':
            return {
                ...state,
                round: action.payload.nextRound,

            }
        case 'BLUEPLAYER_FINISHED':
            return {
                ...state,
                bluePlayerIndex: action.payload.nextBluePlayerIndex
            }
        
        case 'GREENPLAYER_FINISHED':
            return {
                ...state,
                greenPlayerIndex: action.payload.nextGreenPlayerIndex
            }
        
        case 'TEAM_FINISHED':
            return {
                ...state,
                teamOnTurn: action.payload.nextTeam
            }
        
        case 'TURN_ONGOING':
            return {
                ...state,
                turnOngoing: action.payload.finished
            }
        
        default:
        return state;
        
    }

}

export default roundReducer;