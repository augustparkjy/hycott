import { SET_USER, SET_MODAL_OPEN } from '../actions';
import { combineReducers } from 'redux';

const userInitialState = {
    email : '',
    pw : '',
    name : '',
    age : '',
    token : ''
}

const modalOpenInitialState = false

const user = (state = userInitialState, action) =>{
    switch(action.type){
        case SET_USER:
            return Object.assign({}, state, action.user);
        default:
            return state;
    }
}

const modalOpen = (state = modalOpenInitialState, action) =>{
    switch(action.type){
        case SET_MODAL_OPEN:
            return action.modalOpen;
        default:
            return state
    }
}

const hycottApp = combineReducers({
    user,
    modalOpen
});

export default hycottApp;