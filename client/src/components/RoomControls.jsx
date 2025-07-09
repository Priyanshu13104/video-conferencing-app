import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RoomControls() {
    const [roomId, setRoomId] = useState('');
    const navigate = useNavigate();

    const createRoom = () => {
        const generateShortId = () => {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let id = '';
            for (let i = 0; i < 6; i++) {
                id += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return id;
        };
        const newRoomId = generateShortId();
        navigate(`/room/${newRoomId}`);
    };

    const joinRoom = (e) => {
        e.preventDefault();
        if (!/^[\w-]{6,}$/.test(roomId)) {
            alert("Please enter a valid room ID (at least 6 characters)");
            return;
        }
        if (roomId.trim()) {
            navigate(`/room/${roomId}`);
        }
    };

    return (
        <section
            id='room-controls'
            className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md mx-auto mb-16">
            <div className="flex flex-col gap-6">
                <button
                    onClick={createRoom}
                    className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
                >
                    ➕ Create New Room
                </button>

                <form onSubmit={joinRoom} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Enter Room ID"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition"
                    >
                        🔗 Join Room
                    </button>
                </form>
            </div>
        </section>
    );
}

export default RoomControls;
