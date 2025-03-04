import Head from "next/head";
import Link from "next/link";
import useFetchData from "@/hooks/useFetchData";
import Spinner from "@/components/Spinner";
import React, { useState, useEffect } from 'react';

export default function All() {
  // Fetch data with custom hook
  const { alldata, loading } = useFetchData("/api/getmovies");

  // Filter for published movies
  const publishedData = (alldata || []).filter((ab) => ab.status === "publish");
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
      <Head>
        <title>All Animes & Series</title>
      </Head>

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

        /* Align h5 and span in the same row */
        .contents {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 5px;
        }

        .contents h5 {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          font-weight: 400;
          font-size: 15px;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        .contents h5 span {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.6);
          font-weight: lighter;
          margin-left: 10px;
          white-space: nowrap;
        }

        .contents h6 {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 13px;
          padding: 2px 0;
          width: 100%;
        }

        .contents h6 span {
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

      <section className="genrenamesec10">
        <div className="logo3">
          
          <p>All Content</p>
        </div>
      </section>

      <section className="genremoviesec10">
        <div className="genremovie10">
          {loading ? (
            <Spinner />
          ) : (
            <>
              {publishedData.map((movie) => (
                <div className="mcard10" key={movie.slug}>
                  <Link href={`/movies/${movie.slug}`}>
                    <div className="cardimg10">
                      <img src={movie.smposter} alt={movie.title} loading="lazy" />
                    </div>
                    <div className="contents">
                      <h5>
                        {movie.title}
                        <span>{movie.type}</span>
                      </h5>

                    </div>
                  </Link>
                </div>
              ))}
            </>
          )}
        </div>
      </section>
    </>
  );
}
