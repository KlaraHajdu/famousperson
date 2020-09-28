export const endRound = (round) => {
    return {
        type: 'ROUND_ENDED',
        payload: {
            round
        }
        
    };
};


export const finishBluePlayer = (nextBluePlayerIndex) => {
    return {
        type: 'BLUEPLAYER_FINISHED',
        payload: {
            nextBluePlayerIndex
        }
    };
};


export const finishGreenPlayer = (nextGreenPlayerIndex) => {
    return {
        type: 'GREENPLAYER_FINISHED',
        payload: {
            nextGreenPlayerIndex
        }
    };
};

export const finishTeam = (nextTeam) => {
    return {
        type: 'TEAM_FINISHED',
        payload: {
            nextTeam
        }
    };
};