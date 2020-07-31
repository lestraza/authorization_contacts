import { IState } from "./../store/store.interface";
import { Dispatch } from "react";
import { IAction } from "./../actionCreators/action.interface";
import {
    actionCreatorIsAuth,
    ActionCreatorLogout,
    actionCreatorError,
    actionCreatorGetContacts,
    actionCreatorFilterContacts,
} from "./../actionCreators/actionCreators";
import { ILoginUser, IContact } from "./../requests/request.interface";
import {
    authReq,
    loginUser,
    getContacts,
    editContactReq,
    addContactReq,
    deleteContactReq,
} from "./../requests/requests";

export const login = (dataToSubmit: ILoginUser) => {
    return (dispatch: Dispatch<IAction>) => {
        loginUser(dataToSubmit)
            .then(() => {
                dispatch(actionCreatorIsAuth());
            })
            .catch((err) => {
                dispatch(actionCreatorError(err.response.data));
            });
    };
};

export const logout = () => {
    return (dispatch: Dispatch<IAction>) => {
        localStorage.removeItem('user_token')
        dispatch(ActionCreatorLogout())
    }
}
export const auth = () => {
    if (localStorage.getItem("user_token")) {
        return (dispatch: Dispatch<IAction>) => {
            authReq()
                .then((res) => {
                    dispatch(actionCreatorIsAuth());
                })
                .catch((err) => {
                    dispatch(actionCreatorError(err.response.data));
                });
        };
    }
};
export const setError = (err: string) => {
    return (dispatch: Dispatch<IAction>) => {
        dispatch(actionCreatorError(err));
    };
};

export const getUserContacts = () => {
    return (dispatch: Dispatch<IAction>) => {
        getContacts()
            .then((res) => {
                dispatch(actionCreatorGetContacts(res));
                setError("");
            })
            .catch((err) => {
                dispatch(actionCreatorGetContacts(err.response.data));
            });
    };
};

export const filterContacts = (filter: string) => {
    return (dispatch: Dispatch<IAction>, getState: () => IState) => {
        const { renderContacts, contacts, filter: stateFilter } = getState();
        let mapOfContacts: IContact[] = [];
        if (filter === stateFilter) {
            mapOfContacts = renderContacts;
        } else {
            mapOfContacts = contacts;
        }
        const filteredContacts = mapOfContacts.filter((contact) => {
            return (
                contact.name.toLowerCase().includes(filter.toLowerCase()) ||
                contact.lastname.toLowerCase().includes(filter.toLowerCase())
            );
        });
        dispatch(actionCreatorFilterContacts(filter, filteredContacts));
    };
};

export const editContact = (contact: IContact) => {
    return (dispatch: Dispatch<IAction>) => {
        editContactReq(contact)
            .then((res) => {
                dispatch(actionCreatorGetContacts(res));
                setError("");
            })
            .catch((err) => {
                dispatch(actionCreatorGetContacts(err.response.data));
            });
    };
};

export const addNewContact = (contact: IContact) => {
    return (dispatch: Dispatch<IAction>) => {
        addContactReq(contact)
            .then((res) => {
                dispatch(actionCreatorGetContacts(res));
                dispatch(actionCreatorError(""));
            })
            .catch((err) => {
                dispatch(actionCreatorError(err.response.data));
            });
    };
};

export const deleteContactAction = (id: string) => {
    return (dispatch: Dispatch<IAction>) => {
        deleteContactReq(id)
            .then((res) => {
                dispatch(actionCreatorGetContacts(res));
            })
            .catch((err) => {
                dispatch(actionCreatorError(err.response.data));
            });
    };
};
