export const endRound = (nextRound) => {
    return {
        type: 'ROUND_ENDED',
        payload: {
            nextRound
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

export const finishTurn = (finished) => {
    return {
        type: 'TURN_ONGOING',
        payload: {
            finished
        }
    };
};