const initialState = {
    greenTeam: sessionStorage.getItem("greenTeam") && sessionStorage.getItem("greenTeam").split(","),
    blueTeam: sessionStorage.getItem("blueTeam") && sessionStorage.getItem("blueTeam").split(","),
}

const teamReducer = (state = initialState, action) => {
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
