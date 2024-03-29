import React, {Component} from "react";
import {connect} from "react-redux";
import {fetchStream} from "../../actions";
import flv from "flv.js";
import "./StreamShow.css";

class StreamShow extends Component {
    constructor() {
        super();
        this.videoRef = React.createRef();
    }

    componentDidMount() {
        const { id } = this.props.match.params;

        this.props.fetchStream(id);
        this.buildPlayer();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.buildPlayer();
    }

    componentWillUnmount() {
        this.videoPlayer.destroy();
    }

    buildPlayer() {
        if(this.videoPlayer || !this.props.stream) {
            return
        }
        const { id } = this.props.match.params;
        this.videoPlayer = flv.createPlayer({
            type: "flv",
            url: `http://localhost:8000/live/${id}.flv`
        })
        this.videoPlayer.attachMediaElement(this.videoRef.current);
        this.videoPlayer.load();
    }

    render() {
        if(!this.props.stream) {
            return <div>Loading...</div>
        }

        const { title, description } = this.props.stream;

        return (
            <div>
                <video ref={this.videoRef} className="videoContainer" controls/>
                <h1>{title}</h1>
                <h5>{description}</h5>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] };
}

export default connect(
    mapStateToProps,
    {fetchStream}
)(StreamShow);
