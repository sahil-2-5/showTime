import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { MdOutlinePlayCircleOutline } from "react-icons/md";

const MoviePage = () => {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();

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

  if (!movie) {
    return <div>Loading...</div>;
  }

  // Dynamically setting the background image using inline styles
  const backgroundStyle = {
    backgroundImage: `url(${movie.backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div
      className="relative text-white min-h-screen flex items-center justify-center"
      style={backgroundStyle} // Applying the dynamic background
    >
      {/* Overlay to create darkened effect over the background */}
      <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"></div>

      <div className="relative max-w-6xl text-white tracking-wide mx-auto p-5 flex items-center gap-8 z-10">
        <div className="relative">
          <img
            className="w-[300px] h-[450px] rounded-xl shadow-lg"
            src={`${movie.moviePoster}`} // Movie poster
            alt={movie.movieName} // Dynamic movie title
          />
        </div>

        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">{movie.movieName}</h1>

          <div className="flex items-center space-x-3 mb-2">
            <span className="text-red-500">★ {movie.ratings}</span>
            <span>{movie.releaseYear}</span>
          </div>

          <p className="mb-6">{movie.description}</p>

          <div className="flex items-center space-x-4">
            <Link
              to={`/cinema/${movie._id}`}
              className="bg-red-600 px-6 py-2 rounded-lg shadow hover:bg-red-700 transition"
            >
              Book Now
            </Link>
            <a
              href={`${movie.trailer}`}
              className="flex items-center justify-center bg-red-600 px-4 py-2 gap-2 rounded-lg shadow hover:bg-red-700 transition"
            >
              <MdOutlinePlayCircleOutline size="1.5em" /> Watch Trailer
            </a>
            <Link
              to="/category"
              className="bg-gray-600 px-6 py-2 rounded-lg shadow hover:bg-gray-700 transition"
            >
              Show More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
