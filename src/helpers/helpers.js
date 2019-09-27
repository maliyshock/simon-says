import {START_CYCLE, ALFA, OMEGA, BETHA, THETHA} from '../constants'


function playSong(props) {
    return new Promise( (resolve, reject) => {
        let i = 0;
        let timerId = setInterval( () => {
            // play current iteration

            if( i < props.sequence.song.length ) {
                props.highlightButton({
                    sequence: props.sequence.song,
                    cycle: i,
                });
            } else {
                clearInterval(timerId);
                props.giveControl();
                props.resetCycles();
                resolve();
            }
            i++;
        }, 1300);
    })
}

function hexToRgbA(hex, alpha){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length === 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+alpha+')';
    }
    throw new Error('Bad Hex');
}


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

function generateSequence(currentSequqnce) {
    let sequence = [];

    for ( let step = 0; step < START_CYCLE; step++) {
        addWord(sequence)
    }

    return sequence;
}

export {playSong, hexToRgbA, generateSequence, addWord}