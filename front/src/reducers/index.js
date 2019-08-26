import { SET_USER, SET_MODAL_OPEN, SET_PALY_CONTENTS } from '../actions';
import { combineReducers } from 'redux';

const userInitialState = {
    email : '',
    pw : '',
    name : '',
    age : '',
    token : ''
}

const modalOpenInitialState = false

const playContentsInitialState = null

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

const playContents = (state = playContentsInitialState, action) => {
    switch(action.type){
        case SET_PALY_CONTENTS:
            return action.playContents;
        default:
            return state;
    }
}
const hycottApp = combineReducers({
    user,
    modalOpen,
    playContents
});

export default hycottApp;