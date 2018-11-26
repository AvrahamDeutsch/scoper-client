import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from "./store/store.js"
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux'
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
    <Provider store={store}>
        <App projectId={'1'}/>
    </Provider>,
    document.getElementById('root'));


serviceWorker.unregister();
