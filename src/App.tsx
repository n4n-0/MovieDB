import React, { useState, useEffect } from 'react';
import { movieApi, tvApi } from './tmdb';
import './App.css'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useHorizontalScroll } from './useHorizontalScroll';


export default function App() {
  const scrollRef = useHorizontalScroll();
  const [popularMovies, setPopularMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const [data, dataError] = await movieApi.popular();
      setPopularMovies(data);
      setError(dataError);
    };
    fetchData();
    
  }, []);
  
  return (
    <main className="flex flex-col h-screen bg-zinc-950">
      <div className="flex flex-row w-full bg-zinc-950 text-white p-5 justify-between">
        <h1 className="text-3xl font-extrabold">The MovieDB</h1>
        <div className="flex w-full max-w-sm space-x-2">
          <Input className="bg-transparent" type="text" placeholder="search" />
          <Button type="submit">Search</Button>
        </div>
      </div>
      <div className="flex flex-col w-full bg-zinc-950 p-5">
        <h2 className="text-2xl font-extrabold">Popular Movies</h2>
        <div className="flex flex-row w-full space-x-4 overflow-x-scroll hide-scrollbar" ref={scrollRef}>
          {popularMovies.map(movie => (
            <div key={movie.id} className="min-w-max">
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="h-72 w-48 object-cover rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}