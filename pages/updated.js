import Link from "next/link";
import useFetchData from "@/hooks/useFetchData";
import Spinner from "@/components/Spinner";
import Head from "next/head";
import { useEffect } from "react";
import { FaEye, FaHeart, FaStar } from "react-icons/fa";
import React, { useState } from 'react';

export default function Updated() {
  const { alldata, loading } = useFetchData("/api/getmovies");
  const [updatedData, setUpdatedData] = useState([]);

  // Handle data fetching and sort by updatedAt field
  useEffect(() => {
    if (!loading) {
      // Filter only published films (you can modify this filter if needed)
      const publishedData = (alldata || []).filter((ab) => ab.status === "publish");

      // Sort the data by updatedAt in descending order
      const sortedData = publishedData.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );

      // Set the sorted data
      setUpdatedData(sortedData);
    }
  }, [alldata, loading]);

  return (
    <>
      <Head>
        <title>Updated Animes | Updated Content</title>
        <meta name="description" content="All the Updated Films and Content" />
      </Head>

      <section className="genrenamesec">
        <div className="genrename">
          <h1>Updated content</h1>
          <p>
            Explore the world of Updated content. Discover all the latest changes, 
            additions, and updates to your favorite Animes && Series!
          </p>
        </div>
      </section>

      <section className="genremoviesec">
        <div className="genremovie">
          {loading ? (
            <Spinner />
          ) : (
            updatedData.map((film, index) => (
              <div className="mcard" key={`${film.slug}-${index}`}>
                <Link href={`/movies/${film.slug}`}>
                  <div className="cardimg">
                    <img src={film.smposter} alt={film.title} loading="lazy" />
                  </div>
                  <div className="contents">
                    <h5>{film.title}</h5>
                    <h6>
                      <span>{film.year}</span>
                      <div className="rate">
                        <i className="cardfas">
                          <FaHeart />
                        </i>
                        <i className="cardfas">
                          <FaEye />
                        </i>
                        <i className="cardfas">
                          <FaStar />
                        </i>
                        <h6>{film.rating}</h6>
                      </div>
                    </h6>
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
