// import { useEffect, useState } from "react";
// import "./App.css";
// import searchIcon from "./Search.svg";
// import MovieCard from "./MovieCard";
// import { Link } from "react-router-dom";

// const API_URL = "https://www.omdbapi.com/?apikey=4c691e98";


// function Home() {
//     const [movies, setMovies] = useState([]);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [suggestions, setSuggestions] = useState('')


//     const searchMovie = async (title) => {
//         const response = await fetch(`${API_URL}&s=${title}`);
//         const data = await response.json();
//         setMovies(data.Search);
//     };

//     useEffect(() => {
//         searchMovie("Joker");
//     }, []);

//     const onChangeFunction = (e) => {
//         setSearchTerm(e.target.value)
//         autoSuggestionFetch(e.target.value);
//     }

//     const autoSuggestionFetch = async (searchWord) => {
//         const response = await fetch(`${API_URL}&s=${searchWord}`);
//         const data = await response.json();
//         setSuggestions(data.Search);

//     };


//     return (
//         <div className="app">

//             <h1>MovieLand</h1>
//             <>

//                 <div className="search">
//                     <input
//                         placeholder="Search for movie"
//                         value={searchTerm}
//                         onChange={onChangeFunction}
//                         onKeyDown={e => e.key === `Enter` ? searchMovie(searchTerm) : undefined}
//                     />

//                     <img
//                         src={searchIcon}
//                         alt="search"
//                         onClick={() => searchMovie(searchTerm)}
//                     />
//                     <div className="suggestions"><div className="suggest-child">{suggestions && suggestions.map((sug) =><p><img src={sug.Poster} height="30px" width="30px" /><h6>{sug.Title}</h6></p>)}</div></div>
//                 </div>


//             </>

//             {movies?.length > 0 ? (
//                 <div className="container">
//                     {movies.map((movie) => (
//                         <Link key={movie.imdbID} to={`/${movie.imdbID}`}>
//                             <MovieCard movie={movie} />
//                         </Link>
//                     ))}
//                 </div>
//             ) : (
//                 <div className="empty">
//                     <h2>No Movies Founded</h2>
//                 </div>
//             )}
//         </div>

//     );
// }

// export default Home;

import { useEffect, useState, useRef } from "react";
import "./App.css";
import searchIcon from "./Search.svg";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";

const API_URL = "https://www.omdbapi.com/?apikey=4c691e98";

function Home() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const suggestionsContainerRef = useRef(null);

  const searchMovie = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovie("Joker");
  }, []);

  const onChangeFunction = (e) => {
    setSearchTerm(e.target.value);
    autoSuggestionFetch(e.target.value);
  };

  const autoSuggestionFetch = async (searchWord) => {
    const response = await fetch(`${API_URL}&s=${searchWord}`);
    const data = await response.json();
    setSuggestions(data.Search);
    setSelectedSuggestionIndex(-1); // Reset selected suggestion when suggestions change
  };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       if (selectedSuggestionIndex >= 0) {
//         // User pressed Enter to select a suggestion
//         searchMovie(suggestions[selectedSuggestionIndex].Title);
//         setSelectedSuggestionIndex(-1); // Reset selected suggestion
//       } else {
//         // User pressed Enter without selecting a suggestion
//         searchMovie(searchTerm);
//       }
//     } else if (e.key === "ArrowUp") {
//       e.preventDefault();
//       setSelectedSuggestionIndex((prevIndex) =>
//         prevIndex > 0 ? prevIndex - 1 : prevIndex
//       );
//     } else if (e.key === "ArrowDown") {
//       e.preventDefault();
//       setSelectedSuggestionIndex((prevIndex) =>
//         prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
//       );
//     }
//   };

const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (selectedSuggestionIndex >= 0) {
        // User pressed Enter to select a suggestion
        searchMovie(suggestions[selectedSuggestionIndex].Title);
        setSelectedSuggestionIndex(-1); // Reset selected suggestion
      } else {
        // User pressed Enter without selecting a suggestion
        searchMovie(searchTerm);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedSuggestionIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
      // Scroll the selected suggestion into view
      if (suggestionsContainerRef.current) {
        suggestionsContainerRef.current.children[selectedSuggestionIndex - 1].scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedSuggestionIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
      );
      // Scroll the selected suggestion into view
      if (suggestionsContainerRef.current) {
        suggestionsContainerRef.current.children[selectedSuggestionIndex + 1].scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };
  

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          placeholder="Search for movie"
          value={searchTerm}
          onChange={onChangeFunction}
          onKeyDown={handleKeyDown}
        />
        <img
          src={searchIcon}
          alt="search"
          onClick={() => searchMovie(searchTerm)}
        />
        <div className="suggestions" ref={suggestionsContainerRef} >
          <div className="suggest-child">
            { suggestions && suggestions.map((sug, index) => (
              <Link key={sug.imdbID} to={`/${sug.imdbID}`}>
              <p
                key={sug.imdbID}
                className={selectedSuggestionIndex === index ? "selected" : ""}
              >
                <img src={sug.Poster} height="30px" width="30px" alt={sug.Title} />
                <h6>{sug.Title}</h6>
              </p>
            </Link>
              
            ))}
          </div>
        </div>
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          { movies && movies.map((movie) => (
            <Link key={movie.imdbID} to={`/${movie.imdbID}`}>
              <MovieCard movie={movie} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies Found</h2>
        </div>
      )}
    </div>
  );
}

export default Home;
