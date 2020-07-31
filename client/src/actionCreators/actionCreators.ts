import { IContact } from "./../requests/request.interface";
import { IAction } from "./action.interface";

export const actionCreatorIsLoading = (): IAction =>
    <const>{
        type: "IS_LOADING",
    };

export const actionCreatorIsAuth = (): IAction =>
    <const>{
        type: "IS_AUTH",
    };

export const ActionCreatorLogout = (): IAction =>
    <const>{
        type: "LOGOUT",
    };

export const actionCreatorError = (error: string): IAction =>
    <const>{
        type: "ERROR",
        payload: { error },
    };

export const actionCreatorGetContacts = (contacts: IContact[]): IAction =>
    <const>{
        type: "GET_CONTACTS",
        payload: { contacts },
    };

export const actionCreatorFilterContacts = (
    filter: string,
    contacts: IContact[]
): IAction =>
    <const>{
        type: "FILTER_CONTACTS",
        payload: { filter, contacts },
    };
