import { useEffect, useState } from "react";
import "./App.css";
import searchIcon from "./Search.svg";
import MovieCard from "./MovieCard";
import { Link, useLocation } from "react-router-dom";

const API_URL = "https://www.omdbapi.com/?apikey=4c691e98";


function SearchPage() {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState("")
    const location = useLocation()
    console.log(location)

    const searchMovie = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    };

    useEffect(() => {
        searchMovie(location.state.searchTerm);
    }, []);

    const onChangeFunction = (e) => {
        setSearchTerm(e.target.value)
        suggestMovieFetch(e.target.value)
      }

    const suggestMovieFetch = async (searchWord) => {
        console.log(searchWord)
        const response = await fetch(`${API_URL}&s=${searchWord}`);
        const data = await response.json();
        setSuggestions(data.Search);

      };


    return (
        <div className="app">

            <h1>MovieLand</h1>
            <div className="search">
                <input
                    placeholder="Search for movie"
                    value={searchTerm}
                    onChange={onChangeFunction}
                    onKeyDown={e => e.key === `Enter` ?  searchMovie(searchTerm) : undefined}
                />

                <img src={searchIcon} alt="search" onClick={() => searchMovie(searchTerm)} />

                <div className="suggestions"><div className="suggest-child">{suggestions && suggestions.map((sug) =><p><img src={sug.Poster} height="30px" width="30px" /><h6>{sug.Title}</h6></p>)}</div></div>

            </div>

            {movies?.length > 0 ? (
                <div className="container">
                    {movies.map((movie) => (
                        <Link key={movie.imdbID} to={`/${movie.imdbID}`}>
                            <MovieCard movie={movie} />
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="empty">
                    <h2>No Movies Founded</h2>
                </div>
            )}
        </div>

    );
}

export default SearchPage;