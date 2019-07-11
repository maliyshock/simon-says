import { CREATE_SEQUENCE, PLAY_SEQUENCE, GIVE_CONTROL, SUCCESS_CHOICE, GAME_OVER, RESET_CYCLES, DISABLE_CONTROL, INCREASE_CYCLES, ADD_WORD, INCREASE_LEVEL } from '../constants'

export function createSequence() {
    return async dispatch => {
        return new Promise( (resolve, reject) => {
            dispatch({
                type: CREATE_SEQUENCE
            });

            resolve()
        })
    };
}

export function playSequence(data) {
    const { sequence, cycle,  maxGameCycle} = data;
    const nextCycle = (cycle < maxGameCycle) ? cycle + 1 : cycle;

    const activeButton = sequence[cycle];

    return {
        type: PLAY_SEQUENCE,
        payload: { activeButton, nextCycle }
    }
}

export function giveControl() {
    return {
        type: GIVE_CONTROL
    }
}

export function disableControl() {
    return {
        type: DISABLE_CONTROL
    }
}

export function resetCycles() {
    return {
        type: RESET_CYCLES
    }
}

export function addWord(sequence) {
    return {
        type: ADD_WORD,
        payload: sequence
    }
}

export function increaseCycles(maxGameCycle) {
    return {
        type: INCREASE_CYCLES,
        payload: maxGameCycle
    }
}

export function increaseLevel(level) {
    return {
        type: INCREASE_LEVEL,
        payload: level
    }
}


function isChoiceCorrect(sequence, cycle, word) {
    return sequence[cycle] === word;
}

export function checkChoice(sequence, word, cycle,  maxGameCycle, score) {
    // console.log(isChoiceCorrect(sequence, cycle, word), 'isChoiceCorrect(sequence, cycle, word)');
    // console.log((nextMaxIterationalCycle < maxGameCycle), 'inextMaxIterationalCycle < maxGameCycle');
    // console.log(isChoiceCorrect(sequence, cycle, word) && (nextMaxIterationalCycle < maxGameCycle));

    if (isChoiceCorrect(sequence, cycle, word) && cycle < maxGameCycle) {
        return async dispatch => {
            return new Promise( (resolve, reject) => {
                dispatch({
                    type: SUCCESS_CHOICE,
                    payload: { score: ++score, cycle: ++cycle}
                });

                resolve()
            })
        };

    }
    else {
        return async dispatch => {
            return new Promise( (resolve, reject) => {
                dispatch({
                    type: GAME_OVER,
                    payload: { gameOver: true }
                });

                resolve()
            })
        };
    }

}

