import { CREATE_SEQUENCE, HIGHLIGHT_BUTTON, GIVE_CONTROL, SUCCESS_CHOICE, GAME_OVER, RESET_CYCLES, DISABLE_CONTROL, ADD_WORD, INCREASE_LEVEL, START_SING, START_CYCLE, ASSETS_LOADED, ASSETS_LOADING, START_NEW_GAME } from '../constants'

export function createSequence() {
    return async dispatch => {
        return new Promise( (resolve, reject) => {
            dispatch({
                type: CREATE_SEQUENCE
            });

            resolve();
        })
    };
}

export function highlightButton(data) {
    const { sequence, cycle} = data;
    const nextCycle = (cycle < START_CYCLE) ? cycle + 1 : cycle;

    const activeButton = sequence[cycle];

    return {
        type: HIGHLIGHT_BUTTON,
        payload: { activeButton, nextCycle }
    }
}

export function giveControl() {
    return {
        type: GIVE_CONTROL
    }
}
export function startSing() {
    return {
        type: START_SING
    }
}

export function disableControl() {
    return {
        type: DISABLE_CONTROL
    }
}

export function assetsLoaded() {
    return {
        type: ASSETS_LOADED
    }
}

export function updateAssetsLoading (percent) {
    return {
        type: ASSETS_LOADING,
        payload: {percent}
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
    if (isChoiceCorrect(sequence, cycle, word) ) {
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

export function startNewGame() {
    return {
        type: START_NEW_GAME,
    }
}
