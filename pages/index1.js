import React from "react";

const Index1 = () => {
  // Data for each movie/site with title, redirect URL, and actual image path
  const items = [
    { title: "ESA Ibomma", url: "https://rce.ibomma.men/", image: "/img/action.jpg" },
    { title: "Movierulz", url: "https://www.5movierulz.srl/", image: "/img/adventure.jpg" },
    { title: "Moviezwap", url: "https://www.moviezwap.pub/", image: "/img/crime.jpg" },
    { title: "Movieswood", url: "https://movieswood.cloud/", image: "/img/family.jpg" },
    { title: "Mirror", url: "https://netfree2.cc/mobile/home", image: "/img/horror.jpg" },
    { title: "Toonworld4all", url: "https://toonworld4all.me/", image: "/img/fantasy.jpg" },
    { title: "Anime World", url: "https://watchanimeworld.in/", image: "/img/drama.jpg" },
    { title: "AnimeDub", url: "https://animedub.pro/", image: "/img/thriller.jpg" },
    { title: "9Anime", url: "https://9anime.org.lv/", image: "/img/animation.jpg" },
    { title: "ZoroTV", url: "https://zorotv.com.in/", image: "/img/zorotv.jpg" },
    { title: "TeluguPalakaMovies", url: "https://telugupalakamovies.com/", image: "/img/telugupalakamovies.jpg" },
    { title: "Toons Hub", url: "https://toonshub.xyz/", image: "/img/toonshub.jpg" },
    { title: "H! Anime", url: "https://hianimez.to/home", image: "/img/hianime.jpg" },
    { title: "Anime4U", url: "https://www.animes4u.com/", image: "/img/anime4u.jpg" },
    { title: "Game Space", url: "https://poki.com/", image: "/img/gamespace.jpg" },
  ];

  // Function to handle redirection
  const handleRedirect = (url) => {
    window.location.href = url;
  };

  // Styles for the container (grid layout)
  const containerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "5px",
    padding: "35px",
    paddingTop: "10px",
    maxWidth: "480px",
    margin: "0 auto",
    backgroundColor: "black",
    minHeight: "100vh",
  };

  // Styles for each card (poster + title)
  const cardStyle = {
    width: "150px",
    cursor: "pointer",
    borderRadius: "0px",
    overflow: "hidden",
    transition: "transform 0.2s",
    textAlign: "center",
    color: "white",
  };
// Styles for the poster image
const imageStyle = {
  width: "100%",
  height: "220px",
  objectFit: "cover",
  borderRadius: "0px 0px 0 0",
  padding: "0px",
  marginTop: "20px",
// Moves the image 10px to the right
marginLeft:"7px",
};


  // Styles for the title
  const titleStyle = {
    fontSize: "14px",
    fontWeight: "bold",
    margin: "5px 0",
 
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
