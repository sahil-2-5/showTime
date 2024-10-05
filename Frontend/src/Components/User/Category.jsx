import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Main MovieCategory Component
const MovieCategory = () => {
  const [movie, setMovie] = useState([]);
  const [movieType, setMovieType] = useState("");
  const [movieCat, setMovieCat] = useState("");
  const [noMovies, setNoMovies] = useState(false); // State to track if no movies found

  useEffect(() => {
    // Fetch all movies initially
    axios
      .get("http://localhost:5000/admin/movie")
      .then((m) => {
        setMovie(m.data);
        setNoMovies(false); // Reset noMovies state when data is fetched
      })
      .catch((e) => console.log(e));
  }, []);

  const HandleSearch = (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:5000/user/search?type=${movieType}&category=${movieCat}`)
      .then((m) => {
        setMovie(m.data);
        setNoMovies(m.data.length === 0); // Check if no movies are found
      })
      .catch((e) => {
        console.log(e);
        setNoMovies(true); // In case of an error, assume no movies are found
      });
  };

  return (
    <>
      <div className="w-full min-h-screen h-auto flex flex-col bg-zinc-800">
        <div className="h-3 w-full mt-10">
          <form onSubmit={HandleSearch} className="flex justify-around ">
            <div className="mb-1">
              <label
                className="block text-2xl font-semibold text-white mb-2"
                style={{ textShadow: "2px 2px 0 red" }}
              >
                Select Movie Type
              </label>
              <select
                className="w-72 mt-5 px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                name="movieType"
                value={movieType}
                onChange={(e) => setMovieType(e.target.value)}
                required
              >
                <option value="Select">Select</option>
                <option value="Action">Action</option>
                <option value="Drama">Drama</option>
                <option value="Comedy">Comedy</option>
                <option value="Horror">Horror</option>
                <option value="Romance">Romance</option>
                <option value="Sci-Fi">Sci-Fi</option>
              </select>
            </div>
            <div className="mb-1">
              <label
                className="block text-2xl font-semibold text-white mb-2"
                style={{ textShadow: "2px 2px 0 red" }}
              >
                Select Movie Category
              </label>
              <select
                className="w-72 mt-5 px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                name="movieCat"
                value={movieCat}
                onChange={(e) => setMovieCat(e.target.value)}
                required
              >
                <option value="Select">Select</option>
                <option value="Hollywood">Hollywood</option>
                <option value="Bollywood">Bollywood</option>
                <option value="Tollywood">Tollywood</option>
              </select>
            </div>
            <button
              type="submit"
              className="px-6 py-2 h-10 mt-16 bg-blue-500 text-white font-semibold rounded-lg shadow-md"
            >
              Search
            </button>
          </form>
        </div>

        {/* Movie Display Section */}
        <div className="flex flex-wrap p-10 mt-24 rounded-lg w-full gap-5 justify-center">
          {noMovies ? (
            // Display message if no movies are found
            <h1 className="text-white text-3xl font-semibold">No movies available</h1>
          ) : (
            // Display movies if available
            movie.map((movie) => (
              <Link to={`/moviepage/${movie._id}`} key={movie._id}>
                <div className="h-68 w-52 overflow-hidden">
                  <img src={movie.moviePoster} alt={movie.movieName} />
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default MovieCategory;
