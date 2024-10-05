import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

// Pop-up component to ask the user how many people are watching
const PeopleSelector = ({ setNumberOfPeople, setShowPeopleSelector, numberOfPeople }) => {
  const [people, setPeople] = useState(numberOfPeople);

  const handleProceed = () => {
    setNumberOfPeople(people);
    setShowPeopleSelector(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center">
      <div className="bg-zinc-300 shadow-red-lg p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-zinc-500">Select Number of People</h2>
        <input
          type="number"
          min="1"
          max="10"
          value={people}
          onChange={(e) => setPeople(parseInt(e.target.value))}
          className="px-5 font-bold p-2 rounded w-full mb-4 bg-zinc-400 shadow-red-lg text-white"
        />
        <button
          className="bg-zinc-400 shadow-red-lg text-white px-6 py-2 rounded"
          onClick={handleProceed}
        >
          Select
        </button>
      </div>
    </div>
  );
};

const SeatSelection = () => {
  const seatLayout = [
    ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9'],
    ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9'],
    ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9'],
    ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9'],
    ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9'],
  ];

  const location = useLocation();
  const { selectedDate , selectedTheater , selectedTime  } = location.state || {};

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [showPeopleSelector, setShowPeopleSelector] = useState(true);
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();  // Use navigate to programmatically navigate
  const unavailableSeats = ['A3', 'B4', 'C2', 'D5'];

  // Fetch movie data
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

  const handleSeatClick = (seat) => {
    if (unavailableSeats.includes(seat)) return;

    const rowIndex = seat[0]; 
    const seatNumber = parseInt(seat.slice(1)); 

    const row = seatLayout.find((r) => r[0][0] === rowIndex);
    if (!row) return;

    const newSelectedSeats = [];

    for (let i = 0; i < numberOfPeople; i++) {
      const seatToSelect = `${rowIndex}${seatNumber + i}`;
      if (row.includes(seatToSelect) && !unavailableSeats.includes(seatToSelect)) {
        newSelectedSeats.push(seatToSelect);
      } else {
        break;
      }
    }

    setSelectedSeats(newSelectedSeats);
  };

  const totalAmount = numberOfPeople * (movie?.ticketRate || 0); // Fallback if movie data is not loaded

  // Handle payment button click
  const handlePaymentClick = () => {
    navigate(`/payment/${movie._id}`, {
      state: {
        numberOfPeople,
        totalAmount,
      },
    });
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div 
      className="h-screen w-full flex" 
      style={{ backgroundImage: `url(${movie.backgroundImage})`, backgroundSize: 'cover' }}
    >
      <div className="absolute inset-0 bg-black opacity-40 backdrop-blur-lg" />

      <div className="w-full py-4 px-52 flex gap-10 relative">
        <div className="w-[315px]">
          <img
            src={movie.moviePoster}
            alt={movie.movieName}
            className="w-[315px] mt-[130px] h-[450px] rounded-xl"
          />
        </div>
      </div>
      
      <div className="flex flex-col items-center justify-center p-4 mr-[200px] bg-transparent min-h-screen relative z-10">
        <div className="h-20 w-[500px] rounded-t-2xl text-white mb-10 bg-gradient-to-b from-zinc-600 flex justify-center items-center text-2xl font-bold tracking-tight">
          Movie Screen
        </div>

        {showPeopleSelector && (
          <PeopleSelector
            setNumberOfPeople={setNumberOfPeople}
            setShowPeopleSelector={setShowPeopleSelector}
            numberOfPeople={numberOfPeople}
          />
        )}

        <h1 style={{ textShadow: "2px 2px 0 red" }} className="text-2xl font-semibold mb-6 text-white">Select Your Seats</h1>
        <div className="grid gap-4">
          {seatLayout.map((row, rowIndex) => (
            <div key={rowIndex} className="flex space-x-4">
              {row.map((seat) => (
                <button
                  key={seat}
                  className={`w-12 h-12 border rounded-lg ${
                    unavailableSeats.includes(seat)
                      ? 'bg-red-600 cursor-not-allowed text-white font-bold shadow-red-lg'
                      : selectedSeats.includes(seat)
                      ? 'bg-blue-500 text-white font-bold shadow-red-lg'
                      : 'bg-zinc-300 hover:bg-green-500 text-zinc-800 font-bold shadow-red-lg'
                  }`}
                  onClick={() => handleSeatClick(seat)}
                  disabled={unavailableSeats.includes(seat)}
                >
                  {seat}
                </button>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <h2 style={{ textShadow: "2px 2px 0 red" }} className="text-lg font-medium text-white">Selected Seats:</h2>
          {selectedSeats.length > 0 ? (
            <div className="flex space-x-2 mt-2">
              {selectedSeats.map((seat) => (
                <button
                  key={seat}
                  className="w-12 h-12 bg-zinc-300 text-zinc-800 font-bold rounded-lg shadow-red-lg"
                >
                  {seat}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-base text-gray-500 mt-2">No seats selected</p>
          )}
        </div>

        <div className="mt-6 text-center">
          <h2 style={{ textShadow: "2px 2px 0 red" }} className="text-lg font-medium text-white">Total Amount:</h2>
          <p className="text-2xl text-white">{`${totalAmount} /-`}</p>
        </div>

        <div className="absolute bottom-10 right-10 font-bold">
        <Link 
          onClick={handlePaymentClick}
            to={`/payment/${movie._id}`}
            state={{
              numberOfPeople: numberOfPeople,
              totalAmount: numberOfPeople * movie.ticketRate ,
              selectedDate : selectedDate ,
              selectedTheater : selectedTheater ,
              selectedTime : selectedTime ,
          }} 
          className="bg-green-600 text-white px-6 py-2 rounded-lg shadow-lg transition duration-300">
            Payment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;


       