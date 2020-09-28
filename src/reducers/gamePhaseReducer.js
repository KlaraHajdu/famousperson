import { gamePhases } from '../gamePhasesObject';

const gamePhase = (state = null, action) => {
    
    switch (action.type) {
        case 'START_GAME_ENTERED':
            return {gamePhase: gamePhases.startGame.component}
        case 'JOIN_GAME_ENTERED':
            return {
                
            }
        
        case 'WAITING_ROOM_ENTERED':
            return {
                
            }
        
        case 'PLAYGAME_ENTERED':
            return {
                
        }
            
            
        default:
            return state;
    }


}