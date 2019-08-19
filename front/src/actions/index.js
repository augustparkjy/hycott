export const SET_USER = 'SET_USER';
export const SET_MODAL_OPEN = 'SET_MODAL_OPEN';

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