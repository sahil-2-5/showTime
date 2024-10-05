import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

const Ticket = () => {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();

  const location = useLocation();
  const { numberOfPeople, totalAmount, Date, Theater, Time } =
    location.state || {};

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

  return (
    <>
      <div className="w-full h-screen backdrop-blur-2xl fixed overflow-hidden bg-[url('https://i.pinimg.com/564x/14/f8/55/14f855a78a4268a06ed94443f0a7da15.jpg')] bg-no-repeat bg-cover bg-center">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>{" "}
        {/* Adds a dark overlay for better readability */}
        <div className="relative z-10 flex justify-center items-center h-full">
          <div className="flex bg-white bg-opacity-10 backdrop-blur-lg w-9/12 rounded-xl p-5">
            {/* Movie Poster */}
            <div className="relative p-5">
              <img
                className="w-[300px] h-[450px] rounded-xl shadow-lg"
                src={`${movie.moviePoster}`} // Movie poster
                alt={movie.movieName} // Dynamic movie title
              />
            </div>

            {/* Ticket Information */}
            <div className="p-5 w-[600px] text-white">
              <div className="p-5">
                <p
                  className="text-5xl font-bold"
                  style={{ textShadow: "2px 2px 0 red" }}
                >
                  ShowTime
                </p>
              </div>
              <div className=" text-2xl w-full tracking-wider ">
                <div className="text-center w-full border-b p-1 ml-10 mt-5">
                  <p>{Date}</p>
                </div>
                <div className="ml-5 p-5">
                  <table>
                    <tr>
                      <td>Movie Name </td>
                      <td>: {movie.movieName}</td>
                    </tr>
                    <tr>
                      <td>Total Seats </td>
                      <td>: {numberOfPeople}</td>
                    </tr>
                    <tr>
                      <td>Ticket Price </td>
                      <td>: {movie.ticketRate}</td>
                    </tr>
                  </table>
                </div>
              </div>

              {/* Go To Home Button */}
              <div className="mt-5 absolute -right-40 -bottom-20 flex justify-center">
                <Link
                  to="/"
                  className="bg-zinc-300 text-zinc-900 px-6 py-2 font-bold rounded-xl shadow-red-lg transition duration-300"
                >
                  Go To Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ticket;
