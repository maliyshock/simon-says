import React, {Component} from 'react';
import {connect} from 'react-redux';
import { ICONS } from '../constants'
import {TimelineLite, Elastic} from "gsap/TweenMax";
import {hexToRgbA} from '../helpers/helpers'
import {checkChoice, playSequence, giveControl, resetCycles, disableControl, increaseCycles, increaseLevel, addWord} from '../actions/index';

class Ball extends Component {
    constructor(props) {
        super(props);
        // reference to the DOM node
        this.myElement = null;
        // reference to the animation
        this.myTween = null;
    }

    // TODO: doubling with Ball.js . can I reuse it somehow ?
    // TODO: it seem it should be in actions, but there is dependency from props
    // TODO: can I rid this thing of... Every stage starts from only first word. And then it handled by clicks
    // I can not remove it, because it would be a costle. Can I move it to actions? I think I can try
    // but there is a dependency of props. They are not gonna update every cycle. I need to understand that

    // decision: transfer the logic to action. Leave here only props and set interval
    play() {
        let timerId = setInterval( () => {
            // play current iteration
            if( this.props.gameProps.cycle < this.props.gameProps.maxGameCycle ) {
                this.props.playSequence({
                    sequence: this.props.sequence.song,
                    cycle: this.props.gameProps.cycle,
                    maxGameCycle: this.props.gameProps.maxGameCycle
                });
            } else {
                // end of maxIterationalCycle reached
                // add maxIterationalCycle + 1 < maxCycle
                clearInterval(timerId);
                this.props.giveControl();
                this.props.resetCycles();
            }
        }, 1300);
    }

    clickOnButton() {
        const { song } = this.props.sequence;
        this.props.sound.start();

        const word = this.props.name;
        const { cycle, score, maxGameCycle, level } = this.props.gameProps;

        if( this.props.gameProps.cycle === this.props.gameProps.maxGameCycle ) {
            this.props.disableControl();
        }

        this.props.checkChoice(song, word, cycle,  maxGameCycle,  score)
            .then( ()=> {
                if( this.props.gameProps.cycle === this.props.gameProps.maxGameCycle ) {
                    this.props.resetCycles();
                    this.props.increaseCycles(maxGameCycle);
                    this.props.increaseLevel(level);
                    this.props.addWord(song);
                    this.play(this.props);
                }
            });
    }


    componentDidUpdate(prevProps, prevState) {
        if(this.props.active) {
            this.props.sound.start();

            this.myTween = new TimelineLite({paused: true})
                .to(this.myElement, 0, { backgroundColor: hexToRgbA(this.props.color.value, 0.3)})
                .to(this.myElement, 0.2, { backgroundColor: hexToRgbA(this.props.color.value, 1)})
                .to(this.myElement, 0.8, { backgroundColor: hexToRgbA(this.props.color.value, 1)})
                .to(this.myElement, 0.3, { backgroundColor: hexToRgbA(this.props.color.value, 0)})
                .play();
            this.myTween = new TimelineLite({paused: true})
                .to(this.myElement, 1, { ease: Elastic.easeOut.config(2, 0.3), y: '-5%', x: '-5%'})
                .to(this.myElement, 0.3,{backgroundColor: hexToRgbA(this.props.color.value, 0.3), y: '0%', x: '0%' })
                .play();
        }
    }

    render() {
        const isDisabled = !this.props.avaliable;
        let buttonClassNames = `buttons__button buttons__button--color-${this.props.color.name}`;
        let itemClassNames = `buttons__item buttons__item--color-${this.props.color.name}`;

        if(isDisabled) {
            itemClassNames = itemClassNames + ' disabled';
        }


        if(this.props.active) {
            buttonClassNames   = buttonClassNames + ' active';
            itemClassNames = itemClassNames + ' active'
        }

        return(
            <div key={this.props.name} className={itemClassNames} ref={li => this.myElement = li}>
                <button
                    className={buttonClassNames}
                    onClick={ () => this.clickOnButton()  }
                    disabled={isDisabled}
                >
                    <span className="buttons__icon">{ ICONS[this.props.name] }</span>
                </button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {gameProps, sequence} = state;
    return {gameProps, sequence};
}


export default connect(mapStateToProps, {checkChoice, playSequence, giveControl, resetCycles, disableControl, increaseCycles, increaseLevel, addWord} )(Ball);