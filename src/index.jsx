import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './store/reducers'

import { BrowserRouter } from 'react-router-dom'
import Routes from './routes';


const App = (props) => {
    return (
        <BrowserRouter basename='/en'>
            <Routes {...props} />
        </BrowserRouter>
    )
}


const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));
