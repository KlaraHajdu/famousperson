export const increaseGreenScore = (greenTeamScore) => {
    return {
        type: 'GREEN_TEAM_SCORED',
        payload: {
            greenTeamScore
        }
        
    };
};

export const increaseBlueScore = (blueTeamScore) => {
    return {
        type: 'BLUE_TEAM_SCORED',
        payload: {
            blueTeamScore
        }
        
    };
};