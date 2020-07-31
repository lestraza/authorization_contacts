import * as React from "react";
import { IContact } from "../requests/request.interface";

export interface IContactItemProps {
    contact: IContact;
    editContact: (contact: IContact) => void;
    setError: (err: string) => void;
    deleteContact: (id: string) => void;
}

export default class ContactItem extends React.Component<IContactItemProps> {
    state = {
        name: this.props.contact.name,
        lastname: this.props.contact.lastname,
    };

    private onChangeSaveValue = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const id = event.currentTarget.dataset.id;
        const value = event.currentTarget.value;
        id && this.setState({
            [id]: value,
        });
    };

    private onClickEditContact = () => {
        const { name, lastname } = this.state;
        if (name && lastname) {
            const contact = {
                id: this.props.contact.id,
                name: this.state.name,
                lastname: this.state.lastname,
            };
            this.props.editContact(contact);
        } else {
            this.props.setError("Enter name and lastname");
        }
    };



    private onClickDeleteContact = () => {
        const { id } = this.props.contact;
        id && this.props.deleteContact(id);
    };
    public render() {
        const { name, lastname } = this.state;
        return (
            <tr>
                <td>
                    <input
                        type="text"
                        data-id="name"
                        value={name}
                        className="contact_item_input"
                        onChange={this.onChangeSaveValue}
                    />
                </td>
                <td>
                    <input
                        type="text"
                        data-id="lastname"
                        value={lastname}
                        className="contact_item_input"
                        onChange={this.onChangeSaveValue}
                    />
                </td>
                <td>
                    <div
                        className="btn btn-secondary"
                        onClick={this.onClickEditContact}
                    >
                        Edit contact
                    </div>
                </td>
                <td>
                    <div
                        className="btn btn-secondary"
                        onClick={this.onClickDeleteContact}
                    >
                        Delete contact
                    </div>
                </td>
            </tr>
        );
    }
}
