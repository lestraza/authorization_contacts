import React, { Component } from "react";
import Login from "./components/Login";
import { connect } from "react-redux";
import { IState } from "./store/store.interface";
import { auth } from "./actions/actions";
import Contacts from "./components/Contacts";
import Loader from "react-loader-spinner";

export interface IAppProps {
    isLoading: boolean;
    isAuth: boolean;
    auth: () => void;
}
class App extends Component<IAppProps> {

    constructor(props: IAppProps) {
        super(props)
        this.props.auth()
    }

    render() {
        return (
            <div className="container wrapper">
                {!this.props.isLoading ? (
                    !this.props.isAuth ? (
                        <Login />
                    ) : (
                        <Contacts />
                    )
                ) : (
                    <Loader />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state: IState) => {
    return { isLoading: state.isLoading, isAuth: state.isAuth };
};

const mapDispatchToProps = {
    auth,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
