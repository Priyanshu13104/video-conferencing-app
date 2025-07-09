function HeroSection() {
  const scrollToRoom = () => {
    const roomSection = document.getElementById('room-controls');
    roomSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="text-center max-w-3xl mx-auto px-4 py-20">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">
        Connect, Collaborate, Communicate
      </h1>
      <p className="text-gray-600 text-lg mb-8">
        Welcome to <strong>VidChat</strong> — a simple, secure, and fast video conferencing platform. 
        Create or join virtual meeting rooms and stay connected with anyone, anywhere.
      </p>

      <button
        onClick={scrollToRoom}
        className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold shadow-md"
      >
        🚀 Get Started
      </button>
    </section>
  );
}

export default HeroSection;
