import React, {Component} from 'react';

import {connect} from 'react-redux'
import {createSequence, playSequence, giveControl, resetCycles} from './actions/index';
import Ball from './components/Ball'
import { ICONS } from './constants'

class App extends Component {

    componentDidMount() {
        this.props.createSequence()
            .then( () => {
                this.play();
        });
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

    endScreen(score) {
        return (
            <div>
                <h1>Game Over!</h1>
                <div>Saymon said {score} words</div>
                <button onClick={ () => this.play() } type={'button'}>Play Sequence</button>
            </div>
        )
    }

    render() {
        const {words, score, gameOver, level} = this.props.gameProps;
        const dictionary = words.dictionary;

        let lineClassNames = 'buttons__line';
        let levelContainer = 'buttons__level-container';

        if(this.props.gameProps.buttonAvaliable) {
            lineClassNames = lineClassNames + ' active';
            levelContainer = levelContainer + ' active';
        }

        return (
            <main className="app">
                <div className="app__inner">
                    <h1 className="app__title h2"> Saymon says</h1>

                    <div className="app__waves">
                        {ICONS.WAVE}
                        {ICONS.WAVE}
                        {ICONS.WAVE}
                    </div>
                    {/*
                        Меню с выбором сложности
                          Компонет дроплист
                          Компонент кнопка
                          Доска победителей
                          Кнопка назад

                        Игровая площадка
                          Список шаров которые проигрываются и на которые можно кликать
                          Сложность
                          Счет
                          Кнопка меню
                      */}

                    { gameOver ? this.endScreen(score) :

                        <div className="play-ground">
                            <div className='buttons'>
                                <div className='buttons__list'>
                                    <div className={`${lineClassNames} butons__line--position-vertical`}></div>
                                    <div className={`${lineClassNames} butons__line--position-horizontal`}></div>
                                    <div className={levelContainer}>
                                        <h2 className='buttons__go h3'>GO!</h2>
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
                                                    avaliable={this.props.gameProps.buttonAvaliable}
                                                    play={this.play}
                                                />
                                            }
                                        )
                                    }
                                </div>
                            </div>

                            <button
                                onClick={ () => this.play() }
                                type={'button'}
                            >Play Sequence</button>
                        </div>
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

export default connect(mapStateToProps, {createSequence, playSequence, giveControl, resetCycles})(App);
