import * as actionTypes from './actionTypes'
import {convertObjectstoArray} from '../../shared/utility';
import {getDummyData} from '../../bootstrap/data';

// async actionDispatchers

export const addItem = (firebase, item) => async dispatch => {
    firebase.setData(item)
};

export const saveExampleData = (firebase) => async dispatch => {
    getDummyData().map(item => firebase.setData(item))
};

export const fetchData = (firebase) => async dispatch => {
    firebase.data().on('value', snapshot => {
        dispatch({
            type: actionTypes.FETCH_ALL_DATA,
            data: convertObjectstoArray(snapshot.val())
        })
    })
};
