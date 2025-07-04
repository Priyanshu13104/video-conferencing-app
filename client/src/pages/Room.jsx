import React from 'react'

function Room () {
  const {roomId} = useParams();
  return (
    <div>
      Room ID = {roomId}
    </div>
  )
}

export default Room;
