import React, {Component} from 'react';
import {connect} from 'react-redux';
import {checkChoice, playSequence, giveControl, resetCycles, disableControl, increaseCycles, addWord} from '../actions/index';


class Ball extends Component {


    // TODO: doubling with app.js . can I reuse it somehow ?
    play() {
        this.props.disableControl();

        let timerId = setInterval( () => {
            if( this.props.gameProps.cycle < this.props.gameProps.maxGameCycle ) {
                this.props.playSequence({
                    sequence: this.props.sequence,
                    cycle: this.props.gameProps.cycle,
                    maxGameCycle: this.props.gameProps.maxGameCycle
                });
            } else {
                clearInterval(timerId);
                this.props.giveControl();
                this.props.resetCycles();
            }
        }, 1000);
    }

    clickOnButton() {
        const { sequence } = this.props;
        const word = this.props.name;
        const { cycle, score, maxGameCycle } = this.props.gameProps;

        if( this.props.gameProps.cycle === this.props.gameProps.maxGameCycle ) {
            this.props.disableControl();
        }

        this.props.checkChoice(sequence, word, cycle,  maxGameCycle,  score)
            .then( ()=> {
                if( this.props.gameProps.cycle === this.props.gameProps.maxGameCycle ) {
                    this.props.resetCycles();
                    this.props.increaseCycles(maxGameCycle);
                    this.props.addWord(sequence);
                    this.play();
                }
            });
    }

    render() {
        const style = (this.props.active) ? {'backgroundColor': this.props.color} : {'backgroundColor': 'white'};
        const isDisabled = !this.props.avaliable;
        return(
            <li>
                <button
                    onClick={ () => this.clickOnButton()  }
                    style={style}
                    disabled={isDisabled}
                >
                    { this.props.name }
                </button>
            </li>
        )
    }
}

function mapStateToProps(state) {
    const {gameProps, sequence} = state;
    return {gameProps, sequence};
}


export default connect(mapStateToProps, {checkChoice, playSequence, giveControl, resetCycles, disableControl, increaseCycles, addWord} )(Ball);