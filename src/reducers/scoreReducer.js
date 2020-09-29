const inititalState = {
    blueTeamScore: sessionStorage.getItem("blueTeamScore") || "0",
    greenTeamScore: sessionStorage.getItem("greenTeamScore") || "0"
}

const scoreReducer = (state = inititalState, action) => {
    
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