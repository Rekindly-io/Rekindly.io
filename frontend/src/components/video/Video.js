import React from 'react';
import YouTube from 'react-youtube';

function Video() {
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };
    /*
    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }
    */

    return <YouTube videoId="_uN2aPIdVYI" opts={opts} /*onReady={this._onReady} *//>;

}

export default Video
