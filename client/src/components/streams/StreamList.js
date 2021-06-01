import React, {Component} from "react";
import {connect} from "react-redux";
import {deleteStream, fetchStreams} from "../../actions";
import {Link} from "react-router-dom";
import "./StreamList.css";

class StreamList extends Component {
    componentDidMount() {
        this.props.fetchStreams();
    }

    renderAdmin({id, userId}) {
        if(this.props.currentUserId === userId) {
            return (
              <div className="right floated content">
                  <button className="ui button primary">
                      Edit
                  </button>
                  <button
                      className="ui button negative"
                      onClick={() => this.props.deleteStream(id)}
                  >
                      Delete
                  </button>
              </div>
            );
        }
    }

    renderCreate() {
        if(this.props.isSignedIn) {
            return (
                <div className="createButton">
                    <Link
                        to="/streams/new"
                        className="ui button primary"
                    >
                        Create Stream
                    </Link>
                </div>
            );
        }
    }

    renderList() {
        return this.props.streams.map( stream => {
            return (
                <div className="item" key={stream.id}>
                    {this.renderAdmin(stream)}
                    <i className="large middle aligned icon camera"/>
                    <div className="content">
                        {stream.title}
                        <div className="description">
                            {stream.description}
                        </div>
                    </div>
                </div>
            );
        })
    }

    render() {
        return <div>
            <h2>Streams</h2>
            <div className="ui celled list">
                {this.renderList()}
            </div>
            {this.renderCreate()}
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };
}

export default connect(
    mapStateToProps,
    {
        fetchStreams,
        deleteStream
    })(StreamList);
