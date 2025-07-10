import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import VideoRoom from '../components/Videoroom.jsx';

function Room() {
  const { roomId } = useParams();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-6">Room ID: {roomId}</h1>
        <VideoRoom roomId={roomId} />
      </div>
    </>
  );
}

export default Room;
