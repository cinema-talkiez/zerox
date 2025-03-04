import useFectchData from "@/hooks/useFetchData";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/swiper-bundle.css";
import React, { useState } from 'react';

import Loader from "@/components/Loader";
import Link from "next/link";
import { useEffect } from "react";

export default function Action() {
  const { alldata, loading } = useFectchData("/api/getmovies");
  const [updatedData, setUpdatedData] = useState([]);

  // Filter for published movies
  const publishedData = alldata?.filter((ab) => ab.status === "publish");

  useEffect(() => {
    if (!loading) {
      const sortedData = publishedData.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );
      setUpdatedData(sortedData);
    }
  }, [alldata, loading]);


  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (you can remove setTimeout if fetching data)
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust time as needed
  }, []);
  
  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="spinner">        <div className="circle c1"></div>
        <div className="circle c2"></div>
        <div className="circle c3"></div>
        <div className="circle c4"></div></div> {/* Spinner Animation */}
      </div>
    );
  }
  return (
    <>
      <style jsx>{`
        .genrenamesec10 {
          text-align: center;
          color: white;
        }

        .genremoviesec10 {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          padding: 20px;
          margin-top: -10px;
        }

        .genremovie10 {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 15px;
        }

        .mcard10 {
          width: 100%;
          max-width: 180px;
          border-radius: 3px;
          overflow: hidden;
          transition: transform 0.3s;
        }

        .mcard10 a {
          text-decoration: none;
          color: white;
          display: block;
        }

        .cardimg10 img {
  width: 100%;
  height: 200px; /* Set a fixed height */
  object-fit: cover; 
        }

        .contents {
          display: flex;
          flex-direction: column;
          padding: 5px;
        }

        /* Ensures title and language/type appear in the same row */
        .title-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .title-container h5 {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          font-weight: 400;
          font-size: 15px;
          color: #fff;
          flex-grow: 1; /* Ensures title takes up available space */
        }

        .title-container h6 {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 13px;
        }

        .title-container h6 span {
          color: rgba(255, 255, 255, 0.6);
          font-weight: lighter;
        }

        /* Two cards per row on mobile */
        @media (max-width: 600px) {
          .genremovie10 {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
          }

          .mcard10 {
            max-width: 100%;
          }
        }
      `}</style>

      <h1 className="logo3">Drama</h1>
      <section className="genremoviesec10">
        <div className="genremovie10">
          {loading ? (
            <Loader />
          ) : (
            publishedData
              .filter((movie) => movie.genre.includes("drama")) // Filter action movies
              .map((movie) => (
                <div key={movie.slug} className="mcard10">
                  <Link href={`/movies/${movie.slug}`}>
                    <div className="cardimg10">
                      <img
                        src={movie.smposter}
                        alt={movie.title}
                        loading="lazy"
                      />
                    </div>
                    <div className="contents">
                      <div className="title-container">
                        <h5>{movie.title}</h5>
                        <h6>

                          <span>{movie.type}</span>
                        </h6>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
          )}
        </div>
      </section>
    </>
  );
}
