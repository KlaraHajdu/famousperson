const teamReducer = (state = null, action) => {
    switch (action.type) {
        case "GREEN_TEAM_SET":
            return {
                ...state,
                greenTeam: action.payload.greenTeam,
            };
        case "BLUE_TEAM_SET":
            return {
                ...state,
                blueTeam: action.payload.blueTeam,
            };
        default:
            return state;
    }
};

export default teamReducer;
