import React, {Component} from 'react';
import {connect} from 'react-redux';
import { ICONS } from '../constants'
import {TimelineLite, Elastic} from "gsap/TweenMax";
import {checkChoice, playSequence, giveControl, resetCycles, disableControl, increaseCycles, increaseLevel, addWord} from '../actions/index';



class Ball extends Component {
    constructor(props) {
        super(props);
        // reference to the DOM node
        this.myElement = null;
        // reference to the animation
        this.myTween = null;
    }

    // TODO: doubling with app.js . can I reuse it somehow ?
    play() {
        this.props.disableControl();

        let timerId = setInterval( () => {
            if( this.props.gameProps.cycle < this.props.gameProps.maxGameCycle ) {
                this.props.playSequence({
                    sequence: this.props.sequence.song,
                    cycle: this.props.gameProps.cycle,
                    maxGameCycle: this.props.gameProps.maxGameCycle
                });
            } else {
                clearInterval(timerId);
                this.props.giveControl();
                this.props.resetCycles();
            }
        }, 1300);
    }

    clickOnButton() {
        const { sequence } = this.props;
        const word = this.props.name;
        const { cycle, score, maxGameCycle, level } = this.props.gameProps;

        if( this.props.gameProps.cycle === this.props.gameProps.maxGameCycle ) {
            this.props.disableControl();
        }

        this.props.checkChoice(sequence, word, cycle,  maxGameCycle,  score)
            .then( ()=> {
                if( this.props.gameProps.cycle === this.props.gameProps.maxGameCycle ) {
                    this.props.resetCycles();
                    this.props.increaseCycles(maxGameCycle);
                    this.props.increaseLevel(level);
                    this.props.addWord(sequence);
                    this.play();
                }
            });
    }

    hexToRgbA(hex, alpha){
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


    componentDidUpdate(prevProps, prevState) {
        if(this.props.active) {
            this.myTween = new TimelineLite({paused: true})
                .to(this.myElement, 0, { backgroundColor: this.hexToRgbA(this.props.color.value, 0.3)})
                .to(this.myElement, 0.2, { backgroundColor: this.hexToRgbA(this.props.color.value, 1)})
                .to(this.myElement, 0.8, { backgroundColor: this.hexToRgbA(this.props.color.value, 1)})
                .to(this.myElement, 0.3, { backgroundColor: this.hexToRgbA(this.props.color.value, 0)})
                .play();
            this.myTween = new TimelineLite({paused: true})
                .to(this.myElement, 1, { ease: Elastic.easeOut.config(2, 0.3), y: '-5%', x: '-5%'})
                .to(this.myElement, 0.3,{backgroundColor: this.hexToRgbA(this.props.color.value, 0.3), y: '0%', x: '0%' })
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