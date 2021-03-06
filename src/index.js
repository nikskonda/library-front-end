import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import './bootstrap.min.css';
import 'jquery';
import 'popper.js';
// import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'semantic-ui-css/semantic.min.css'

ReactDOM.render(
    <BrowserRouter>
        <App id='app'/>
    </BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
