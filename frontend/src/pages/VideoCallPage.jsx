import styled from "@emotion/styled";
import { Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import Peer from "simple-peer";
import { createSocketConnection } from "../actions/socketActions";

const UserVideo = styled.video`
  width: 300px;
  height: 300px;
  object-fit: cover;
`;

const CallerVideo = styled.video`
  width: 600px;
  height: 600px;
  object-fit: cover;
`;

function VideoCallPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { loading, error, socket } = useSelector(
    (state) => state.socketConnection
  );

  const { userInfo } = useSelector((state) => state.userLogin);

  const userVideo = useRef();
  const callerVideo = useRef();
  const connectionRef = useRef();

  const [callerName, setCallerName] = useState("");
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);

  const videoRoomId = searchParams.get("roomId");

  useEffect(() => {
    if (!socket) {
      dispatch(createSocketConnection());
    } else {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setStream(stream);
          userVideo.current.srcObject = stream;
        });
    }
  }, [dispatch, socket]);

  useEffect(() => {
    if (socket && videoRoomId) {
      socket.emit("join-video-room", videoRoomId, userInfo.name);

      socket.on("user-connected", (userName) => {
        console.log("user-connected " + userName);
      });

      socket.on("endCall", () => {
        //handleEndVideoSession();
        connectionRef.current = null;
        userVideo.current = null;
        callerVideo.current = null;
      });

      socket.on("callUser", (data) => {
        setReceivingCall(true);
        setCallerName(data.from);
        setCallerSignal(data.signal);
      });

      socket.on("callEnded", () => {
        handleEndVideoSession();
      });
    }
  }, [socket, videoRoomId]);

  const handleStartVideoSession = () => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        roomId: videoRoomId,
        signalData: data,
        from: userInfo.name,
      });
    });

    peer.on("stream", (stream) => {
      callerVideo.current.srcObject = stream;
    });

    socket.on("callAccepted", (data) => {
      console.log("callAccepted");
      setCallAccepted(true);
      peer.signal(data.signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, roomId: videoRoomId });
    });

    peer.on("stream", (stream) => {
      callerVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const handleEndVideoSession = () => {
    if (!callEnded)
      socket.emit("endCall", videoRoomId, () => {
        setCallEnded(true);
        setCallerName("");
        connectionRef.current = null;
        userVideo.current = null;
        callerVideo.current = null;

        //   stream.getAudioTracks()[0].stop();
        //   stream.getVideoTracks()[0].stop();
        console.log("callEnded");
      });

    //navigate(-1);
  };

  return (
    <Stack spacing={2} alignItems={"center"}>
      <Typography variant="h3">Video Chat</Typography>

      <Stack spacing={2} direction={"row"}>
        {stream && <UserVideo playsInline muted ref={userVideo} autoPlay />}
        {callAccepted && !callEnded ? (
          <CallerVideo playsInline ref={callerVideo} autoPlay />
        ) : null}
      </Stack>

      {receivingCall && !callAccepted ? (
        <Stack spacing={2} direction={"row"}>
          <Typography variant="h5">
            {callerName} has started video session...
          </Typography>

          <Button variant="contained" onClick={answerCall}>
            Join session
          </Button>
        </Stack>
      ) : null}

      {callAccepted && !callEnded ? (
        <Button
          variant="contained"
          color="error"
          onClick={handleEndVideoSession}
        >
          End Video Session
        </Button>
      ) : (
        <Button variant="contained" onClick={handleStartVideoSession}>
          Start Video Session
        </Button>
      )}

      <Typography variant="h5">{callerName}</Typography>
    </Stack>
  );
}

export default VideoCallPage;
