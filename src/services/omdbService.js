
const API_KEY = "c6bee092";
const BASE_URL = "https://www.omdbapi.com/";

export const searchMovies = async (term, page = 1, type = "") => {
  try {
    const url = `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(
      term
    )}&page=${page}${type ? `&type=${type}` : ""}`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.Response === "False") {
      throw new Error(data.Error || "No movies found.");
    }

    return data;
  } catch (err) {
    console.error("Error fetching movies:", err);
    throw err;
  }
};

export const getMovieDetails = async (id) => {
  try {
    const url = `${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.Response === "False") {
      throw new Error(data.Error || "Unable to fetch movie details.");
    }

    return data;
  } catch (err) {
    console.error("Error fetching movie details:", err);
    throw err;
  }
};

