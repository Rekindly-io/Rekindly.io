import React, { useEffect, useState, useContext, Fragment } from 'react'
import YouTube from 'react-youtube';
import { SocketContext } from '../../context/socket'
import { Button } from '@chakra-ui/react'

function Video() {
    const socket = useContext(SocketContext);

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
                    let diff = Math.abs(player.getCurrentTime() - currTime);
                    if(diff > 0.5) {
                        console.log("Time difference = " + diff)
                        player.seekTo(currTime);
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
        if(player){
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

        if(player){
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

    function forceSync(){

        var currTime = 0
        var state = 1
        var videoId = "_uN2aPIdVYI"
        roomId = sessionStorage.getItem("roomID");

        console.log("Force Sync Room ID - " + roomId)

        if(player){

            currTime = player.getCurrentTime();

            const emit_data = {
                room: roomId,
                time: currTime,
                state: state,
                videoId: videoId
            }

            console.log("Emitting Sync Data")
            console.log(emit_data)

            socket.emit('sync video', emit_data);

        } else {
            console.log("Force Sync Player is null!")
        }
    }

    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    function _onReady(event) {
        console.log("Initializing player!")
        setPlayer(event.target);
    }

    return (
      <Fragment>
          <YouTube videoId="_uN2aPIdVYI" opts={opts} onReady={_onReady} onPlay={playOthers} onPause={pauseOthers}/>
          <Button pointerEvents="auto" variant="solid" maxWidth={250} opacity="1" colorScheme="blue"
                  onClick={forceSync}>
              Force Sync
          </Button>
      </Fragment>
    )

}

export default Video