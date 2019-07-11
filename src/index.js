import React from 'react';
import ReactDOM from 'react-dom';
import './app.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {Provider} from 'react-redux';
import { BrowserRouter, Router, Route } from 'react-router-dom'
import configureStore from './store/configureStore.js'
import history from './history';


const store = configureStore();

// to-do – перенести всю логику в экшены
// менять цикл в экшенах, в редьюсере только обновлять


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Router history={history}>
                <div>
                    <Route path={'/app'} component={App} />
                </div>
            </Router>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
