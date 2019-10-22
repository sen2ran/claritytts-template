import React from 'react';
import ReactDOM from 'react-dom';
import { hydrate, render } from "react-dom";
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes';

const App = (props) => {
    return (
        <BrowserRouter>
            <Routes {...props} />
        </BrowserRouter>
    )
}


const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
    hydrate(<App />, rootElement);
} else {
    render(<App />, rootElement);
}

// ReactDOM.render(<App />, document.getElementById('root'));
