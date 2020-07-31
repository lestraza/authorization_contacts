import { IContact } from './../requests/request.interface';


export interface IState {
    isLoading: boolean
    isAuth: boolean
    error: string
    contacts: IContact[]
    renderContacts: IContact[]
    filter: string
}

