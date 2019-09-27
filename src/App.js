import React, {Component} from 'react';

import {connect} from 'react-redux';
import PublishSubscribe from 'publish-subscribe-js';

import {createSequence, highlightButton, giveControl, resetCycles, disableControl, startSing, assetsLoaded, updateAssetsLoading, startNewGame} from './actions/index';
import Ball from './components/Ball';
import Tone from 'tone';
import beat from './samples/beat.mp3';
import { ICONS, SOUNDS_POSITIONS, SOUNDS_BANK } from './constants';
import {playSong} from './helpers/helpers';

document.addEventListener('keydown', (e) => {PublishSubscribe.publish('keyboard_is_listened', e.key);});

function playBeat(player) {
    var loop = new Tone.Loop( (time) => {
        //triggered every eighth note.
        player.start();

    }, 3.433).start(0);
    Tone.Transport.start();
}

var beatPLayer = new Tone.Player({
    "url" : beat,
    "onload": () => {

    }
}).toMaster();

class App extends Component {
    constructor() {
        super();

        this.isOnload = 0;

        this.state = {
            startGame: false,
            pitchShift: new Tone.PitchShift(0).toMaster()
        };
        this.startButtonHandler = this.startButtonHandler.bind(this);
    }

    startButtonHandler() {
        this.setState({
            startGame: true
        });

        playSong(this.props).then( ()=> {
            this.players[SOUNDS_POSITIONS.GO_SOUND].start();
        });
    }

    startNewGame() {
        this.props.createSequence();
        this.props.startNewGame();
        playSong(this.props).then( ()=> {
            this.players[SOUNDS_POSITIONS.GO_SOUND].start();
        });
    }

    componentDidMount() {
        this.players = {};
        let amountOfSounds = 0;
            SOUNDS_BANK.forEach( (item, index) => {
                amountOfSounds++
            });

        let soundsLoaded = new Promise( (resolve, reject) => {
            SOUNDS_BANK.forEach( (sound, index) => {
                this.players[index] = new Tone.Player({
                    "url": sound, 'onload': () => {
                        this.isOnload++;
                        let percent = (this.isOnload / amountOfSounds) * 100;
                        this.props.updateAssetsLoading(percent);
                        if(this.isOnload === amountOfSounds) {
                            this.props.assetsLoaded();
                        }
                    }
                }).connect(this.state.pitchShift);
            });
            resolve();
        });

        soundsLoaded.then(
            () => this.props.createSequence() // PROMISE INSIDE
        )
    }

    loadingScreen() {
        let {isLoading, loadValue} = this.props.gameProps;

        let active = (isLoading === true) ? ' active ' : '';

        let translate = {
            transform: 'translateX('+ loadValue +'%)'
        };

        return (
            <div className={`loading-screen ${active}`}>
                <div className="loading-screen__loader-container">
                    <h2 className='loading-screen__title h3'>Loading...</h2>

                    <div className='loading-screen__loader loader'>
                        <div className='loader__bar' style={translate}></div>
                    </div>
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
                    <button className='button' onClick={() => this.startNewGame()}>Start New game</button>
                </div>
            </div>
        )
    }

    playGround() {
        const {words, score, level} = this.props.gameProps;
        const dictionary = words.dictionary;

        let lineClassNames = 'buttons__line';
        let levelContainer = 'buttons__level-container';

        let active = (this.state.startGame) ? 'active' : '';

        if(this.props.gameProps.buttonAvaliable) {
            lineClassNames = lineClassNames + ' active';
            levelContainer = levelContainer + ' active';
        }

        return (
            <div className='play-ground-wrapper'>
                <div className={`start-screen ${active}`}>
                    <h1 className='start-screen__title h2'>This is an audio game</h1>
                    <h2 className='start-screen__title h3'>Use Headphnes for better experience</h2>

                    <div className='start-screen__button-container'>
                        <button onClick={() => this.startButtonHandler()} className='button'>Start game</button>
                    </div>
                </div>

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
                                        const nameObject = dictionary[number][wordName];

                                        const position = SOUNDS_POSITIONS[wordName];

                                        return <Ball
                                            key={wordName}
                                            name={wordName}
                                            obj={nameObject}
                                            color={nameObject.color}
                                            active={nameObject.active}
                                            sound={this.players[SOUNDS_POSITIONS[wordName]] }
                                            avaliable={this.props.gameProps.buttonAvaliable}
                                            play={this.play}
                                        />
                                    }
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const {score, gameOver, gameStarted, isLoading} = this.props.gameProps;

        return (
            <main className="app">
                <div className="app__inner">
                    <div className="app__waves">
                        {ICONS.WAVE}
                        {ICONS.WAVE}
                        {ICONS.WAVE}
                    </div>
                    {
                        gameOver ? this.endScreen(score) : ''
                    }

                    {
                        (gameStarted && !gameOver) ? this.playGround() : ''
                    }

                    {
                        (isLoading && !gameStarted) ? this.loadingScreen() : ''
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

export default connect(mapStateToProps, {createSequence, highlightButton, giveControl, resetCycles, disableControl, startSing, assetsLoaded, updateAssetsLoading, startNewGame})(App);
