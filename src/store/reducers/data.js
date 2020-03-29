import * as actionTypes from '../actions/actionTypes';
import {getDummyData} from '../../bootstrap/data';

const initialState = getDummyData();


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ALL_DATA: return action.data;
        default:
            return state
    }
};

export default reducer;