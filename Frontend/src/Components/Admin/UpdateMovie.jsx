import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdateMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({
    movieName: "",
    releaseYear: "",
    category: "",
    type: "",
    ratings: "",
    moviePoster: "",
    trailer: "",
    ticketRate: "",
    backgroundImage: "",
    description: "",
  });

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const result = await axios.get(`http://localhost:5000/admin/${id}`);
        setMovie(result.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchMovie();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const updateData = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/admin/update/${id}`, movie);
      alert("Movie updated successfully!");
    } catch (e) {
      console.error("Error updating movie:", e);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-300">
      <div className="w-full h-[600px] ml-72 max-w-4xl bg-white overflow-hidden p-10 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-8">
          Update Movie
        </h2>
        <form method="POST" onSubmit={updateData}>
          <div className="grid grid-cols-3 gap-4">
            {/* Movie Name */}
            <div className="mb-1">
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Movie Name
              </label>
              <input
                className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                type="text"
                name="movieName"
                value={movie.movieName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Movie Release Year */}
            <div className="mb-1">
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Movie Release Year
              </label>
              <input
                className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                type="text"
                name="releaseYear"
                value={movie.releaseYear}
                onChange={handleChange}
                required
              />
            </div>

            {/* Ratings */}
            <div className="mb-1">
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Ratings
              </label>
              <input
                className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                type="text"
                name="ratings"
                value={movie.ratings}
                onChange={handleChange}
                required
              />
            </div>

            {/* Movie Category */}
            <div className="mb-1">
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Select Movie Category
              </label>
              <select
                className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                name="category"
                value={movie.category}
                onChange={handleChange}
                required
              >
                <option value="hollywood">Hollywood</option>
                <option value="bollywood">Bollywood</option>
                <option value="tollywood">Tollywood</option>
              </select>
            </div>

            {/* Movie Type */}
            <div className="mb-1">
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Select Movie Type
              </label>
              <select
                className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                name="type"
                value={movie.type}
                onChange={handleChange}
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

            {/* Movie Poster */}
            <div className="mb-1">
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Movie Poster
              </label>
              <input
                className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                type="text"
                name="moviePoster"
                value={movie.moviePoster}
                onChange={handleChange}
                required
              />
            </div>

            {/* Movie Trailer */}
            <div className="mb-1">
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Movie Trailer
              </label>
              <input
                className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                type="text"
                name="trailer"
                value={movie.trailer}
                onChange={handleChange}
                required
              />
            </div>

            {/* Ticket Rate */}
            <div className="mb-1">
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Ticket Rate
              </label>
              <input
                className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                type="text"
                name="ticketRate"
                value={movie.ticketRate}
                onChange={handleChange}
                required
              />
            </div>

            {/* Background Image */}
            <div className="mb-1">
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Background Image
              </label>
              <input
                className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                type="text"
                name="backgroundImage"
                value={movie.backgroundImage}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Movie Description */}
          <div className="mb-1">
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Movie Description
            </label>
            <textarea
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              name="description"
              rows="3"
              value={movie.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Submit and Clear Buttons */}
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md  focus:outline-none focus:ring-2"
            >
              Update
            </button>
            <button
              type="button"
              className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateMovie;
