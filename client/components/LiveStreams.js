import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './LiveStreams.scss';
 
export default class LiveStreams extends React.Component {
 
    constructor(props) {
        super(props);
        this.state = {
            live_streams: []
        }
    }
 
    componentDidMount() {
        this.getLiveStreams();
    }
 
    getLiveStreams() {
        axios.get(
            '/streams/list',
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        ).then(response => {
                this.setState({
                    live_streams: response.data
                });
            });
    }
 
 
    render() {
        let streams = this.state.live_streams.map((stream, index) => {
            return (
                <div className="stream col-xs-12 col-sm-12 col-md-3 col-lg-4" key={index}>
                    <span className="live-label">LIVE</span>
                    <Link to={'/stream/' + stream.username}>
                        <div className="stream-thumbnail">
                            <img src={'/thumbnails/' + stream.stream_key + '.png'}/>
                        </div>
                    </Link>
 
                    <span className="username">
                        <Link to={'/stream/' + stream.username}>
                            {stream.username}
                        </Link>
                    </span>
                </div>
            );
        });
 
        return (
            <div className="container mt-5">
                <h4>Live Streams</h4>
                <hr className="my-4"/>
 
                <div className="streams row">
                    {streams}
                </div>
            </div>
        )
    }
}