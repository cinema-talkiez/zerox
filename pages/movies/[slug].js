import Link from 'next/link'; 
import Head from 'next/head';
import { useRouter } from 'next/router';
import useFetchData from '@/hooks/useFetchData';
import { useState, useEffect } from 'react';
import { FaDownload, FaBookmark, FaCheck, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { FaShareFromSquare } from 'react-icons/fa6';
import axios from 'axios';

export default function MoviesPost() {
    const router = useRouter();
    const { slug } = router.query;

    // Fetch data
    const { alldata, loading: dataLoading, error } = useFetchData(`/api/getmovies?slug=${slug}`);
    const { allmovie } = useFetchData('/api/getmovies');
    const publishedData = Array.isArray(alldata) ? alldata.filter(ab => ab.status === "publish") : [];

    // Dynamic poster size adjustments
    const smPosterStyles = {
        width: '200px',
        height: 'auto',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    };

    const [isLoading, setIsLoading] = useState(true);
    const [loading, setLoading] = useState(false); // ✅ Fix: Declare setLoading properly

    useEffect(() => {
        // Simulate loading time (you can remove setTimeout if fetching real data)
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    }, []);

    if (isLoading) {
        return (
            <div className="loader-container">
                <div className="spinner">
                    <div className="circle c1"></div>
                    <div className="circle c2"></div>
                    <div className="circle c3"></div>
                    <div className="circle c4"></div>
                </div>
            </div>
        );
    }

    const handleSecureWatch = async () => {
        setLoading(true);

        if (!alldata || !alldata[0]?.streamlink) {
            console.error("Stream link not found");
            setLoading(false);
            return;
        }

        try {
            // Fetch the secure playback page URL
            const response = await fetch(`/api/get-secure-url?streamUrl=${encodeURIComponent(alldata[0].streamlink)}`);
            const data = await response.json();

            if (data.secure_stream) {
                window.location.href = data.secure_stream; // Open secure player
            }
        } catch (error) {
            console.error("Error fetching secure stream:", error);
        }

        setLoading(false);
    };

    return (
        <>
            <Head>
                {/* Add dynamic title if needed */}
            </Head>
            <div>
                <div className="slideimagebx">
                    <img
                        src={alldata && alldata?.[0]?.bgposter}
                        alt="Background Poster"
                        loading="lazy"
                        style={{ width: '100%', height: 'auto' }} // Background image style
                    />
                </div>
                <div className="mainmoviebx">



                    <div className='rightdata'>
                        <div className='movietitle'>
                            <h1>{alldata && alldata[0]?.slug.replaceAll('-', ' ').toUpperCase()}</h1>

                        </div>

                        <div className='moviedescription'>
                            <article className='movieinfo'>

                                <div className='name-photo'>
                                    <img
                                        src={alldata && alldata[0]?.smposter}
                                        alt="Poster"
                                        loading="lazy"
                                        style={smPosterStyles} // Apply dynamic styles
                                    /></div>

                                <div>
                                    {alldata && alldata[0] && (
                                        <table>
                                            <tbody>
                                                {alldata[0]?.title && (
                                                    <tr className="white-row">
                                                        <td>&#9642; Name:</td>
                                                        <td>{alldata[0].title.replaceAll('-', ' ').toUpperCase()}</td>
                                                    </tr>
                                                )}
                                                {alldata[0]?.episodes && (
                                                    <tr className="white-row">
                                                        <td>&#9642; Total Episodes:</td>
                                                        <td>{alldata[0].episodes}</td>
                                                    </tr>
                                                )}
                                                {alldata[0]?.duration && (
                                                    <tr className="white-row">
                                                        <td>&#9642; Duration:</td>
                                                        <td>{alldata[0].duration}</td>
                                                    </tr>
                                                )}
                                                {alldata[0]?.year && (
                                                    <tr className="white-row">
                                                        <td>&#9642; Release Year:</td>
                                                        <td>{alldata[0].year}</td>
                                                    </tr>
                                                )}
                                                {alldata[0]?.genre?.length > 0 && (
                                                    <tr className="white-row">
                                                        <td>&#9642; Genre:</td>
                                                        <td>{alldata[0].genre.join(', ')}</td>
                                                    </tr>
                                                )}
                                                {alldata[0]?.language && (
                                                    <tr className="white-row">
                                                        <td>&#9642; Language:</td>
                                                        <td>{alldata[0].language}</td>
                                                    </tr>
                                                )}
                                                {alldata[0]?.subtitle && (
                                                    <tr className="white-row">
                                                        <td>&#9642; Subtitle:</td>
                                                        <td>{alldata[0].subtitle}</td>
                                                    </tr>
                                                )}
                                                {alldata[0]?.size && (
                                                    <tr className="white-row">
                                                        <td>&#9642; Size:</td>
                                                        <td>{alldata[0].size}</td>
                                                    </tr>
                                                )}
                                                {alldata[0]?.quality && (
                                                    <tr className="white-row">
                                                        <td>&#9642; Quality:</td>
                                                        <td>{alldata[0].quality}</td>
                                                    </tr>
                                                )}

                                            </tbody>
                                        </table>
                                    )}
                                </div>


                            </article>
                            <article>
                                <div className="storyline">
                                    <h3
                                        style={{
                                            fontSize: '18px',
                                            borderBottom: '2px solid white', // Creates a white line below the text
                                            paddingBottom: '5px',           // Adds space between text and the line
                                            marginBottom: '20px',           // Adds space below the heading
                                            textAlign: 'center',            // Centers the heading
                                            wordWrap: 'break-word',         // Ensures long words wrap
                                            overflowWrap: 'break-word',     // Alternative wrapping rule
                                        }}
                                    >
                                        SYNOPSIS:
                                    </h3>
                                    <p
                                        style={{
                                            fontSize: '12px',
                                            lineHeight: '1.6',              // Adds space between lines
                                            textAlign: 'justify',           // Aligns text evenly on both sides
                                            padding: '10px',                // Adds padding for a neat layout
                                            margin: '0 auto',               // Centers the paragraph
                                            maxWidth: '90%',                // Limits the width for readability
                                            wordWrap: 'break-word',         // Ensures long words break
                                            overflowWrap: 'break-word',     // Ensures long unbroken content wraps
                                        }}
                                    >
                                        {alldata && alldata[0]?.description}
                                    </p>
                                </div>
                            </article>
                            <div className="line"></div>
                            {alldata && alldata[0]?.youtubelink && Object.keys(alldata[0]?.youtubelink).some((key) => alldata[0]?.youtubelink[key]) && (
                                <>
                                    <h2>
                                        <span style={{ color: '#FFFFFF' }}> WATCH </span>
                                        <span style={{ color: '#3CB043' }}>ONLINE :</span>

                                    </h2>

                                    <div className='youtubeiframe'>
                                        <iframe
                                            width="100%"
                                            height="370"
                                            src={alldata[0]?.youtubelink}
                                            frameBorder="0"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </>
                            )}
{alldata && alldata[0]?.streamlink && (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", marginTop: "20px" }}>
        <button
            onClick={handleSecureWatch}
            style={{
                backgroundColor: "#3CB043",
                color: "white",
                padding: "12px 25px",
                fontSize: "18px",
                fontWeight: "bold",
                border: "none",
                borderRadius: "8px",
                cursor: loading ? "not-allowed" : "pointer",
                outline: "none",
                boxShadow: "0px 5px 15px rgba(60, 176, 67, 0.5)", // Green glow effect
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                transition: "all 0.3s ease-in-out", // Smooth transition effect
                opacity: loading ? 0.7 : 1, // Reduce opacity when loading
            }}
            onFocus={(e) => (e.target.style.boxShadow = "0px 5px 15px rgba(60, 176, 67, 0.7)")} // Slightly increase glow on focus
            disabled={loading} // Disable button while loading
        >
            {loading ? (
                <>
                    <div className="spinner" style={{
                        width: "18px",
                        height: "18px",
                        border: "3px solid white",
                        borderTop: "3px solid transparent",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite"
                    }}></div>
                    <span>Loading...</span>
                </>
            ) : (
                <>
                    <FaDownload style={{ fontSize: "20px", color: "white" }} />
                    <span>WATCH / DOWNLOAD ONLINE</span>
                </>
            )}
        </button>
    </div>
)}






                            <div className="line"></div>
                            <section className='downloadsec'>
                                {/* Check if any episode links exist */}
                                {alldata && Object.keys(alldata[0]?.downloadlink || {}).some((key) => key.startsWith('ep') && alldata[0]?.downloadlink[key]) && (
                                    <h2>Episode Links</h2>
                                )}

                                <div className='downloadlinks2'>
                                    {alldata && alldata[0]?.downloadlink['ep1'] && (
                                        <a target='_blank' href={alldata[0].downloadlink['ep1']}>EP01</a>
                                    )}
                                    {alldata && alldata[0]?.downloadlink['ep2'] && (
                                        <a target='_blank' href={alldata[0].downloadlink['ep2']}>EP02</a>
                                    )}
                                    {alldata && alldata[0]?.downloadlink['ep3'] && (
                                        <a target='_blank' href={alldata[0].downloadlink['ep3']}>EP03</a>
                                    )}
                                    {alldata && alldata[0]?.downloadlink['ep4'] && (
                                        <a target='_blank' href={alldata[0].downloadlink['ep4']}>EP04</a>
                                    )}
                                    {alldata && alldata[0]?.downloadlink['ep5'] && (
                                        <a target='_blank' href={alldata[0].downloadlink['ep5']}>EP05</a>
                                    )}
                                    {alldata && alldata[0]?.downloadlink['ep6'] && (
                                        <a target='_blank' href={alldata[0].downloadlink['ep6']}>EP06</a>
                                    )}
                                    {alldata && alldata[0]?.downloadlink['ep7'] && (
                                        <a target='_blank' href={alldata[0].downloadlink['ep7']}>EP07</a>
                                    )}
                                    {alldata && alldata[0]?.downloadlink['ep8'] && (
                                        <a target='_blank' href={alldata[0].downloadlink['ep8']}>EP08</a>
                                    )}
                                    {alldata && alldata[0]?.downloadlink['ep9'] && (
                                        <a target='_blank' href={alldata[0].downloadlink['ep9']}>EP09</a>
                                    )}
                                    {alldata && alldata[0]?.downloadlink['ep10'] && (
                                        <a target='_blank' href={alldata[0].downloadlink['ep10']}>EP10</a>
                                    )}
                                    {alldata && alldata[0]?.downloadlink['ep11'] && (
                                        <a target='_blank' href={alldata[0].downloadlink['ep11']}>EP11</a>
                                    )}
                                    {alldata && alldata[0]?.downloadlink['ep12'] && (
                                        <a target='_blank' href={alldata[0].downloadlink['ep12']}>EP12</a>
                                    )}
                                    {alldata && alldata[0]?.downloadlink['ep13'] && (
                                        <a target='_blank' href={alldata[0].downloadlink['ep13']}>EP13</a>
                                    )}
                                    {alldata && alldata[0]?.downloadlink['ep14'] && (
                                        <a target='_blank' href={alldata[0].downloadlink['ep14']}>EP14</a>
                                    )}
                                    {alldata && alldata[0]?.downloadlink['ep15'] && (
                                        <a target='_blank' href={alldata[0].downloadlink['ep15']}>EP15</a>
                                    )}
                                    {alldata && alldata[0]?.downloadlink['ep16'] && (
                                        <a target='_blank' href={alldata[0].downloadlink['ep16']}>EP16</a>
                                    )}
                                    {alldata && alldata[0]?.downloadlink['ep17'] && (
                                        <a target='_blank' href={alldata[0].downloadlink['ep17']}>EP17</a>
                                    )}
                                    {alldata && alldata[0]?.downloadlink['ep18'] && (
                                        <a target='_blank' href={alldata[0].downloadlink['ep18']}>EP18</a>
                                    )}
                                    {alldata && alldata[0]?.downloadlink['ep19'] && (
                                        <a target='_blank' href={alldata[0].downloadlink['ep19']}>EP19</a>
                                    )}
                                    {alldata && alldata[0]?.downloadlink['ep20'] && (
                                        <a target='_blank' href={alldata[0].downloadlink['ep20']}>EP20</a>
                                    )}
                                    {alldata && alldata[0]?.downloadlink['ep21'] && (
                                        <a target='_blank' href={alldata[0].downloadlink['ep21']}>EP21</a>
                                    )}
                                    {alldata && alldata[0]?.downloadlink['ep22'] && (
                                        <a target='_blank' href={alldata[0].downloadlink['ep22']}>EP22</a>
                                    )}
                                    {alldata && alldata[0]?.downloadlink['ep23'] && (
                                        <a target='_blank' href={alldata[0].downloadlink['ep23']}>EP23</a>
                                    )}
                                    {alldata && alldata[0]?.downloadlink['ep24'] && (
                                        <a target='_blank' href={alldata[0].downloadlink['ep24']}>EP24</a>
                                    )}
                                    {alldata && alldata[0]?.downloadlink['ep25'] && (
                                        <a target='_blank' href={alldata[0].downloadlink['ep25']}>EP25</a>
                                    )}
                                    {alldata && alldata[0]?.downloadlink['ep26'] && (
                                        <a target='_blank' href={alldata[0].downloadlink['ep26']}>EP26</a>
                                    )}
                                    {alldata && alldata[0]?.downloadlink['ep27'] && (
                                        <a target='_blank' href={alldata[0].downloadlink['ep27']}>EP27</a>
                                    )}
                                    {alldata && alldata[0]?.downloadlink['ep28'] && (
                                        <a target='_blank' href={alldata[0].downloadlink['ep28']}>EP28</a>
                                    )}
                                    {alldata && alldata[0]?.downloadlink['ep29'] && (
                                        <a target='_blank' href={alldata[0].downloadlink['ep29']}>EP29</a>
                                    )}
                                    {alldata && alldata[0]?.downloadlink['ep30'] && (
                                        <a target='_blank' href={alldata[0].downloadlink['ep30']}>EP30</a>
                                    )}

                                    {/* Add more episode links as needed */}
                                </div>

                                {alldata && ['t480p', 't480p2', 't720p', 't720p2', 't1080p', 't1080p2'].some((quality) => alldata[0]?.downloadlink[quality]) && (
                                    <h2>Telegram Downloads</h2>
                                )}

                                <div className='downloadlinks'>
                                    {alldata && alldata[0]?.downloadlink['t480p'] && (
                                        <a target='_blank' href={alldata[0].downloadlink['t480p']}>{alldata && alldata[0]?.descripsion1}</a>
                                    )}
                                    {alldata && alldata[0]?.downloadlink['t480p2'] && (
                                        <a target='_blank' href={alldata[0].downloadlink['t480p2']}>{alldata && alldata[0]?.descripsion2}</a>
                                    )}
                                    {alldata && alldata[0]?.downloadlink['t720p'] && (
                                        <a target='_blank' href={alldata[0].downloadlink['t720p']}>{alldata && alldata[0]?.descripsion3}</a>
                                    )}
                                    {alldata && alldata[0]?.downloadlink['t720p2'] && (
                                        <a target='_blank' href={alldata[0].downloadlink['t720p2']}>{alldata && alldata[0]?.descripsion4}</a>
                                    )}
                                    {alldata && alldata[0]?.downloadlink['t1080p'] && (
                                        <a target='_blank' href={alldata[0].downloadlink['t1080p']}>{alldata && alldata[0]?.descripsion5}</a>
                                    )}
                                    {alldata && alldata[0]?.downloadlink['t1080p2'] && (
                                        <a target='_blank' href={alldata[0].downloadlink['t1080p2']}>{alldata && alldata[0]?.descripsion6}</a>
                                    )}

                                </div>
                            </section>
                            <section className='downloadsec'>
                                {/* Check if torrent links (480p, 720p, 1080p, 4k) exist */}
                                {/* Check if torrent links (480p, 720p, 1080p, 4k) exist */}
                                {alldata && ['480p', '480p2', '720p', '720p2', '1080p', '1080p2', '4k'].some((quality) => alldata[0]?.downloadlink[quality]) && (
                                    <h2>Torrent Downloads</h2>
                                )}

                                <div className='downloadlinks3'>
                                    {alldata && alldata[0]?.downloadlink['480p'] && (
                                        <a target='_blank' href={alldata[0].downloadlink['480p']}>{alldata && alldata[0]?.descripsion1}</a>
                                    )}
                                    {alldata && alldata[0]?.downloadlink['480p2'] && (
                                        <a target='_blank' href={alldata[0].downloadlink['480p2']}>{alldata && alldata[0]?.descripsion2}</a>
                                    )}
                                    {alldata && alldata[0]?.downloadlink['720p'] && (
                                        <a target='_blank' href={alldata[0].downloadlink['720p']}>{alldata && alldata[0]?.descripsion3}</a>
                                    )}
                                    {alldata && alldata[0]?.downloadlink['720p2'] && (
                                        <a target='_blank' href={alldata[0].downloadlink['720p2']}>{alldata && alldata[0]?.descripsion4}</a>
                                    )}
                                    {alldata && alldata[0]?.downloadlink['1080p'] && (
                                        <a target='_blank' href={alldata[0].downloadlink['1080p']}>{alldata && alldata[0]?.descripsion5}</a>
                                    )}
                                    {alldata && alldata[0]?.downloadlink['1080p2'] && (
                                        <a target='_blank' href={alldata[0].downloadlink['1080p2']}>{alldata && alldata[0]?.descripsion6}</a>
                                    )}
                                    {alldata && alldata[0]?.downloadlink['4k'] && (
                                        <a target='_blank' href={alldata[0].downloadlink['4k']}>{alldata && alldata[0]?.descripsion7}</a>
                                    )}
                                </div>
                            </section>





                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
