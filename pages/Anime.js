import Link from "next/link";
import useFetchData from "@/hooks/useFetchData";
import Spinner from "@/components/Spinner";
import Head from "next/head";
import React, { useState } from 'react';
import { useEffect } from "react";
import { FaEye, FaHeart, FaStar } from "react-icons/fa";

export default function Anime() {
  // Fetch data with custom hook
  const { alldata, loading } = useFetchData("/api/getmovies");

  // Filter for published anime
  const publishedData = (alldata || []).filter((ab) => ab.status === "publish");

  // Filter and sort data specifically for anime
  const animeData = publishedData
    .filter((ab) => ab.titlecategory === "anime")
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)); // Sort by updatedAt in descending order


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
        <title>ALL Animes</title>
        <meta name="description" content="All the Anime in Telugu" />
      </Head>

      <section className="genrenamesec">
        <div className="logo1">
          <p>Animes will be Added Soon</p>
        </div>
      </section>


    </>
  );
}
