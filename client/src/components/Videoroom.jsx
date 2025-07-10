// src/pages/Room.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const VideoRoom = () => {
  const { roomId } = useParams();
  const [stream, setStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const myVideoRef = useRef();
  const remoteVideoRef = useRef();
  const socketRef = useRef();
  const peerRef = useRef();

  useEffect(() => {
    // 1. Connect to signaling server
    socketRef.current = io(import.meta.env.VITE_SOCKET_URL);

    // 2. Get local media
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        setStream(mediaStream);
        if (myVideoRef.current) {
          myVideoRef.current.srcObject = mediaStream;
        }

        // 3. Emit to join room
        socketRef.current.emit('join-room', { roomId });

        // 4. Handle another user joining (send signal)
        socketRef.current.on('user-joined', (userId) => {
          const peer = createPeer(userId, socketRef.current.id, mediaStream);
          peerRef.current = peer;
        });

        // 5. Handle receiving signal
        socketRef.current.on('new-user', (incomingId) => {
          const peer = addPeer(incomingId, mediaStream);
          peerRef.current = peer;
        });

        socketRef.current.on('signal', ({ signal, from }) => {
          peerRef.current.signal(signal);
        });

        socketRef.current.on('user-disconnected', () => {
          setRemoteStream(null);
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = null;
          }
        });
      })
      .catch((err) => {
        console.error('Error accessing camera:', err);
      });

    return () => {
      socketRef.current.disconnect();
      if (peerRef.current) {
        peerRef.current.destroy();
      }
    };
  }, [roomId]);

  const createPeer = (userToSignal, callerId, stream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream
    });

    peer.on('signal', (signal) => {
      socketRef.current.emit('signal', {
        signal,
        to: userToSignal,
        from: callerId
      });
    });

    peer.on('stream', (remoteStream) => {
      setRemoteStream(remoteStream);
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = remoteStream;
      }
    });

    return peer;
  };

  const addPeer = (incomingId, stream) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream
    });

    peer.on('signal', (signal) => {
      socketRef.current.emit('signal', {
        signal,
        to: incomingId,
        from: socketRef.current.id
      });
    });

    peer.on('stream', (remoteStream) => {
      setRemoteStream(remoteStream);
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = remoteStream;
      }
    });

    return peer;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h2 className="text-2xl font-semibold mb-6">Room: {roomId}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-lg font-medium mb-2">Your Video</h3>
          <video ref={myVideoRef} autoPlay muted playsInline className="w-full rounded-lg" />
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-lg font-medium mb-2">Remote Video</h3>
          <video ref={remoteVideoRef} autoPlay playsInline className="w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default VideoRoom;
