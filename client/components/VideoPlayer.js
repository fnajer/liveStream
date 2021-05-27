import React from 'react';
import axios from 'axios';
import config from '../config/default';

function getSource(streamKey, type) {
    if (type === 'webrtc') {
        return [
            {  
                type : "webrtc", 
                file : `ws://${config.MEDIA_SERVER.HTTP.URL}:${config.MEDIA_SERVER.HTTP.WEB_RTC_PORT}/app/${streamKey}`, 
                label : "1080"
            }
        ]
    } else if (type === 'llDash') {
        return [
            {
                type: "dash",
                file: `http://${config.MEDIA_SERVER.HTTP.URL}:${config.MEDIA_SERVER.HTTP.LL_DASH_PORT}/app/${streamKey}/manifest_ll.mpd`,
                label: "480p"
            }
        ]
    }
}

export default class VideoPlayer extends React.Component {
 
    constructor(props) {
        super(props);

        const connection = this.getConnection();
        connection.addEventListener('change', this.updateConnectionStatus);

        this.state = {
            stream: false,
            connection: { type: connection.effectiveType },
            userConnType: '',
        }
    }
 
    getConnection = () => {
        return navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    }
    updateConnectionStatus = () => {
        const connection = this.getConnection();
        console.log("Connection type changed from " + this.state.connection.type + " to " + connection.effectiveType);
        this.setState({ connection: { type: connection.effectiveType } });
    }

    getConnType() {
        axios.get('/settings/connection')
            .then(res => {
                if (res.data.connType) {
                    this.setState({ userConnType: res.data.connType })
                }
            });
    }

    componentDidMount() {
        this.getConnType();

        axios.get('/user', {
            params: {
                username: this.props.match.params.username
            }
        }).then(res => {
            this.setState({
                stream: true,
            }, () => {
                let player = OvenPlayer.create("player_dash", {
                    sources: getSource(res.data.stream_key, 'llDash'),
                    autoStart: this.state.userConnType === 'eth',
                });
                player.on("error", function(error){
                    console.log(error);
                });
                let webrtcPlayer = OvenPlayer.create("player_webrtc", {
                    sources:  getSource(res.data.stream_key, 'webrtc'),
                    autoStart: this.state.userConnType === 'wifi',
                });
                webrtcPlayer.on("error", function(error){
                    console.log(error);
                });
                // when full reloading page player dont start playing authomatically. Probably its becouse of react rerender
                // TODO: check without react
            });
        })
    }
 
    render() {
        return (
            <>
                <p className="text-center">Приблизительная скорость канала передачи данных: {this.state.connection.type}</p>
                <p className="text-center">Среда передачи данных: {this.state.userConnType}</p>
                <div className="row">
                    
                    <div className="col-xs-12 col-sm-12 col-md-10 col-lg-8 mx-auto mt-5 d-flex justify-content-around">
                        {this.state.stream ? (
                            <>
                                <div id="player_dash"></div>
                                <div id="player_webrtc"></div>
                            </>
                        ) : ' Loading ... '}
                    </div>
                </div>
            </>
        )
    }
}