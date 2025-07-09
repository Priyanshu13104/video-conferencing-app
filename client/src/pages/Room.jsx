import Navbar from '../components/Navbar';
import React from 'react'

function Room () {
  const {roomId} = useParams();
  return (
    <>
    <Navbar />
    <div>
      Room ID = {roomId}
    </div>
    </>
  )
}

export default Room;
