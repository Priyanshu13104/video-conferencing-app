import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import RoomControls from '../components/RoomControls';

function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 flex flex-col items-center pt-12 px-4">
        <HeroSection />
        <RoomControls />
      </main>
    </>
  );
}

export default Home;
