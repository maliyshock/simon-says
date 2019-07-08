import React, {Component} from 'react';
import './App.css';

import {connect} from 'react-redux'
import {createSequence, playSequence, giveControl, resetCycles} from './actions/index';
import Ball from './components/Ball'

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
                        sequence: this.props.sequence,
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
            }, 1000);
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
        const {words, score, gameOver} = this.props.gameProps;
        return (
            <main className="App">
                <h1 className="app__title h1"> Saymon says: {score} </h1>
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
                            <ul className='buttons__list'>
                                {
                                    Object.keys(words).map(
                                        (word) => {
                                            return <Ball
                                                key={word}
                                                name={word}
                                                color={words[word].color}
                                                active={words[word].active}
                                                avaliable={this.props.gameProps.buttonAvaliable}
                                                play={this.play}
                                            />
                                        }
                                    )
                                }
                            </ul>
                        </div>

                        <button
                            onClick={ () => this.play() }
                            type={'button'}
                        >Play Sequence</button>
                    </div>
                }

            </main>
        );
    }
}

function mapStateToProps(state) {
    const {sequence, words, gameProps} = state;
    return {sequence, words, gameProps};
}

export default connect(mapStateToProps, {createSequence, playSequence, giveControl, resetCycles})(App);
