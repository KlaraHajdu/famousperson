const scoreReducer = (state = {blueTeamScore: "0", greenTeamScore: "0"}, action) => {
    
    switch (action.type) {
        case 'GREEN_TEAM_SCORED':
            return {
                ...state,
                greenTeamScore: action.payload.greenTeamScore,

            }
        case 'BLUE_TEAM_SCORED':
            return {
                ...state,
                blueTeamScore: action.payload.blueTeamScore,
            }
        
        default:
            return state;
        
    }
}

export default scoreReducer;