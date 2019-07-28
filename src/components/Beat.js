import React, {Component} from 'react';
import Tone from 'tone';
import beat from '../samples/beat.mp3';

class Beat extends Component {

    constructor(props) {
        super(props);

        this.state = {
            play: true
        };

        var player = new Tone.Player({
            "url" : beat,
            "onload": () => {
                var loop = new Tone.Loop( (time) => {
                    //triggered every eighth note.
                    player.start();

                }, 3.433).start(0);
                Tone.Transport.start();
            }
        }).toMaster();
    }


    render() {
        return (
            <div></div>
        );
    }
}

export default Beat;