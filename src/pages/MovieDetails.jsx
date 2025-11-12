import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails } from "../services/omdbService";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    getMovieDetails(id)
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching movie details:", err.message);
        setError("Failed to load movie details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    // 🎨 Skeleton Loader
    return (
      <div className="min-h-screen bg-gray-50 p-6 animate-pulse">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10 flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 h-[450px] bg-gray-200 rounded-xl"></div>
          <div className="flex-1 space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-8 bg-gray-200 rounded w-32 mt-8"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500 text-lg">
        {error}
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500 text-lg">
        Movie not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10 flex flex-col md:flex-row gap-8">
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={movie.Title}
          className="w-full md:w-1/3 h-auto rounded-xl shadow"
        />

        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {movie.Title}
          </h1>
          <p className="text-gray-600 mb-4 italic">
            {movie.Year} • {movie.Runtime} • {movie.Rated}
          </p>

          <div className="mb-4">
            <span className="font-semibold text-gray-700">Genre:</span>{" "}
            {movie.Genre}
          </div>
          <div className="mb-4">
            <span className="font-semibold text-gray-700">Director:</span>{" "}
            {movie.Director}
          </div>
          <div className="mb-4">
            <span className="font-semibold text-gray-700">Actors:</span>{" "}
            {movie.Actors}
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            {movie.Plot !== "N/A" ? movie.Plot : "No plot available."}
          </p>

          <div className="flex flex-wrap gap-4 mt-4">
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-md text-sm font-medium">
              IMDb: ⭐ {movie.imdbRating}
            </span>
            {movie.BoxOffice && (
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-md text-sm font-medium">
                Box Office: {movie.BoxOffice}
              </span>
            )}
          </div>

          <div className="mt-8">
            <Link
              to="/"
              className="inline-block bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
            >
              ⬅ Back to Search
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
