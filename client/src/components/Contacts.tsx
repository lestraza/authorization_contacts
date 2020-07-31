import * as React from "react";
import { connect } from "react-redux";
import { IState } from "../store/store.interface";
import { IContact } from "../requests/request.interface";
import {
    getUserContacts,
    editContact,
    deleteContactAction,
    setError,
    filterContacts,
} from "../actions/actions";
import ContactItem from "./ContactItem";
import AddContact from "./AddContact";
import Logout from "./Logout";

export interface IContactsProps {
    renderContacts: IContact[];
    contacts: IContact[];
    getUserContacts: () => void;
    editContact: (contact: IContact) => void;
    deleteContactAction: (id: string) => void;
    setError: (err: string) => void;
    filterContacts: (filter: string) => void;
}

class Contacts extends React.Component<IContactsProps> {
    state = {
        filter: "",
    };

    componentDidMount() {
        this.props.getUserContacts();
    }

    private onChangeSearchContact = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const filter = event.currentTarget.value;
        this.setState(
            {
                filter,
            },
            () => {
                this.props.filterContacts(this.state.filter);
            }
        );
    };

    public editContact = (contact: IContact) => {
        this.props.editContact(contact);
    };

    public setError = (err: string) => {
        this.props.setError(err);
    };

    public deleteContact = (id: string) => {
        this.props.deleteContactAction(id);
    };
    private renderContacts = () => {
        return this.props.renderContacts.map((contact) => {
            return (
                <ContactItem
                    key={contact.lastname + contact.id}
                    contact={contact}
                    deleteContact={this.deleteContact}
                    editContact={this.editContact}
                    setError={this.setError}
                />
            );
        });
    };

    public render() {
        const { filter } = this.state;
        const { contacts } = this.props;

        return (
            <div className="container contact_container">
                    <Logout />
                <div className="filter_container">
                    FILTER CONTACT
                    <input
                        type="text"
                        id="name"
                        value={filter}
                        placeholder="Enter filter"
                        className="form-control"
                        onChange={this.onChangeSearchContact}
                    />
                </div>
                {contacts.length ? (
                    <table className="table">
                        <tbody>{this.renderContacts()}</tbody>
                    </table>
                ) : (
                    <div className="alert alert-secondary" role="alert">
                        You have no any contacts
                    </div>
                )}

                <AddContact />
            </div>
        );
    }
}

const mapStateToProps = (state: IState) => {
    return { renderContacts: state.renderContacts, contacts: state.contacts };
};

const mapDispatchToProps = {
    getUserContacts,
    editContact,
    deleteContactAction,
    setError,
    filterContacts,
};
export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
