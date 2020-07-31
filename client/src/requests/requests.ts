import { ILoginUser, IContact } from "./request.interface";
import axios from "axios";
const url = "http://localhost:3006";

export const loginUser = (dataToSubmit: ILoginUser) => {
    return axios.post(`${url}/api/user1`, dataToSubmit).then((res) => {
        return saveToken(res.data).then(() => {
            return authReq().then((res) => {
                return res;
            });
        });
    });
};

export const authReq = () => {
    const token = localStorage.getItem("user_token");
    return axios
        .post(`${url}/api/user/auth`, { token })
        .then((res) => res.data);
};

export const getContacts = () => {
    return axios.get(`${url}/api/user1/contacts`).then((res) => res.data);
};

export const editContactReq = (contact: IContact) => {
    return axios
        .post(`${url}/api/user1/editContact`,  contact )
        .then((res) => res.data);
}

export const deleteContactReq = (id: string) => {
    return axios
        .post(`${url}/api/user1/deleteContact`, {id})
        .then((res) => {
            return res.data;
        });
};

export const addContactReq = (contact: IContact) => {
    return axios
        .post(`${url}/api/user1/addContact`, { contact })
        .then((res) => res.data);
};

const saveToken = (token: string) => {
    return new Promise((resolve, reject) => {
        localStorage.setItem("user_token", token);
        resolve();
    });
};
