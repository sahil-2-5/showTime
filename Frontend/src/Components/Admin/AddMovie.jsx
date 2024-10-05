import React, { useState } from 'react';
import axios from 'axios' ;

const AddMovie = () => {

  const [movieName, setMovieName] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [ratings, setRatings] = useState(0);
  const [moviePoster, setMoviePoster] = useState('');
  const [trailer, setTrailer] = useState('');
  const [ticketRate, setTicketRate] = useState(0);
  const [backgroundImage, setBackgroundImage] = useState('');
  const [description, setDescription] = useState('');

  const clear = () => {
    setMovieName('');
    setReleaseYear('');
    setCategory('');
    setType('');
    setRatings(0);
    setMoviePoster('');
    setTrailer('');
    setTicketRate(0);
    setBackgroundImage('');
    setDescription('');
  };

  const HandleMovieData = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/admin/addmovie",{
      movieName ,
      releaseYear ,
      category ,
      type ,
      ratings ,
      moviePoster ,
      trailer ,
      ticketRate ,
      backgroundImage ,
      description
    })
    .then( res => {
      if(res.data.status){
        alert("Movie Added Successfully");
        clear();
      }
    })
    .catch( e => {
      console.log(e);
    })
  }

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-300">
      <div className="w-full h-[600px] ml-72 max-w-4xl bg-white overflow-hidden p-10 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-8">Create New Movie</h2>
        <form method="POST" onSubmit={HandleMovieData} encType="multipart/form-data">
          <div className="grid grid-cols-3 gap-4">
            {/* Movie Name */}
            <div className="mb-1">
              <label className="block text-lg font-semibold text-gray-700 mb-2">Movie Name</label>
              <input
                className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                type="text"
                name="moviename"
                value={movieName}
                onChange={ (e)=>setMovieName(e.target.value) }
                required
              />
            </div>

            {/* Movie Release Year */}
            <div className="mb-1">
              <label className="block text-lg font-semibold text-gray-700 mb-2">Movie Release Year</label>
              <input
                className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                type="text"
                name="movieyear"
                value={releaseYear}
                onChange={ (e)=>setReleaseYear(e.target.value) }
                required
              />
            </div>

            {/* Ratings */}
            <div className="mb-1">
              <label className="block text-lg font-semibold text-gray-700 mb-2">Ratings</label>
              <input
                className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                type="text"
                name="movieratings"
                value={ratings}
                onChange={ (e)=>setRatings(e.target.value) }
                required
              />
            </div>

            {/* Movie Category */}
            <div className="mb-1">
              <label className="block text-lg font-semibold text-gray-700 mb-2">Select Movie Category</label>
              <select
                className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                name="movieCat"
                value={category}
                onChange={ (e)=>setCategory(e.target.value) }
                required
              >
                <option value="Select">Select</option>
                <option value="Hollywood">Hollywood</option>
                <option value="Bollywood">Bollywood</option>
                <option value="Tollywood">Tollywood</option>
              </select>
            </div>

            {/* Movie Type */}
            <div className="mb-1">
              <label className="block text-lg font-semibold text-gray-700 mb-2">Select Movie Type</label>
              <select
                className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                name="movieType"
                value={type}
                onChange={ (e)=>setType(e.target.value) }
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
              <label className="block text-lg font-semibold text-gray-700 mb-2">Movie Poster</label>
              <input
                className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                type="text"
                name="poster"
                value={moviePoster}
                onChange={ (e)=>setMoviePoster(e.target.value) }
                required
              />
            </div>

            {/* Movie Trailer */}
            <div className="mb-1">
              <label className="block text-lg font-semibold text-gray-700 mb-2">Movie Trailer</label>
              <input
                className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                type="text"
                name="trailer"
                value={trailer}
                onChange={ (e)=>setTrailer(e.target.value) }
                required
              />
            </div>

            {/* Ticket Rate */}
            <div className="mb-1">
              <label className="block text-lg font-semibold text-gray-700 mb-2">Ticket Rate</label>
              <input
                className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                type="text"
                name="rate"
                value={ticketRate}
                onChange={ (e)=>setTicketRate(e.target.value) }
                required
              />
            </div>

            {/* Background Image */}
            <div className="mb-1">
              <label className="block text-lg font-semibold text-gray-700 mb-2">Background Image</label>
              <input
                className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                type="text"
                name="backgroundImage"
                value={backgroundImage}
                onChange={ (e)=>setBackgroundImage(e.target.value) }
                required
              />
            </div>
          </div>

          {/* Movie Description */}
          <div className="mb-1">
            <label className="block text-lg font-semibold text-gray-700 mb-2">Movie Description</label>
            <textarea
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              name="moviedescription"
              value={description}
              onChange={ (e)=>setDescription(e.target.value) }
              rows="3"
              required
            ></textarea>
          </div>

          {/* Submit and Clear Buttons */}
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Create
            </button>
            <button
              type="button"
              onClick={clear}
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

export default AddMovie;
