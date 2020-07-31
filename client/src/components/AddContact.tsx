import * as React from "react";
import { IContact } from "../requests/request.interface";
import { connect } from "react-redux";
import { IState } from "../store/store.interface";
import { setError, addNewContact } from "../actions/actions";

import Error from "../commons/Error";

export interface IAddContactProps {
    addNewContact: (dataToSubmit: IContact) => void;
    error: string;
    setError: (error: string) => void;
}

class AddContact extends React.Component<IAddContactProps> {
    state = {
        name: "",
        lastname: "",
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

    private onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { name, lastname } = this.state;
        if (name && lastname) {
            const newContact = {
                name: this.state.name,
                lastname: this.state.lastname,
            };
            this.props.addNewContact(newContact);
            this.setState({
                name: "",
                lastname: "",
            });
        } else {
            this.props.setError("Enter name and lastname");
        }
    };

    componentWillUnmount() {
        this.props.setError("");
    }

    public render() {
        const { name, lastname } = this.state;
        const { error } = this.props;
        return (
            <div>
                <div>Add new contact</div>
                <form className="form-group" onSubmit={this.onSubmitForm}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter new contact's name"
                            autoComplete="off"
                            data-id="name"
                            value={name}
                            onChange={this.onChangeSaveValue}
                        ></input>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter new contact's lastname"
                            autoComplete="off"
                            data-id="lastname"
                            value={lastname}
                            onChange={this.onChangeSaveValue}
                        ></input>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        ADD CONTACT
                    </button>
                </form>
                {error && <Error value={error} />}
            </div>
        );
    }
}

const mapStateToProps = (state: IState) => {
    return { error: state.error };
};

const mapDispatchToProps = {
    addNewContact,
    setError,
};
export default connect(mapStateToProps, mapDispatchToProps)(AddContact);
