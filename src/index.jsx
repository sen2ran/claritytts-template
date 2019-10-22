import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-snapshot';
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes';

const App = (props) => {
    return (
        <BrowserRouter>
            <Routes {...props} />
        </BrowserRouter>
    )
}


render(
    <App />,
    document.getElementById('root')
  );

// ReactDOM.render(<App />, document.getElementById('root'));
