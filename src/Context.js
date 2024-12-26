import { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();
const socket = io("https://roomserver-g5tq.onrender.com");
const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  // controls if media input is on or off
  const [playing, setPlaying] = useState(false);

  // controls if audio/video is on or off (seperately from each other)
  const [audio, setAudio] = useState(false);
  const [video, setVideo] = useState(true);

  const [videoEnabled, setVideoEnabled] = useState(true);

  const [name, setName] = useState("");
  const [call, setCall] = useState({});
  const [me, setMe] = useState("");
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  const stopStream = () => {
    stream.getTracks().forEach((track) => track.stop());

    setPlaying(false);
  };

  const toggleAudio = () => {
    setAudio(!audio);
    stream.getAudioTracks()[0].enabled = audio;
  };

  const toggleVideo = () => {
    setVideo(!video);
    setPlaying(!playing);
    stream.getVideoTracks()[0].enabled = !video;
  };

  useEffect(() => {
    socket.on("me", (id) => setMe(id));
    socket.on("callUser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);

  const startStream = async () => {
    await navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .catch(() => {
        navigator.mediaDevices
          .getUserMedia({ video: false, audio: true })
          .then((currentStream) => {
            setStream(currentStream);
            console.log(myVideo.current);
            myVideo.current.srcObject = currentStream;
            setVideoEnabled(false);
          });
      })
      .then((currentStream) => {
        setStream(currentStream);
        console.log(myVideo.current);
        myVideo.current.srcObject = currentStream;
      });

    setPlaying(true);
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
      config: {
        iceServers: [
          {
            urls: "stun:stun.relay.metered.ca:80",
          },
          {
            urls: "turn:global.relay.metered.ca:80",
            username: "5961fb86deef982ae0c58b36",
            credential: "m/rFTVWn8ln+zKGv",
          },
          {
            urls: "turn:global.relay.metered.ca:80?transport=tcp",
            username: "5961fb86deef982ae0c58b36",
            credential: "m/rFTVWn8ln+zKGv",
          },
          {
            urls: "turn:global.relay.metered.ca:443",
            username: "5961fb86deef982ae0c58b36",
            credential: "m/rFTVWn8ln+zKGv",
          },
          {
            urls: "turns:global.relay.metered.ca:443?transport=tcp",
            username: "5961fb86deef982ae0c58b36",
            credential: "m/rFTVWn8ln+zKGv",
          },
        ],
      },
    });
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from });
    });
    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });
    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
      config: {
        iceServers: [
          {
            urls: "stun:stun.relay.metered.ca:80",
          },
          {
            urls: "turn:global.relay.metered.ca:80",
            username: "5961fb86deef982ae0c58b36",
            credential: "m/rFTVWn8ln+zKGv",
          },
          {
            urls: "turn:global.relay.metered.ca:80?transport=tcp",
            username: "5961fb86deef982ae0c58b36",
            credential: "m/rFTVWn8ln+zKGv",
          },
          {
            urls: "turn:global.relay.metered.ca:443",
            username: "5961fb86deef982ae0c58b36",
            credential: "m/rFTVWn8ln+zKGv",
          },
          {
            urls: "turns:global.relay.metered.ca:443?transport=tcp",
            username: "5961fb86deef982ae0c58b36",
            credential: "m/rFTVWn8ln+zKGv",
          },
        ],
      },
    });
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });
    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });
    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        startStream,
        stopStream,
        playing,
        toggleAudio,
        toggleVideo,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
        videoEnabled,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
export { ContextProvider, SocketContext };
