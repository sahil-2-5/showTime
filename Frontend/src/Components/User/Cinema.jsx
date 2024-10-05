import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Cinema = () => {
  const [movie, setMovie] = useState();
  const { id } = useParams();

  const [selectedDate, setSelectedDate] = useState("Oct 02"); // Default selected date
  const [selectedTime, setSelectedTime] = useState(""); // State to store selected time
  const [selectedTheater, setSelectedTheater] = useState(""); // State to store selected theater

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

  // Dates for user to select
  const dates = ["Oct 02", "Oct 03", "Oct 04", "Oct 05", "Oct 06"];

  // Theater data
  const theaters = [
    {
      name: "Cinemarc: Akota, Vadodara",
      times: ["11:30 AM", "02:20 PM", "07:40 PM", "10:30 PM"],
    },
    {
      name: "Cinepolis: Inorbit Vadodara Mall",
      times: ["10:00 AM", "01:10 PM", "04:20 PM", "07:30 PM"],
    },
    {
      name: "INOX Taksh Galaxy Mall",
      times: ["09:00 AM", "12:15 PM", "03:30 PM", "06:45 PM", "10:00 PM"],
    },
    {
      name: "INOX: Race Course Circle",
      times: ["09:15 AM", "12:30 PM", "03:45 PM", "07:00 PM", "10:15 PM"],
    },
    {
      name: "Movietime: S-Square Mall",
      times: ["10:30 AM", "04:30 PM", "10:30 PM"],
    },
  ];

  // Handle date change
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(""); // Reset selected time when the date changes
    setSelectedTheater(""); // Reset selected theater when the date changes
  };

  // Handle time selection and theater selection
  const handleTimeSelect = (time, theaterName) => {
    setSelectedTime(time);
    setSelectedTheater(theaterName);
  };

  return (
    <div
      className="min-h-screen bg-no-repeat bg-cover relative"
      style={{
        backgroundImage: `url(${movie.backgroundImage})`, // Set the background image dynamically
      }}
    >
      {/* Blurred background overlay */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black bg-opacity-40"></div>

      {/* Movie Title */}
      <div className="relative text-white p-3 py-5 text-center">
        <h1
          className="text-3xl font-bold"
          style={{ textShadow: "2px 2px 0 red" }}
        >
          {movie.movieName}
        </h1>
      </div>

      {/* Date Selector */}
      <div className="relative py-2">
        <div className="max-w-4xl mx-auto ml-[560px] ">
          {dates.map((date) => (
            <button
              key={date}
              onClick={() => handleDateChange(date)}
              className={`px-9 ml-5 py-2 font-bold rounded-md shadow-red-lg ${
                selectedDate === date
                  ? "bg-blue-500 text-white"
                  : "bg-zinc-300 text-zinc-900"
              }`}
            >
              {date}
            </button>
          ))}
        </div>
      </div>

      {/* Movie Poster & Theater List */}
      <div className="relative w-full py-4 px-52 flex gap-10">
        {/* Movie Poster */}
        <div className="w-[315px]">
          <img
            src={movie.moviePoster} // Use movie's poster link
            alt={movie.movieName} // Dynamic alt text
            className="w-[315px] h-[450px] rounded-xl"
          />
        </div>

        {/* Theater List with Showtimes */}
        <div className="w-[800px]">
          {theaters.map((theater, index) => (
            <div
              key={index}
              className="bg-transparent ml-5 p-2 rounded-md mb-5"
            >
              <h2
                className="text-md font-bold text-white tracking-wider"
                style={{ textShadow: "1px 1px 0 red" }}
              >
                {theater.name}
              </h2>
              <div className="flex gap-5 mt-2 flex-wrap">
                {theater.times.map((time, i) => (
                  <button
                    key={i}
                    onClick={() => handleTimeSelect(time, theater.name)}
                    className={`px-6 py-2 font-bold rounded-md shadow-red-lg ${
                      selectedTime === time && selectedTheater === theater.name
                        ? "bg-blue-500 text-white"
                        : "bg-zinc-300 text-zinc-900"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next Button */}
      <div className="relative max-w-6xl -mt-5 mx-auto flex">
        <Link
          to={`/bookseat/${movie._id}`}
          state={{
            selectedDate: selectedDate,
            selectedTheater: selectedTheater,
            selectedTime: selectedTime,
          }}
          className="px-8 py-2 bg-red-600 text-white ml-[1200px] font-bold rounded-md hover:bg-red-700 transition"
        >
          Next
        </Link>
      </div>
    </div>
  );
};

export default Cinema;
