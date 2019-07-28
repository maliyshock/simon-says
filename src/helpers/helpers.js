
function play(props) {
    props.disableControl();
    props.gameProps.goSound.reverse = true;
    props.gameProps.goSound.start();

    let timerId = setInterval( () => {
        if( props.gameProps.cycle < props.gameProps.maxGameCycle ) {
            props.playSequence({
                sequence: props.sequence.song,
                cycle: props.gameProps.cycle,
                maxGameCycle: props.gameProps.maxGameCycle
            });
        } else {
            clearInterval(timerId);
            props.giveControl();
            props.gameProps.goSound.start();
            props.resetCycles();
        }
    }, 1300);
}

function hexToRgbA(hex, alpha){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+alpha+')';
    }
    throw new Error('Bad Hex');
}

export {play, hexToRgbA}