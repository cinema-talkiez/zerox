import Link from "next/link";
import { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import useFetchData from "@/hooks/useFetchData";
import React, { useState } from 'react';

export default function SearchPage() {
  const [movieshortname, setMovieshortname] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [error, setError] = useState(null);

  const { alldata, loading } = useFetchData(`/api/getmovies`);
  const publishedData = alldata.filter((ab) => ab.status === "publish");

  useEffect(() => {
    if (!movieshortname.trim()) {
      setSearchResult([]);
      return;
    }

    const filteredMovies = publishedData.filter((movie) =>
      movie.title.toLowerCase().includes(movieshortname.toLowerCase())
    );

    setSearchResult(filteredMovies);
  }, [movieshortname]);

  const handleMovieClick = () => {
    setMovieshortname("");
  };

  return (
    <div className="search-page">
      

      <div className="search-bar-container">
        <form className="search-bar">
          <input
            type="text"
            placeholder="Search here..."
            value={movieshortname}
            onChange={(e) => setMovieshortname(e.target.value)}
          />
          <div className="search-clear" onClick={() => setMovieshortname("")}>
            <IoClose />
          </div>
        </form>
      </div>

      <div className="search-results">
        {movieshortname && (
          <>
            {loading ? (
              <p>Loading...</p>
            ) : searchResult.length > 0 ? (
              searchResult.slice(0, 20).map((movie) => (
                <Link
                  onClick={handleMovieClick}
                  key={movie._id}
                  href={`/movies/${movie.slug}`}
                >
                  <div className="moviesearchlist">
                    <div>
                      <img
                        src={movie.smposter}
                        width={80}
                        height={110}
                        alt={movie.title}
                      />
                    </div>
                    <div className="searchbarinfo">
                      <h5>{movie.title}</h5>
                      <h4>
                        Rating: <FaStar />
                        <span>{movie.rating}</span>
                      </h4>
                      <h4>Release Year: {movie.year}</h4>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p>No Movie Found</p>
            )}
          </>
        )}
      </div>
    </div>
  );
                                            }
                
