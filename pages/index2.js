
import WelcomeAnimation from "@/components/WelcomeAnimation";
import useFectchData from "@/hooks/useFetchData";
import Head from "next/head";
import { FaTelegramPlane } from "react-icons/fa";
import React, { useState } from 'react';

import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import "swiper/css/autoplay";
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "swiper/swiper-bundle.css";

import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import Loader from "@/components/Loader";
import Link from "next/link";
import { FaAngleDoubleUp, FaCheck, FaDownload, FaEye, FaFilm, FaHeart, FaPhotoVideo, FaPlus, FaStar } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { FaClapperboard } from "react-icons/fa6";
import genres from "./genre/[genre]";
import category from "./genre";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

import { IoClose } from "react-icons/io5";
import { BiSearch } from "react-icons/bi";
import { FaHome, FaSearch, FaTv, FaPlay, FaBars } from "react-icons/fa";




export default function Home() {
  const router = useRouter();

  

  
  useEffect(() => {
    const storedValidToken = localStorage.getItem("validToken");
    const storedExpirationTime = localStorage.getItem("validTokenExpiration");

    if (
      storedValidToken !== "true" ||
      !storedExpirationTime ||
      Date.now() > parseInt(storedExpirationTime)
    ) {
      router.push("/");
    }
  }, [router]);
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (you can remove setTimeout if fetching data)
    setTimeout(() => {
      setIsLoading(false);
    }, 500); // Adjust time as needed
  }, []);
  // fetch data with usehook
  const { alldata, loading } = useFectchData("/api/getmovies");

  const [wloading, setWLoading] = useState(true);


  // filter for published movies required
  const publishedData = alldata.filter(ab => ab.status === "publish");
  const seriesData = publishedData.filter((ab) => ab.titlecategory === 'series');
  const animeData = publishedData.filter((ab) => ab.titlecategory === "anime");
  const hollywoodData = publishedData.filter((ab) => ab.category === 'telugu');
  // function for filter by genre 
  const [selectedGenre, setSelectGenre] = useState('all movies');

  const genres = ['all movies', 'action', 'adventure', 'animation', 'comedy', 'drama', 'crime', 'fantasy', 'horror', 'romance', 'thriller', 'science_fiction'];

  const categories = ["bollywood", "telugu", "south", "gujarati", "marvel_studio", "tv_Shows", "web_series"];

  const handleGenreClick = (genre) => {
    setSelectGenre(genre);
  }
  const filmsData = publishedData.filter((ab) => ab.titlecategory === "films");

  const filteredData = publishedData.filter(movie => {
    if (selectedGenre === 'all movies') return true;
    if (categories.includes(selectedGenre)) {
      return movie.category === selectedGenre;
    } else {
      return movie.genre.includes(selectedGenre);
    }

  })

  const [updatedData, setUpdatedData] = useState([]);

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
  const recentlyAddedData = (alldata || [])
    .filter((film) => film.status === "publish") // Only show published films
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by `createdAt` date descending

  // Navbar header component scroll sticky
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector("nav");
      header.classList.toggle("sticky", window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Functions for navlist item page routing active status

  const [clicked, setClicked] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const [searchbar, setSearchbar] = useState(false);

  const [activeLink, setActiveLink] = useState("/");

  // Search function by title of the movie
  const [movieshortname, setMovieshortname] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState(null);



  // Function to handle search
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

  const searchRef = useRef(null);

  // Function to close search bar when clicking outside
  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setMovieshortname("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setClicked(false);
  };

  useEffect(() => {
    // Update active link state when the page is reloaded
    setActiveLink(router.pathname);
  }, [router.pathname]);

  // Navbar
  const handleNavbarOpen = () => {
    setNavbar(!navbar);
  };

  const handleNavbarClose = () => {
    setNavbar(false);
  };

  // Search bar
  const handleSearchbarClose = () => {
    setSearchbar(false);
  };

  const searchInputRef = useRef(null);

  const handleSearchbarOpen = () => setSearchbar(true);
  const scrollContainerRef = useRef(null);

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsMouseDown(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e) => {
    if (!isMouseDown) return;
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const scroll = scrollLeft - (x - startX);
    scrollContainerRef.current.scrollLeft = scroll;
  };

  const handleTouchStart = (e) => {
    setIsMouseDown(true);
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isMouseDown) return;
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const scroll = scrollLeft - (x - startX);
    scrollContainerRef.current.scrollLeft = scroll;
  };

  const handleTouchEnd = () => {
    setIsMouseDown(false);
  };

  /////

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
       
        <title>Cinema Talkiez</title>
        <meta name="description" content="Next Js Movie App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/img/appicon.jpg" />
      </Head>
      <nav className="header">
        <h1 className="logo1">
          <div class="logo-container">
            <img src="/img/appicon.jpg" alt="Logo" class="logo-img" />
            <h1 class="logo1">Cinema Talkiez</h1>
          </div>

        </h1>







        {/* Bottom Navigation Bar */}
        <div className="bottom-navigation">
          <ul>
            <li>
              <Link href="/" onClick={handleSearchbarClose}>
                <FaHome />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link href="/Anime" onClick={handleSearchbarClose}>
                <FaTv />
                <span>Anime</span>
              </Link>
            </li>
            <li>
              <Link href="/search">
                <FaSearch />
                <span>Search</span>
              </Link>
            </li>
            <li>
              <Link href="/all" onClick={handleSearchbarClose}>
                <FaFilm />
                <span>All content</span>
              </Link>
            </li>
            <li>
              <a
                href="https://t.me/+gZwK3ZfUANxiYjk1"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleSearchbarClose}
              >
                <FaTelegramPlane />
                <span>Updates</span>
              </a>
            </li>

          </ul>
        </div>
      </nav>
      <div>


        {publishedData && publishedData.length > 0 ? (
          <Swiper
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
            loop={true}
            speed={1200}
            pagination={{ clickable: true }}
            modules={[Pagination, Autoplay, Navigation]}
            onSwiper={(swiper) => {
              if (!swiper.autoplay.running) {
                swiper.autoplay.start();
              }
            }}
          >
            {publishedData.slice(0, 3).map((movie) => (
              <SwiperSlide key={movie._id}>
                <div className="slideimagebx1">
                  <img
                    src={movie.bgposter}
                    alt="movie"
                    loading="lazy"
                    className="bgposter"
                  />
                  <div className="content1">
                    <div className="contentflex1">
                      <div className="smposter1">
                        <img
                          src={movie.smposter}
                          alt="movie poster"
                          loading="lazy"
                        />
                      </div>
                      <div className="details1">
                        <h1>{movie.title}</h1>
                        <Link href={`/movies/${movie.slug}`}>
                          <button className="btn_download1">
                            <FaDownload className="faDownload" /> DOWNLOAD
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p>No movies available</p>
        )}





        <h1 className="logo4">Genres</h1>
        <div className="category-icons-scroll">
          <Swiper
            slidesPerView={5} // Default visible slides for categories
            spaceBetween={30} // Space between the slides
            loop={true} // Enable looping
            //autoplay={{ delay: 3000, disableOnInteraction: false }} // Autoplay every 3 seconds
            modules={[Pagination, Navigation, Autoplay]} // Required SwiperJS modules
            breakpoints={{
              1587: {
                slidesPerView: 8,
              },
              1500: {
                slidesPerView: 7,
              },
              1200: {
                slidesPerView: 6,
              },
              1040: {
                slidesPerView: 5,
              },
              768: {
                slidesPerView: 4,
              },
              650: {
                slidesPerView: 3,
              },
              480: {
                slidesPerView: 2,
              },
            }}
          >
            <ul className="category-list">


              <SwiperSlide className="category-item">
                <Link href="/action" onClick={handleSearchbarClose}>
                  <div className="icon">
                    <img src="/img/action.jpg" alt="action" />
                  </div>

                </Link>
              </SwiperSlide>

              <SwiperSlide className="category-item">
                <Link href="/adventure" onClick={handleSearchbarClose}>
                  <div className="icon">
                    <img src="/img/adventure.jpg" alt="adventure" />
                  </div>

                </Link>
              </SwiperSlide>

              <SwiperSlide className="category-item">
                <Link href="/comedy" onClick={handleSearchbarClose}>
                  <div className="icon">
                    <img src="/img/comedy.jpg" alt="comedy" />
                  </div>

                </Link>
              </SwiperSlide>


              <SwiperSlide className="category-item">
                <Link href="/family" onClick={handleSearchbarClose}>
                  <div className="icon">
                    <img src="/img/family.jpg" alt="family" />
                  </div>

                </Link>
              </SwiperSlide>


              <SwiperSlide className="category-item">
                <Link href="/romance" onClick={handleSearchbarClose}>
                  <div className="icon">
                    <img src="/img/romance.jpg" alt="romance" />
                  </div>

                </Link>
              </SwiperSlide>

              <SwiperSlide className="category-item">
                <Link href="/horror" onClick={handleSearchbarClose}>
                  <div className="icon">
                    <img src="/img/horror.jpg" alt="horror" />
                  </div>

                </Link>
              </SwiperSlide>

              <SwiperSlide className="category-item">
                <Link href="/crime" onClick={handleSearchbarClose}>
                  <div className="icon">
                    <img src="/img/crime.jpg" alt="crime" />
                  </div>

                </Link>
              </SwiperSlide>

              <SwiperSlide className="category-item">
                <Link href="/drama" onClick={handleSearchbarClose}>
                  <div className="icon">
                    <img src="/img/drama.jpg" alt="drama" />
                  </div>

                </Link>
              </SwiperSlide>

              <SwiperSlide className="category-item">
                <Link href="/fantasy" onClick={handleSearchbarClose}>
                  <div className="icon">
                    <img src="/img/fantasy.jpg" alt="fantasy" />
                  </div>

                </Link>
              </SwiperSlide>

              <SwiperSlide className="category-item">
                <Link href="/science_fiction" onClick={handleSearchbarClose}>
                  <div className="icon">
                    <img src="/img/scifi.jpg" alt="sci-fi" />
                  </div>

                </Link>
              </SwiperSlide>



              {/* Additional categories can be added in the same format */}
            </ul>
          </Swiper>
        </div>

















        <h1 className="logo5">Newly Released</h1>
        <div className="scrollcardssec">
          {loading ? (
            <div >
             
            </div>
          ) : (
            <Swiper
              slidesPerView={4} // Default visible slides
              spaceBetween={50} // Space between the slides
              loop={false} // Enable looping
              //autoplay={{ delay: 3000, disableOnInteraction: true }} // Autoplay every 3 seconds
              modules={[Pagination, Navigation, Autoplay]} // Required SwiperJS modules
              breakpoints={{
                1587: {
                  slidesPerView: 8,
                },
                1500: {
                  slidesPerView: 7,
                },
                1200: {
                  slidesPerView: 6,
                },
                1040: {
                  slidesPerView: 5,
                },
                768: {
                  slidesPerView: 4,
                },
                650: {
                  slidesPerView: 3,
                },
                480: {
                  slidesPerView: 2,
                },
              }}
            >
              {alldata
                .filter((movie) => movie.status === "publish") // Only show published movies
                .map((movie) => (
<SwiperSlide key={movie.slug}>
  <div className="card">
    <Link href={`/movies/${movie.slug}`}>
      <div className="cardimg">
        <img src={movie.smposter} alt={movie.title} loading="lazy" />
      </div>
      <div className="contents">
        <div className="title-row">
          <h5>{movie.title}</h5>
          <span className="type">{movie.type}</span>
        </div>
      </div>
    </Link>
  </div>
</SwiperSlide>

                ))}
            </Swiper>
          )}
        </div>








        <h1 className="logo3">Action Movies</h1>
        <div className="scrollcardssec">
          {loading ? (
            <div >
             
            </div>
          ) : (
            <Swiper
              slidesPerView={4} // Default visible slides
              spaceBetween={50} // Space between the slides
              loop={false} // Disable looping
              autoplay={{ delay: 2500, disableOnInteraction: true }} // Autoplay every 3 seconds
              modules={[Pagination, Navigation, Autoplay]} // Required SwiperJS modules
              breakpoints={{
                1587: {
                  slidesPerView: 8,
                },
                1500: {
                  slidesPerView: 7,
                },
                1200: {
                  slidesPerView: 6,
                },
                1040: {
                  slidesPerView: 5,
                },
                768: {
                  slidesPerView: 4,
                },
                650: {
                  slidesPerView: 3,
                },
                480: {
                  slidesPerView: 2,
                },
              }}
            >
              {alldata
                .filter(
                  (movie) =>
                    movie.status === "publish" && // Only published movies
                    movie.genre.includes("action") // Check if the genre includes "action"
                )
                .map((movie) => (
                  <SwiperSlide key={movie.slug}>
                    <div className="card">
                      <Link href={`/movies/${movie.slug}`}>
                        <div className="cardimg">
                          <img src={movie.smposter} alt={movie.title} loading="lazy" />
                        </div>
                        <div className="contents">
        <div className="title-row">
          <h5>{movie.title}</h5>
          <span className="type">{movie.type}</span>
        </div>
      </div>
                      </Link>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          )}
        </div>

        <h1 className="logo3">Adventure Movies</h1>
        <div className="scrollcardssec">
          {loading ? (
            <div >
             
            </div>
          ) : (
            <Swiper
              slidesPerView={4} // Default visible slides
              spaceBetween={50} // Space between the slides
              loop={false} // Disable looping
              autoplay={{ delay: 3000, disableOnInteraction: true }} // Autoplay every 3 seconds
              modules={[Pagination, Navigation, Autoplay]} // Required SwiperJS modules
              breakpoints={{
                1587: {
                  slidesPerView: 8,
                },
                1500: {
                  slidesPerView: 7,
                },
                1200: {
                  slidesPerView: 6,
                },
                1040: {
                  slidesPerView: 5,
                },
                768: {
                  slidesPerView: 4,
                },
                650: {
                  slidesPerView: 3,
                },
                480: {
                  slidesPerView: 2,
                },
              }}
            >
              {alldata
                .filter(
                  (movie) =>
                    movie.status === "publish" && // Only published movies
                    movie.genre.includes("adventure") // Check if the genre includes "action"
                )
                .map((movie) => (
                  <SwiperSlide key={movie.slug}>
                    <div className="card">
                      <Link href={`/movies/${movie.slug}`}>
                        <div className="cardimg">
                          <img src={movie.smposter} alt={movie.title} loading="lazy" />
                        </div>
                        <div className="contents">
        <div className="title-row">
          <h5>{movie.title}</h5>
          <span className="type">{movie.type}</span>
        </div>
      </div>
                      </Link>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          )}
        </div>

        <h1 className="logo3">Comedy Movies</h1>
        <div className="scrollcardssec">
          {loading ? (
            <div >
             
            </div>
          ) : (
            <Swiper
              slidesPerView={4} // Default visible slides
              spaceBetween={50} // Space between the slides
              loop={false} // Disable looping
              autoplay={{ delay: 3500, disableOnInteraction: true }} // Autoplay every 3 seconds
              modules={[Pagination, Navigation, Autoplay]} // Required SwiperJS modules
              breakpoints={{
                1587: {
                  slidesPerView: 8,
                },
                1500: {
                  slidesPerView: 7,
                },
                1200: {
                  slidesPerView: 6,
                },
                1040: {
                  slidesPerView: 5,
                },
                768: {
                  slidesPerView: 4,
                },
                650: {
                  slidesPerView: 3,
                },
                480: {
                  slidesPerView: 2,
                },
              }}
            >
              {alldata
                .filter(
                  (movie) =>
                    movie.status === "publish" && // Only published movies
                    movie.genre.includes("comedy") // Check if the genre includes "action"
                )
                .map((movie) => (
                  <SwiperSlide key={movie.slug}>
                    <div className="card">
                      <Link href={`/movies/${movie.slug}`}>
                        <div className="cardimg">
                          <img src={movie.smposter} alt={movie.title} loading="lazy" />
                        </div>
                        <div className="contents">
        <div className="title-row">
          <h5>{movie.title}</h5>
          <span className="type">{movie.type}</span>
        </div>
      </div>
                      </Link>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          )}
        </div>
        <h1 className="logo3">Love & Romantic Movies</h1>
        <div className="scrollcardssec">
          {loading ? (
            <div >
             
            </div>
          ) : (
            <Swiper
              slidesPerView={4} // Default visible slides
              spaceBetween={50} // Space between the slides
              loop={false} // Disable looping
              autoplay={{ delay: 3000, disableOnInteraction: true }} // Autoplay every 3 seconds
              modules={[Pagination, Navigation, Autoplay]} // Required SwiperJS modules
              breakpoints={{
                1587: {
                  slidesPerView: 8,
                },
                1500: {
                  slidesPerView: 7,
                },
                1200: {
                  slidesPerView: 6,
                },
                1040: {
                  slidesPerView: 5,
                },
                768: {
                  slidesPerView: 4,
                },
                650: {
                  slidesPerView: 3,
                },
                480: {
                  slidesPerView: 2,
                },
              }}
            >
              {alldata
                .filter(
                  (movie) =>
                    movie.status === "publish" && // Only published movies
                    movie.genre.includes("romance") // Check if the genre includes "action"
                )
                .map((movie) => (
                  <SwiperSlide key={movie.slug}>
                    <div className="card">
                      <Link href={`/movies/${movie.slug}`}>
                        <div className="cardimg">
                          <img src={movie.smposter} alt={movie.title} loading="lazy" />
                        </div>
                        <div className="contents">
        <div className="title-row">
          <h5>{movie.title}</h5>
          <span className="type">{movie.type}</span>
        </div>
      </div>
                      </Link>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          )}
        </div>
        <h1 className="logo3">Family Movies</h1>
        <div className="scrollcardssec">
          {loading ? (
            <div >
             
            </div>
          ) : (
            <Swiper
              slidesPerView={4} // Default visible slides
              spaceBetween={50} // Space between the slides
              loop={false} // Disable looping
              autoplay={{ delay: 2500, disableOnInteraction: true }} // Autoplay every 3 seconds
              modules={[Pagination, Navigation, Autoplay]} // Required SwiperJS modules
              breakpoints={{
                1587: {
                  slidesPerView: 8,
                },
                1500: {
                  slidesPerView: 7,
                },
                1200: {
                  slidesPerView: 6,
                },
                1040: {
                  slidesPerView: 5,
                },
                768: {
                  slidesPerView: 4,
                },
                650: {
                  slidesPerView: 3,
                },
                480: {
                  slidesPerView: 2,
                },
              }}
            >
              {alldata
                .filter(
                  (movie) =>
                    movie.status === "publish" && // Only published movies
                    movie.genre.includes("family") // Check if the genre includes "action"
                )
                .map((movie) => (
                  <SwiperSlide key={movie.slug}>
                    <div className="card">
                      <Link href={`/movies/${movie.slug}`}>
                        <div className="cardimg">
                          <img src={movie.smposter} alt={movie.title} loading="lazy" />
                        </div>
                        <div className="contents">
        <div className="title-row">
          <h5>{movie.title}</h5>
          <span className="type">{movie.type}</span>
        </div>
      </div>
                      </Link>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          )}
        </div>


        <h1 className="logo3">Drama Movies</h1>
        <div className="scrollcardssec">
          {loading ? (
            <div >
             
            </div>
          ) : (
            <Swiper
              slidesPerView={4} // Default visible slides
              spaceBetween={50} // Space between the slides
              loop={false} // Disable looping
              autoplay={{ delay: 3000, disableOnInteraction: true }} // Autoplay every 3 seconds
              modules={[Pagination, Navigation, Autoplay]} // Required SwiperJS modules
              breakpoints={{
                1587: {
                  slidesPerView: 8,
                },
                1500: {
                  slidesPerView: 7,
                },
                1200: {
                  slidesPerView: 6,
                },
                1040: {
                  slidesPerView: 5,
                },
                768: {
                  slidesPerView: 4,
                },
                650: {
                  slidesPerView: 3,
                },
                480: {
                  slidesPerView: 2,
                },
              }}
            >
              {alldata
                .filter(
                  (movie) =>
                    movie.status === "publish" && // Only published movies
                    movie.genre.includes("drama") // Check if the genre includes "action"
                )
                .map((movie) => (
                  <SwiperSlide key={movie.slug}>
                    <div className="card">
                      <Link href={`/movies/${movie.slug}`}>
                        <div className="cardimg">
                          <img src={movie.smposter} alt={movie.title} loading="lazy" />
                        </div>
                        <div className="contents">
        <div className="title-row">
          <h5>{movie.title}</h5>
          <span className="type">{movie.type}</span>
        </div>
      </div>
                      </Link>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          )}
        </div>



        <h1 className="logo3">Crime Movies</h1>
        <div className="scrollcardssec">
          {loading ? (
             <div >
             
             </div>
          ) : (
            <Swiper
              slidesPerView={4} // Default visible slides
              spaceBetween={50} // Space between the slides
              loop={false} // Disable looping
              autoplay={{ delay: 3500, disableOnInteraction: true }} // Autoplay every 3 seconds
              modules={[Pagination, Navigation, Autoplay]} // Required SwiperJS modules
              breakpoints={{
                1587: {
                  slidesPerView: 8,
                },
                1500: {
                  slidesPerView: 7,
                },
                1200: {
                  slidesPerView: 6,
                },
                1040: {
                  slidesPerView: 5,
                },
                768: {
                  slidesPerView: 4,
                },
                650: {
                  slidesPerView: 3,
                },
                480: {
                  slidesPerView: 2,
                },
              }}
            >
              {alldata
                .filter(
                  (movie) =>
                    movie.status === "publish" && // Only published movies
                    movie.genre.includes("crime") // Check if the genre includes "action"
                )
                .map((movie) => (
                  <SwiperSlide key={movie.slug}>
                    <div className="card">
                      <Link href={`/movies/${movie.slug}`}>
                        <div className="cardimg">
                          <img src={movie.smposter} alt={movie.title} loading="lazy" />
                        </div>
                        <div className="contents">
        <div className="title-row">
          <h5>{movie.title}</h5>
          <span className="type">{movie.type}</span>
        </div>
      </div>
                      </Link>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          )}
        </div>



        <h1 className="logo3">Horror Movies</h1>
        <div className="scrollcardssec">
          {loading ? (
            <div >
             
            </div>
          ) : (
            <Swiper
              slidesPerView={4} // Default visible slides
              spaceBetween={50} // Space between the slides
              loop={false} // Disable looping
              autoplay={{ delay: 2500, disableOnInteraction: true }} // Autoplay every 3 seconds
              modules={[Pagination, Navigation, Autoplay]} // Required SwiperJS modules
              breakpoints={{
                1587: {
                  slidesPerView: 8,
                },
                1500: {
                  slidesPerView: 7,
                },
                1200: {
                  slidesPerView: 6,
                },
                1040: {
                  slidesPerView: 5,
                },
                768: {
                  slidesPerView: 4,
                },
                650: {
                  slidesPerView: 3,
                },
                480: {
                  slidesPerView: 2,
                },
              }}
            >
              {alldata
                .filter(
                  (movie) =>
                    movie.status === "publish" && // Only published movies
                    movie.genre.includes("horror") // Check if the genre includes "action"
                )
                .map((movie) => (
                  <SwiperSlide key={movie.slug}>
                    <div className="card">
                      <Link href={`/movies/${movie.slug}`}>
                        <div className="cardimg">
                          <img src={movie.smposter} alt={movie.title} loading="lazy" />
                        </div>
                        <div className="contents">
        <div className="title-row">
          <h5>{movie.title}</h5>
          <span className="type">{movie.type}</span>
        </div>
      </div>
                      </Link>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          )}
        </div>





        <h1 className="logo3">Thriller Movies</h1>
        <div className="scrollcardssec">
          {loading ? (
            <div >
             
            </div>
          ) : (
            <Swiper
              slidesPerView={4} // Default visible slides
              spaceBetween={50} // Space between the slides
              loop={false} // Disable looping
              autoplay={{ delay: 3500, disableOnInteraction: true }} // Autoplay every 3 seconds
              modules={[Pagination, Navigation, Autoplay]} // Required SwiperJS modules
              breakpoints={{
                1587: {
                  slidesPerView: 8,
                },
                1500: {
                  slidesPerView: 7,
                },
                1200: {
                  slidesPerView: 6,
                },
                1040: {
                  slidesPerView: 5,
                },
                768: {
                  slidesPerView: 4,
                },
                650: {
                  slidesPerView: 3,
                },
                480: {
                  slidesPerView: 2,
                },
              }}
            >
              {alldata
                .filter(
                  (movie) =>
                    movie.status === "publish" && // Only published movies
                    movie.genre.includes("thriller") // Check if the genre includes "action"
                )
                .map((movie) => (
                  <SwiperSlide key={movie.slug}>
                    <div className="card">
                      <Link href={`/movies/${movie.slug}`}>
                        <div className="cardimg">
                          <img src={movie.smposter} alt={movie.title} loading="lazy" />
                        </div>
                        <div className="contents">
        <div className="title-row">
          <h5>{movie.title}</h5>
          <span className="type">{movie.type}</span>
        </div>
      </div>
                      </Link>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          )}
        </div>

        <h1 className="logo3">Fantasy Movies</h1>
        <div className="scrollcardssec">
          {loading ? (
             <div >
             
             </div>
          ) : (
            <Swiper
              slidesPerView={4} // Default visible slides
              spaceBetween={50} // Space between the slides
              loop={false} // Disable looping
              autoplay={{ delay: 2500, disableOnInteraction: true }} // Autoplay every 3 seconds
              modules={[Pagination, Navigation, Autoplay]} // Required SwiperJS modules
              breakpoints={{
                1587: {
                  slidesPerView: 8,
                },
                1500: {
                  slidesPerView: 7,
                },
                1200: {
                  slidesPerView: 6,
                },
                1040: {
                  slidesPerView: 5,
                },
                768: {
                  slidesPerView: 4,
                },
                650: {
                  slidesPerView: 3,
                },
                480: {
                  slidesPerView: 2,
                },
              }}
            >
              {alldata
                .filter(
                  (movie) =>
                    movie.status === "publish" && // Only published movies
                    movie.genre.includes("fantasy") // Check if the genre includes "action"
                )
                .map((movie) => (
                  <SwiperSlide key={movie.slug}>
                    <div className="card">
                      <Link href={`/movies/${movie.slug}`}>
                        <div className="cardimg">
                          <img src={movie.smposter} alt={movie.title} loading="lazy" />
                        </div>
                        <div className="contents">
        <div className="title-row">
          <h5>{movie.title}</h5>
          <span className="type">{movie.type}</span>
        </div>
      </div>
                      </Link>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          )}
        </div>


        <h1 className="logo3">Science-Fiction Movies</h1>
        <div className="scrollcardssec">
          {loading ? (
            <div >
             
            </div>
          ) : (
            <Swiper
              slidesPerView={4} // Default visible slides
              spaceBetween={50} // Space between the slides
              loop={false} // Disable looping
              autoplay={{ delay: 3000, disableOnInteraction: true }} // Autoplay every 3 seconds
              modules={[Pagination, Navigation, Autoplay]} // Required SwiperJS modules
              breakpoints={{
                1587: {
                  slidesPerView: 8,
                },
                1500: {
                  slidesPerView: 7,
                },
                1200: {
                  slidesPerView: 6,
                },
                1040: {
                  slidesPerView: 5,
                },
                768: {
                  slidesPerView: 4,
                },
                650: {
                  slidesPerView: 3,
                },
                480: {
                  slidesPerView: 2,
                },
              }}
            >
              {alldata
                .filter(
                  (movie) =>
                    movie.status === "publish" && // Only published movies
                    movie.genre.includes("science_fiction") // Check if the genre includes "action"
                )
                .map((movie) => (
                  <SwiperSlide key={movie.slug}>
                    <div className="card">
                      <Link href={`/movies/${movie.slug}`}>
                        <div className="cardimg">
                          <img src={movie.smposter} alt={movie.title} loading="lazy" />
                        </div>
                        <div className="contents">
        <div className="title-row">
          <h5>{movie.title}</h5>
          <span className="type">{movie.type}</span>
        </div>
      </div>
                      </Link>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          )}
        </div>








        <div className="nextpagelink">
          <Link href='/all'>
            <button className="cssbuttons_io_button">All
              <div className="icon">
                <FaArrowRight />
              </div>
            </button>
          </Link>
        </div>

      </div>

    </>
  );
}
