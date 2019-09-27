import React, {Component} from 'react';
import {connect} from 'react-redux';
import PublishSubscribe from 'publish-subscribe-js'

import { ICONS } from '../constants'
import {TimelineLite, Elastic} from "gsap/TweenMax";
import {hexToRgbA, playSong} from '../helpers/helpers'
import {highlightButton, giveControl, resetCycles, disableControl, increaseLevel, addWord, checkChoice} from '../actions/index';

class Ball extends Component {
    constructor(props) {
        super(props);
        // reference to the DOM node
        this.myElement = null;
        // reference to the animation
        this.myTween = null;

        this.keyHandler = this.keyHandler.bind(this);
        this.buttonHandler = this.buttonHandler.bind(this);
    }

    keyHandler(data, args) {
        if(this.props.avaliable) {
            if(args[1] === this.props.obj.keycode) {
                this.buttonHandler();
            }
        }
    }

    buttonHandler() {
        const { song } = this.props.sequence;
        // this.props.goSound.start();

        const word = this.props.name;
        const { cycle, score, maxGameCycle, level } = this.props.gameProps;

        if( this.props.gameProps.cycle === this.props.gameProps.maxGameCycle ) {
            this.props.disableControl();
        }

        this.highlight();
        this.props.sound.start();

        this.props.checkChoice(song, word, cycle,  maxGameCycle,  score)
            .then( ()=> {
                if( this.props.gameProps.cycle === song.length ) {
                    this.props.resetCycles();
                    this.props.increaseLevel(level);
                    this.props.addWord(song);
                    playSong(this.props);
                }
            });
    }

    componentDidMount() {
        PublishSubscribe.subscribe('keyboard_is_listened', this.keyHandler);
    }

    highlight() {
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


    componentDidUpdate(prevProps, prevState) {
        if(this.props.active) {
            this.props.sound.start();
            this.highlight();
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
                    disabled={isDisabled}
                    onClick={this.buttonHandler}
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


export default connect(mapStateToProps, {highlightButton, giveControl, resetCycles, disableControl, increaseLevel, addWord, checkChoice} )(Ball);