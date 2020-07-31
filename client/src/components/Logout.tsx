import * as React from "react";
import { connect } from "react-redux";
import { logout } from "../actions/actions"

export interface ILogoutProps {
    logout: ()=> void
}

class Logout extends React.Component<ILogoutProps> {
    public render() {
        return <button className="btn btn-info logout" onClick={this.props.logout}>Logout</button>;
    }
}


const mapDispatchToProps = {
    logout
};
export default connect(null, mapDispatchToProps)(Logout);