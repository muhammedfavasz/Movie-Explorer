import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import searchIcon from "./Search.svg";
import { useNavigate } from "react-router-dom";

const API_URL = "https://www.omdbapi.com/?apikey=4c691e98";

export default function MovieDetails() {
  const [movie, setMovie] = useState('')
  const { movieid } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState("")

  const fetchMovie = async (movieid) => {
    const response = await fetch(`${API_URL}&i=${movieid}`);
    const data = await response.json();
    setMovie(data);
  };



  ///////////////////-------------
  const onChangeFunction = (e) => {
    setSearchTerm(e.target.value)
    // console.log(e.target.value);
    suggestMovieFetch(e.target.value)
  }

  const suggestMovieFetch = async (searchWord) => {
    console.log(searchWord)
    const response = await fetch(`${API_URL}&s=${searchWord}`);
    const data = await response.json();
    setSuggestions(data.Search);
    // console.log(data.Search)
  };



  useEffect(() => {
    fetchMovie(movieid);
  }, [movieid]);

  return (

    <><div className='app'>
      <div className="search">
        <input
          placeholder="Search for movie"
          value={searchTerm}
          onChange={onChangeFunction}
          onKeyDown={e => e.key === `Enter` ? navigate("/searchPage", { state: { searchTerm } }) : undefined}

        />

        <img src={searchIcon} alt="search" onClick={() => navigate("/searchPage", { state: { searchTerm } })} />
        <div className="suggestions"><div className="suggest-child">{suggestions && suggestions.map((sug) =><p><img src={sug.Poster} height="30px" width="30px" /><h6>{sug.Title}</h6></p>)}</div></div>      </div>
    </div>
      {movie && (
        <div>
        </div>
      )}
      {movie === '' && <h1>loading...</h1>}
      <div className='d-flex'>
        <div>
          <img
            src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400'}
            alt={movie.Title} // Correct curly braces around movie1.title
          />
        </div>
        <div className='details-box'>
          <p>{movie.Type}</p>
          <h2>{movie.Title}</h2>
          <p>{movie.Released}</p>
          <p>Genre : {movie.Genre}</p>
          <p>Language : {movie.Language}</p>
          <p>Actors : {movie.Actors}</p>
          <p>Description : {movie.Plot}</p>
        </div>
      </div>
    </>
  )
}
