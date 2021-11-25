import React from 'react';
import ReactDOM from 'react-dom';
import App from './routes/App';
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import reducer from './reducers/index';

const initialState = {
    "status": {},
    "pokemonSelected": {},
    "pokemonSelectedDetails": {},
    "pokemonData": [],
}

const store = createStore(reducer, initialState)

ReactDOM.render(
<Provider store={store}>
<App />
</Provider>, document.getElementById('app'));