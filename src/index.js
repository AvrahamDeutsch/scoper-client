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
        <App projectId={'5bfbe195d9c0d0126cc8681f'}/>
    </Provider>,
    document.getElementById('root'));


serviceWorker.unregister();
