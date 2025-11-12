import React, { useEffect, useState } from "react";
import { searchMovies } from "../services/omdbService";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("batman");
  const [input, setInput] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load favorites from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  const saveFavorites = (items) => {
    setFavorites(items);
    localStorage.setItem("favorites", JSON.stringify(items));
  };

  const toggleFavorite = (e, movie) => {
    e.preventDefault();
    e.stopPropagation();

    const exists = favorites.some((fav) => fav.imdbID === movie.imdbID);
    const updated = exists
      ? favorites.filter((fav) => fav.imdbID !== movie.imdbID)
      : [...favorites, movie];
    saveFavorites(updated);
  };

  const isFavorite = (id) => favorites.some((fav) => fav.imdbID === id);

  const fetchMovies = async (term, pageNumber = 1, type = "") => {
    if (!term) {
      setMovies([]);
      setError("");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await searchMovies(term, pageNumber, type);
      setMovies(data.Search || []);
      if (!data.Search || data.Search.length === 0) {
        setError("No movies found. Try another search!");
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Try again.");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setPage(1);
    setSearch(trimmed);
    fetchMovies(trimmed, 1, selectedType);
  };

  useEffect(() => {
    if (!search) return;
    fetchMovies(search, page, selectedType);
  }, [page, selectedType]);

  useEffect(() => {
    fetchMovies(search, page, selectedType);
  }, []);

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => p + 1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-900 text-white pt-20 px-6 py-8">
      {/* 🔍 Search Controls */}
      <div className="flex flex-wrap justify-center items-center gap-3 mb-10">
        <input
          type="text"
          placeholder="Search for movies..."
          onChange={(e) => setInput(e.target.value)}
          value={input}
          className="rounded-l-full px-5 py-3 w-72 sm:w-96 bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-600 placeholder-gray-500"
        />
        <button
          onClick={handleSearch}
          className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-r-full font-semibold transition-all duration-200 shadow-md"
        >
          Search
        </button>

        <select
          value={selectedType}
          onChange={(e) => {
            setSelectedType(e.target.value);
            setPage(1);
          }}
          className="ml-2 rounded-full px-4 py-3 bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-600"
        >
          <option value="">All</option>
          <option value="movie">Movies</option>
          <option value="series">Series</option>
          <option value="episode">Episodes</option>
        </select>

        <Link
          to="/favorites"
          className="ml-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-full transition-all duration-200 flex items-center gap-1 shadow-md"
        >
          ⭐ Favorites ({favorites.length})
        </Link>
      </div>

      {/* 🌀 Loading */}
      {loading && (
        <div className="flex justify-center items-center py-32">
          <div className="w-14 h-14 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* ⚠️ Error Message */}
      {!loading && error && (
        <p className="text-red-400 text-center text-lg mt-6">{error}</p>
      )}

      {/* 🎞️ Movie Grid */}
      {!loading && movies.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-4">
          {movies.map((movie) => (
            <Link
              key={movie.imdbID}
              to={`/movie/${movie.imdbID}`}
              className="relative group bg-gray-900/60 rounded-xl overflow-hidden shadow-lg hover:shadow-red-500/30 hover:scale-[1.04] transform transition-all duration-300"
            >
              <button
                onClick={(e) => toggleFavorite(e, movie)}
                className={`absolute top-2 right-2 text-2xl transform transition-all duration-300 z-10 ${
                  isFavorite(movie.imdbID)
                    ? "text-yellow-400 scale-110 drop-shadow-lg"
                    : "text-gray-400 hover:text-yellow-300 hover:scale-110"
                }`}
              >
                {isFavorite(movie.imdbID) ? "★" : "☆"}
              </button>

              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={movie.Title}
                className="w-full h-72 object-cover group-hover:opacity-70 transition-all duration-300"
              />
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/70 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <h2 className="font-semibold text-lg truncate">
                  {movie.Title}
                </h2>
                <p className="text-gray-300 text-sm">{movie.Year}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* 📄 Pagination */}
      {!loading && movies.length > 0 && (
        <div className="flex items-center justify-center gap-8 mt-12">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className={`px-6 py-2 rounded-full border border-gray-700 ${
              page === 1
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-gray-800 hover:border-red-500 transition"
            }`}
          >
            ⬅ Prev
          </button>
          <span className="text-lg font-semibold tracking-wide">
            Page {page}
          </span>
          <button
            onClick={handleNext}
            className="px-6 py-2 rounded-full border border-gray-700 hover:bg-gray-800 hover:border-red-500 transition"
          >
            Next ➡
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
