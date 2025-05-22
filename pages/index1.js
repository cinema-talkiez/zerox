import React from "react";

const Index1 = () => {
  // Data for each movie/site with title, redirect URL, and placeholder image URL
  const items = [
    { title: "ESA Ibomma", url: "https://rce.ibomma.men/", image: "https://picsum.photos/150/200?random=1" },
    { title: "Movierulz", url: "https://www.5movierulz.srl/", image: "https://picsum.photos/150/200?random=2" },
    { title: "Moviezwap", url: "https://www.moviezwap.pub/", image: "https://picsum.photos/150/200?random=3" },
    { title: "Movieswood", url: "https://movieswood.cloud/", image: "https://picsum.photos/150/200?random=4" },
    { title: "Mirror", url: "https://netfree2.cc/mobile/home", image: "https://picsum.photos/150/200?random=5" },
    { title: "Toonworld4all", url: "https://toonworld4all.me/", image: "https://picsum.photos/150/200?random=6" },
    { title: "Anime World", url: "https://watchanimeworld.in/", image: "https://picsum.photos/150/200?random=7" },
    { title: "AnimeDub", url: "https://animedub.pro/", image: "https://picsum.photos/150/200?random=8" },
    { title: "9Anime", url: "https://9anime.org.lv/", image: "https://picsum.photos/150/200?random=9" },
    { title: "ZoroTV", url: "https://zorotv.com.in/", image: "https://picsum.photos/150/200?random=10" },
    { title: "TeluguPalakaMovies", url: "https://telugupalakamovies.com/", image: "https://picsum.photos/150/200?random=11" },
    { title: "Toons Hub", url: "https://toonshub.xyz/", image: "https://picsum.photos/150/200?random=12" },
    { title: "H! Anime", url: "https://hianimez.to/home", image: "https://picsum.photos/150/200?random=13" },
    { title: "Anime4U", url: "https://www.animes4u.com/", image: "https://picsum.photos/150/200?random=14" },
    { title: "Game Space", url: "https://poki.com/", image: "https://picsum.photos/150/200?random=15" },
  ];

  // Function to handle redirection
  const handleRedirect = (url) => {
    window.location.href = url;
  };

  // Styles for the container (grid layout)
  const containerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "5px", // Tighter gap to match the screenshot
    padding: "10px",
    paddingTop: "50px", // Space at the top as previously set
    maxWidth: "480px", // Fits 3 columns (150px * 3 + 5px * 2 gaps = 460px)
    margin: "0 auto",
    backgroundColor: "#1a1a1a", // Dark background like in the image
    minHeight: "100vh",
  };

  // Styles for each card (poster + title)
  const cardStyle = {
    width: "150px", // Fixed width to match the image
    cursor: "pointer",
    borderRadius: "0px", // No rounded corners to match the screenshot
    overflow: "hidden",
    transition: "transform 0.2s",
    textAlign: "center",
    color: "white",
  };

  // Styles for the poster image
  const imageStyle = {
    width: "100%",
    height: "200px", // Fixed height to match the image
    objectFit: "cover",
    borderRadius: "0px 0px 0 0",
    padding: "0px",
    // Removed transform to center the image
  };

  // Styles for the title
  const titleStyle = {
    fontSize: "14px",
    fontWeight: "bold",
    margin: "5px 0", // Reduced margin to match the tighter spacing in the screenshot
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    textAlign: "center",
  };

  return (
    <div style={containerStyle}>
      {items.map((item, index) => (
        <div
          key={index}
          style={cardStyle}
          onClick={() => handleRedirect(item.url)}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <img src={item.image} alt={item.title} style={imageStyle} />
          <div style={titleStyle}>{item.title}</div>
        </div>
      ))}
    </div>
  );
};

export default Index1;
