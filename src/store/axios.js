import axios from 'axios';
import store from '../store/store.js';
import { urlLinks } from '../linkes.js'

/**
 * creating new project
 * @param {String} url 
 * @param {Object} data An object contains the project name;
 */
export var createNewProject = (url, data) => {
    axios.post(url, data)
        .then(function (response) {
            console.log(response);
            store.dispatch({ type: 'GET_PROJECTS' });
        });
}

/**
 * getting data from DB
 * @param {String} url 
 * @param {String} type The case of the dispatch to do after the data comes back from the server;
 */
export var getData = (url, type) => {
    axios.get(url)
        .then(function (res) {
            console.log(res);
            store.dispatch({ type: type, payload: res.data });
        });
}

export var getPojects = (url, type, payload) => {
    axios.get(url)
        .then(function (res) {
            console.log(res);
            store.dispatch({ type: type, payload: res.data });
        })
        .then(function () {
            store.dispatch({ type: "START_WITH_PROJECT", payload: payload });
        });
}

/**
 * Saving data in DB;
 * @param {String} url 
 * @param {Object} data An object contains the data to save;
 * @param {String} type The case of the dispatch to do after the data saved in the DB;
 */
export var saveData = (url, data, type) => {
    axios.put(url, data)
        .then(function (res) {
            store.dispatch({ type: type });
            console.log(res);
        });
}

/**
 * Editing data in DB;
 * @param {String} url 
 * @param {Object} data An object contains the data to edit;
 * @param {String} type The case of the dispatch to do after the data edited in the DB;
 */
export var editData = (url, data, type) => {
    axios.put(url, data)
        .then(function (res) {
            console.log(res);
            store.dispatch({ type: type });
        });
}

/**
 * Deleting data in DB;
 * @param {String} url 
 * @param {String} type The case of the dispatch to do after the data deleted in the DB;
 */
export var deleteData = (url, type) => {
    axios.delete(url)
        .then(function (res) {
            console.log(res);
            store.dispatch({ type: type });
        });
}