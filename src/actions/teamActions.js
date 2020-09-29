export const setGreenTeam = (greenTeam) => {
    return {
        type: 'GREEN_TEAM_SET',
        payload: {
            greenTeam
        }
        
    };
};

export const setBlueTeam = (blueTeam) => {
    return {
        type: 'BLUE_TEAM_SET',
        payload: {
            blueTeam
        }
        
    };
};