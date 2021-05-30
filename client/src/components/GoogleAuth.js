import React, {Component} from "react";
import {clientId} from "../consts/clientId";

class GoogleAuth extends Component {
    state = {
        isSignedIn: null
    }

    componentDidMount() {
        //accessible via import in index.html -> google -> api.js
        window.gapi.load("client:auth2", () => {
            window.gapi.client.init({
                clientId: clientId,
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

    renderAuthButton() {
        if(this.state.isSignedIn === null) {
            return <div>I dont know if we are signed in</div>
        } else if(this.state.isSignedIn){
            return <div>I am signed in!</div>
        } else {
            return <div>I am not signed in!</div>
        }
    }

    render() {
        return (
            <div>{this.renderAuthButton()}</div>
        );
    }
}

export default GoogleAuth;
