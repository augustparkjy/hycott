export const SET_USER = 'SET_USER';
export const SET_MODAL_OPEN = 'SET_MODAL_OPEN';
export const SET_PALY_CONTENTS = 'SET_PLAY_CONTENTS';

export function setUser(value){
    return{
        type: SET_USER,
        user: value
    }
}

export function setModalOpen(value){
    return {
        type : SET_MODAL_OPEN,
        modalOpen : value
    }
}

export function setPlayContents(value){
    return {
        type: SET_PALY_CONTENTS,
        playContents : value
    }
}