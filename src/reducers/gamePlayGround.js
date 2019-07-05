import {CREATE_SEQUENCE, ALFA, OMEGA, BETHA, THETHA, MAX_CYCLE, ADD_WORD } from '../constants'

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function addWord(sequence) {
    let randomValue = Math.round( getRandomArbitrary(1,4) );
    switch(randomValue) {
        case 1:  {
            sequence.push(ALFA);
            break;
        }
        case 2:  {
            sequence.push(OMEGA);
            break;
        }
        case 3:  {
            sequence.push(BETHA);
            break;
        }
        case 4:  {
            sequence.push(THETHA);
            break;
        }

        default:
            break;
    }

    return sequence;
}

function generateSequence(maxCycle) {
    let sequence = [];

    for ( let step = 0; step < maxCycle; step++) {
        addWord(sequence)
    }

    return sequence;
}

export function sequence(state = [], action) {
    switch(action.type){
        case CREATE_SEQUENCE:
            return  generateSequence(MAX_CYCLE);

        case ADD_WORD:
            const sequence = action.payload;

            return addWord(sequence);
        default:
            return state;
    }
}
