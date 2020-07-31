import * as React from "react";
import { connect } from "react-redux";
import { IState } from "../store/store.interface";
import { login, setError } from "../actions/actions";
import LoaderContainer from "../commons/Loader";
import { ILoginUser } from "../requests/request.interface";
import Error from '../commons/Error'

export interface ILoginProps {
    isLoading: boolean;
    isAuth: boolean;
    error: string
    login: (dataToSubmit: ILoginUser) => void;
    setError: (err: string) => void;
}

class Login extends React.Component<ILoginProps> {
    state = {
        email: "",
        password: "",
    };

    componentWillUnmount() {
        this.props.setError('')
    }

    private onChangeSaveValue = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const id = event.currentTarget.id;
        const value = event.currentTarget.value;
        this.setState({
            [id]: value
        })
    };

    private onSubmitLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { email, password } = this.state;
        if (email && password) {
            const dataToSubmit = {
                email: this.state.email,
                password: this.state.password,
            };
            this.props.login(dataToSubmit);
        } else {
            this.props.setError("Enter email and password")
        }
    };

    public render() {
        const { email, password } = this.state;
        const { error } = this.props
        return (
            <div>
                <form className="form-group" onSubmit={this.onSubmitLogin}>
                    <div className="form-group col-6">
                        <label htmlFor="email">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="email@example.com"
                            autoComplete="off"
                            id="email"
                            aria-describedby="emailHelp"
                            value={email}
                            onChange={this.onChangeSaveValue}
                        ></input>
                    </div>
                    <div className="form-group col-6">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            id="password"
                            aria-describedby="passwordHelp"
                            value={password}
                            onChange={this.onChangeSaveValue}
                        ></input>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                </form>
                {this.props.isLoading && <LoaderContainer />}
                {error && <Error value={error}/>}
            </div>
        );
    }
}

const mapStateToProps = (state: IState) => {
    return { isLoading: state.isLoading, isAuth: state.isAuth, error: state.error };
};

const mapDispatchToProps = {
    login,
    setError,
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
