import * as actionTypes from './actionTypes'
import {convertObjectstoArray} from '../../shared/utility';
import {getDoaData} from '../../bootstrap/data';

// async actionDispatchers

export const addItem = (firebase, item) => async dispatch => {
    firebase.setData(item)
};

export const saveItem = (firebase, item) => async dispatch => {
    const id = item.id;
    delete item.id;
    console.log(id);
    firebase.saveItem(id, item)
};

export const saveExampleData = (firebase) => async dispatch => {
    getDoaData().map(item => firebase.setData(item))
};

export const fetchData = (firebase) => async dispatch => {
    firebase.data().on('value', snapshot => {
        dispatch({
            type: actionTypes.FETCH_ALL_DATA,
            data: convertObjectstoArray(snapshot.val())
        })
    })
};
