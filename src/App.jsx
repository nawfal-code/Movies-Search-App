import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchPage from "./pages/SearchPage";
import FavouritesPage from "./pages/FavouritesPage"
import MovieDetails from "./pages/MovieDetails";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-black text-white">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/favorites" element={<FavouritesPage />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
