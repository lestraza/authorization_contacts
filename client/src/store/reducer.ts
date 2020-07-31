import { IS_LOADING, IS_AUTH, ERROR, GET_CONTACTS, FILTER_CONTACTS, LOGOUT } from './../constants/constants';
import { IState } from './store.interface';
import { ActionTypes } from '../actionCreators';

const initialState: IState = {
    isLoading: false,
    isAuth: false,
    error: '',
    renderContacts: [],
    contacts: [],
    filter: ''
}

const reducer = (state = initialState, action: ActionTypes) => {
    switch(action.type) {
        case IS_LOADING: return {
            ...state,
            isLoading: true
        }
        case IS_AUTH: return {
            ...state,
            isLoading: false,
            isAuth: true,
            error: ''
        }
        case LOGOUT: return {
            ...state,
            isAuth: false
        }
        case ERROR: return {
            ...state,
            error: action.payload!.error, 
            isLoading: false
        }
        case GET_CONTACTS: return {
            ...state,
            contacts: action.payload?.contacts!,
            renderContacts: action.payload?.contacts!,
            error: ''
        }
        case FILTER_CONTACTS: return {
            ...state,
            renderContacts: action.payload?.contacts!,
            filter: action.payload?.filter
        }

        default: return state
    }
}

export default reducer