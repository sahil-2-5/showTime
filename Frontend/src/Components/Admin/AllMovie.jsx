import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllMovie = () => {

  const [ movie , setMovie ] = useState([]);

  useEffect( ()=> {
    axios.get("http://localhost:5000/admin/movie")
    .then((m) => setMovie(m.data) )
    .catch( (e) => console.log(e));
  },[]);

  const deleteMovie = async ( movieID ) => {
    try {
      await axios.delete(`http://localhost:5000/admin/delete/${movieID}`);
    }catch(e){
      console.error("Error deleting movie:", e);
    }
  }

  return (
    <>
    <div className="bg-zinc-800 text-white min-h-screen w-full h-auto">
      <p className="ml-72 text-4xl font-bold tracking-wide p-5">All Movies</p>
      <div className="w-[1200px] ml-72 h-auto py-10 flex justify-center flex-wrap gap-5">
      {movie.map((movie) => {
          return (
            <div key={movie._id}>
              <div className="h-68 w-52 overflow-hidden">
                <img src={movie.moviePoster} />
              </div>
              <div className="h-10 w-46 mt-2 font-semibold flex justify-between">
                <Link to={`/adminPanel/updateMovie/${movie._id}`} className="px-3 bg-green-600 rounded-sm flex items-center">
                  Update
                </Link>
                <button
                  onClick={() => deleteMovie(movie._id)}
                  className="px-3 bg-red-600 rounded-sm flex items-center"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </>
  );
};

export default AllMovie;
