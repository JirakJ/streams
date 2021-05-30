import React, {Component} from "react";
import {CLIENT_ID} from "../consts/CLIENT_ID";

class GoogleAuth extends Component {
    state = {
        isSignedIn: null
    }

    componentDidMount() {
        //accessible via import in index.html -> google -> api.js
        window.gapi.load("client:auth2", () => {
            window.gapi.client.init({
                clientId: CLIENT_ID,
                scope: "email"
            }).then(() => {
                //reference to GAPI
               this.auth = window.gapi.auth2.getAuthInstance();
               this.setState({ isSignedIn: this.auth.isSignedIn.get() });
               this.auth.isSignedIn.listen(this.onAuthChange)
            });
        });
    }

    onAuthChange = () => {
      this.setState({ isSignedIn: this.auth.isSignedIn.get() })
    };

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    renderAuthButton() {
        if(this.state.isSignedIn === null) {
            return null;
        } else if(this.state.isSignedIn){
            return <button className="ui red google button" onClick={this.onSignInClick}>
                <i className="google icon"/>
                Sign Out
            </button>
        } else {
            return  <button className="ui blue google button" onClick={this.onSignOutClick}>
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

export default GoogleAuth;
