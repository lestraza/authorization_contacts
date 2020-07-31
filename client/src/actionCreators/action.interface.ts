import { IContact } from './../requests/request.interface';

export type IDispatchActions =
    | "IS_LOADING"
    | "LOGOUT"
    | "IS_AUTH"
    | "ERROR"
    | "GET_CONTACTS"
    | "FILTER_CONTACTS"


export interface IAction {
    type: IDispatchActions;
    payload?: IPayload;
}

export interface IPayload {
    error?: string
    contacts?: IContact[]
    filter?: string
}