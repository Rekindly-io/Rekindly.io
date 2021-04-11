import React, { useEffect, useState, useContext, useRef, Fragment } from 'react'
import YouTube from 'react-youtube';
import { SocketContext } from '../../context/socket'
import { Button } from '@chakra-ui/react'

function Video() {
    function youtube_parser(url){
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length==11)? match[7] : false;
    }

    const socket = useContext(SocketContext);
    const yt_player = useRef(null);

    const [isHost, setIsHost] = useState(false);
    const [player, setPlayer] = useState(null);
    let roomId = ""

    useEffect(() => {
        roomId = sessionStorage.getItem("roomID");

        if(sessionStorage.getItem("isHost") === "true"){
            console.log("I am the host!")
            setIsHost(true);

            console.log(`initializing interval`);
            const interval = setInterval(() => {
                forceSync();
            }, 1000);

            return () => {
                console.log(`clearing interval`);
                clearInterval(interval);
            };
        } else {
            // console.log("I am NOT the host!")
            // socket.on('syncVideoClient', function(data) {
            //     var currTime = data.time
            //     var state = data.state
            //     var videoId = data.videoId
            //     var playerId = data.playerId
            //
            //     console.log("Received sync event");
            //     console.log(data);
            //
            //     if(player){
            //         player.seekTo(currTime);
            //
            //     } else {
            //         console.log("Player is null!")
            //     }
            //
            // })
        }
    }, [])



    // NOT host sockets
    useEffect(() => {
        console.log("Player initialized!")
        console.log(player)

        if(sessionStorage.getItem("isHost") === "true"){
            setVideo(sessionStorage.getItem("initialVideo"))
        } else {
            console.log("I am NOT the host!")

            socket.on('syncVideoClient', function(data) {
                var currTime = data.time
                var state = data.state
                var videoId = data.videoId
                var playerId = data.playerId

                console.log("Received sync event");
                console.log(data);

                if(player){


                    if(youtube_parser(player.getVideoUrl()) !== videoId){
                        console.log("Previous ID - " + youtube_parser(player.getVideoUrl()))
                        console.log("New ID - " + videoId)
                        player.loadVideoById(videoId);
                    } else {
                        let diff = Math.abs(player.getCurrentTime() - currTime);
                        if (diff > 0.5) {
                            console.log("Time difference = " + diff)
                            player.seekTo(currTime);
                        }
                    }

                } else {
                    console.log("Player is null sync client!")
                }

            })

            socket.on('justPlay', function(data) {
                if(player){
                    player.playVideo();
                } else {
                    console.log("Player is null play client!")
                }
            })

            socket.on('justPause', function(data) {
                if(player){
                    player.pauseVideo();
                } else {
                    console.log("Player is null pause client!")
                }
            })

            }
    }, [player])

    function playOthers(){
        roomId = sessionStorage.getItem("roomID");

        if(player && sessionStorage.getItem("isHost") === "true"){
            const emit_data = {
                room: roomId,
            }

            console.log("Emitting Sync Data")
            console.log(emit_data)

            socket.emit('play other', emit_data);

        } else {
            console.log("Play Others Player is null!")
        }
    }

    function pauseOthers(){
        roomId = sessionStorage.getItem("roomID");

        if(player && sessionStorage.getItem("isHost") === "true"){
            const emit_data = {
                room: roomId,
            }

            console.log("Emitting Sync Data")
            console.log(emit_data)

            socket.emit('pause other', emit_data);

        } else {
            console.log("Pause Others Player is null!")
        }
    }

    async function forceSync(){

        var currTime = 0
        var state = 1
        roomId = sessionStorage.getItem("roomID");

        console.log("Force Sync Room ID - " + roomId)

        let customRef = yt_player.current.internalPlayer;

        if(customRef && sessionStorage.getItem("isHost") === "true"){

            currTime = await customRef.getCurrentTime();

            const emit_data = {
                room: roomId,
                time: currTime,
                state: state,
            }

            console.log("Emitting Sync Data")
            console.log(emit_data)

            socket.emit('sync video', emit_data);

        } else {
            console.log("Force Sync Player is null!")

        }
        console.log()
    }

    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    function setVideo(videoId){
        roomId = sessionStorage.getItem("roomID");

        if(player){

            console.log("Previous ID - " + youtube_parser(player.getVideoUrl()))
            console.log("New ID - " + videoId)

            player.loadVideoById(videoId);

            const emit_data = {
                room: roomId,
                videoId: videoId
            }

            console.log("Emitting Set Video Data")
            console.log(emit_data)

            socket.emit('set video', emit_data);

        } else {
            console.log("Force Sync Player is null!")

        }
    }

    function _onReady(event) {
        console.log("Initializing player!")

        setPlayer(event.target);
    }

    function stateChange(event){
        if(sessionStorage.getItem("isHost") === "true"){
            setPlayer(event.target);
        }
    }

    return (
      <Fragment>
          <YouTube videoId="_uN2aPIdVYI" opts={opts} onReady={_onReady} onPlay={playOthers} onPause={pauseOthers}
                    onStateChange={stateChange} ref={yt_player}/>
          <Button pointerEvents="auto" variant="solid" maxWidth={250} opacity="1" colorScheme="blue"
                  onClick={forceSync}>
              Force Sync
          </Button>
      </Fragment>
    )

}

export default Video