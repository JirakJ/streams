import React, {Component} from "react";
import {CLIENT_ID} from "../consts/CLIENT_ID";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions"
class GoogleAuth extends Component {
    componentDidMount() {
        //accessible via import in index.html -> google -> api.js
        window.gapi.load("client:auth2", () => {
            window.gapi.client.init({
                clientId: CLIENT_ID,
                scope: "email"
            }).then(() => {
                //reference to GAPI
               this.auth = window.gapi.auth2.getAuthInstance();
               this.onAuthChange(this.auth.isSignedIn.get());
               this.auth.isSignedIn.listen(this.onAuthChange)
            });
        });
    }

    onAuthChange = (isSignedIn) => {
        if(isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    };

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    renderAuthButton() {
        if(this.props.isSignedIn === null) {
            return null;
        } else if(this.props.isSignedIn){
            return <button className="ui red google button" onClick={this.onSignOutClick}>
                <i className="google icon"/>
                Sign Out
            </button>
        } else {
            return  <button className="ui blue google button" onClick={this.onSignInClick}>
                <i className="google icon"/>
                Sign In with Google
            </button>
        }
    }

    render() {
        return (
            <div>{this.renderAuthButton()}</div>
        );
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
}

export default connect(
    mapStateToProps,
    {
        signIn,
        signOut
    }
)(GoogleAuth);
