import React, {Component} from "react";
import Modal from "../Modal";
import history from "../../history";
import {connect} from "react-redux";
import {deleteStream, fetchStream} from "../../actions";
import {Link} from "react-router-dom";

class StreamDelete extends Component{
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    renderActions() {
       return (
            <>
                <button onClick={() => this.props.deleteStream(this.props.match.params.id)}
                        className="ui button negative">
                    Delete
                </button>
                <Link to="/" className="ui cancel button">
                    Cancel
                </Link>
            </>
        )
    }

    renderContent() {
        if(!this.props.stream) {
            return "Are you sure you want delete this stream?";
        }
        return `Are you sure you want delete this stream with title: ${this.props.stream.title}?`
    }

    render() {
        return (
                <Modal
                    title="Delete Stream"
                    content={this.renderContent()}
                    actions={this.renderActions()}
                    onDismiss={() => history.push("/")}
                />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(
    mapStateToProps,
    {
        fetchStream,
        deleteStream
    }
)(StreamDelete);
