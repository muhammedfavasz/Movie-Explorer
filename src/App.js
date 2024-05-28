import React from 'react'
import Home from './Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieDetails from './MovieDetails';
import SearchPage from './SearchPage';


export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:movieid' element={<MovieDetails />} />
          <Route path='/searchPage' element={<SearchPage />} />
          
        </Routes>
      </BrowserRouter>



    </div>
  )
}
