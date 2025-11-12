import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  const removeFavorite = (id) => {
    const updated = favorites.filter((fav) => fav.imdbID !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-gray-900 text-white p-8 pt-20">
      <h1 className="text-4xl font-extrabold text-center mb-10 tracking-wider">
        🎥 Your Favorite Movies
      </h1>

      {favorites.length === 0 ? (
        <div className="text-center mt-24 text-gray-400 text-lg">
          You don’t have any favorites yet.
          <div className="mt-6">
            <Link
              to="/"
              className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition"
            >
              ⬅ Back to Search
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {favorites.map((movie) => (
              <div
                key={movie.imdbID}
                className="relative bg-gray-800/70 backdrop-blur-md rounded-xl overflow-hidden shadow-lg hover:shadow-yellow-500/30 hover:scale-[1.04] transform transition duration-300"
              >
                {/* Remove Button */}
                <button
                  onClick={() => removeFavorite(movie.imdbID)}
                  className="absolute top-2 right-2 text-sm bg-red-600/80 hover:bg-red-700 text-white px-2 py-1 rounded-full transition"
                >
                  ✖
                </button>

                <Link to={`/movie/${movie.imdbID}`}>
                  <img
                    src={
                      movie.Poster !== "N/A"
                        ? movie.Poster
                        : "https://via.placeholder.com/300x450?text=No+Image"
                    }
                    alt={movie.Title}
                    className="w-full h-72 object-cover"
                  />
                  <div className="p-3 text-center">
                    <h2 className="font-semibold text-lg truncate">
                      {movie.Title}
                    </h2>
                    <p className="text-gray-400 text-sm">{movie.Year}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Link
              to="/"
              className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition font-semibold"
            >
              ⬅ Back to Search
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default FavoritesPage;
