const initialState = {
    round: 1,
    teamOnTurn: "greenTeam",
    greenPlayerIndex: "0",
    bluePlayerIndex: "0"
} 

const roundReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case 'ROUND_ENDED':
            return {
                ...state,
                round: state.round + 1,

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
        
        default:
        return state;
        
    }

}

export default roundReducer;