import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainScreen from './screen/MainScreen';
import * as serviceWorker from './serviceWorker';
import {createStore} from 'redux';
import hycottApp from './reducers';
import {Provider} from 'react-redux';

const store = createStore(hycottApp);

ReactDOM.render(
    <Provider store={store}>
        <MainScreen/>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();