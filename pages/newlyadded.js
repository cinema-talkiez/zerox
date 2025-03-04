import Link from "next/link";
import useFetchData from "@/hooks/useFetchData";
import Spinner from "@/components/Spinner";
import Head from "next/head";
import { FaEye, FaHeart, FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
export default function RecentlyAdded() {
  const { alldata, loading } = useFetchData("/api/getmovies");

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
        <title>Newly Arrived| Discover New Content</title>
        <meta name="description" content="Discover all the latest movies added recently." />
      </Head>

      <section className="genrenamesec">
        <div className="genrename">
          <h1>Newly Arrived</h1>
          <p>
            Explore the latest additions to our catalog. Discover Animes, Series and more!
          </p>
        </div>
      </section>

      <section className="genremoviesec">
        <div className="genremovie">
          {loading ? (
            <Spinner />
          ) : (
            (alldata || [])
              .filter((movie) => movie.status === "publish") // Show only published movies
              .map((movie) => (
                <div className="mcard" key={movie.slug}>
                  <Link href={`/movies/${movie.slug}`}>
                    <div className="cardimg">
                      <img src={movie.smposter} alt={movie.title} loading="lazy" />
                    </div>
                    <div className="contents">
                      <h5>{movie.title}</h5>
                      <h6>
                        <span>{movie.year}</span>
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
                          <h6>{movie.rating}</h6>
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
