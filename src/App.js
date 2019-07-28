import React, {Component} from 'react';

import {connect} from 'react-redux'
import {createSequence, playSequence, giveControl, resetCycles, disableControl, startGame, startSing} from './actions/index';
import Ball from './components/Ball'
import Beat from './components/Beat'
import {play} from './helpers/helpers'
import { ICONS } from './constants'

class App extends Component {
    constructor() {
        super();
        this.buttonHandler = this.buttonHandler.bind(this);
    }

    buttonHandler() {
        this.props.startGame();
        this.props.createSequence()
            .then( () => {
                this.play();
            });
    }

    componentDidUpdate() {
        // if(this.props.gameProps.sing === false) {
            // this.props.createSequence()
            //     .then( () => {
            //         play(this.props);
            //     });
        // }
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

    startScreen() {
        let active = (this.props.gameProps.startGame === true) ? ' active ' : '';
        return (
            <div className={`start-screen ${active}`}>
                <h1 className='start-screen__title h2'>This is an audio game</h1>
                <h2 className='start-screen__title h3'>Use Headphnes for better experience</h2>

                <div className='start-screen__button-container'>
                    <button onClick={() => this.buttonHandler(this.props)} className='button'>Start game</button>
                </div>
            </div>
        )
    }

    endScreen(score) {
        return (
            <div className='end-screen'>
                <h1 className='end-screen__title h2'>Game Over!</h1>
                <div className='end-screen__title h3'>Saymon said {score} words</div>

                <div className='end-screen__button-container'>
                    <button className='button'>Start New game</button>
                </div>
            </div>
        )
    }

    playGround() {
        const {words, score, level} = this.props.gameProps;
        const dictionary = words.dictionary;

        let lineClassNames = 'buttons__line';
        let levelContainer = 'buttons__level-container';

        if(this.props.gameProps.buttonAvaliable) {
            this.props.gameProps.goSound.reverse = true;
            this.props.gameProps.goSound.start();

            lineClassNames = lineClassNames + ' active';
            levelContainer = levelContainer + ' active';
        }

        return (
            <div className="play-ground">
                <div className='buttons'>
                    <div className='buttons__list'>
                        <div className={`${lineClassNames} butons__line--position-vertical`}></div>
                        <div className={`${lineClassNames} butons__line--position-horizontal`}></div>
                        <div className={levelContainer}>
                            <h2 className='buttons__go h2'>GO!</h2>
                            <h2 className="buttons__score h2">{score}</h2>
                            <div className="buttons__level-text">Level: {level}</div>
                        </div>
                        {
                            Object.keys(dictionary).map(
                                (number) => {
                                    const wordName = Object.keys(dictionary[number])[0];

                                    return <Ball
                                        key={wordName}
                                        name={wordName}
                                        color={dictionary[number][wordName].color}
                                        active={dictionary[number][wordName].active}
                                        sound={dictionary[number][wordName].sound}
                                        avaliable={this.props.gameProps.buttonAvaliable}
                                        play={this.play}
                                    />
                                }
                            )
                        }
                    </div>
                </div>

                <Beat/>
            </div>
        )
    }

    render() {
        const {score, gameOver, startGame} = this.props.gameProps;

        return (
            <main className="app">
                <div className="app__inner">
                    <div className="app__waves">
                        {ICONS.WAVE}
                        {ICONS.WAVE}
                        {ICONS.WAVE}
                    </div>
                    {
                        gameOver ? this.endScreen(score) : this.startScreen()
                    }

                    {
                        (startGame && !gameOver) ? this.playGround() : this.startScreen()
                    }
                </div>
            </main>
        );
    }
}

function mapStateToProps(state) {
    const {sequence, words, gameProps} = state;
    return {sequence, words, gameProps};
}

export default connect(mapStateToProps, {createSequence, playSequence, giveControl, resetCycles, disableControl, startGame, startSing})(App);
