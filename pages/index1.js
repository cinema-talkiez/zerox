import React from "react";

const Index1 = () => {
  const items = [
    { title: "ESA Ibomma", url: "https://rce.ibomma.men/", image: "https://picsum.photos/300/140?random=1" },
    { title: "Movierulz", url: "https://www.5movierulz.srl/", image: "https://picsum.photos/300/140?random=2" },
    { title: "Moviezwap", url: "https://www.moviezwap.pub/", image: "https://picsum.photos/300/140?random=3" },
    { title: "Movieswood", url: "https://movieswood.cloud/", image: "https://picsum.photos/300/140?random=4" },
    { title: "Mirror", url: "https://netfree2.cc/mobile/home", image: "https://picsum.photos/300/140?random=5" },
    { title: "Toonworld4all", url: "https://toonworld4all.me/", image: "https://picsum.photos/300/140?random=6" },
    { title: "Anime World", url: "https://watchanimeworld.in/", image: "https://picsum.photos/300/140?random=7" },
    { title: "AnimeDub", url: "https://animedub.pro/", image: "https://picsum.photos/300/140?random=8" },
    { title: "9Anime", url: "https://9anime.org.lv/", image: "https://picsum.photos/300/140?random=9" },
    { title: "ZoroTV", url: "https://zorotv.com.in/", image: "https://picsum.photos/300/140?random=10" },
    { title: "TeluguPalakaMovies", url: "https://telugupalakamovies.com/", image: "https://picsum.photos/300/140?random=11" },
    { title: "Toons Hub", url: "https://toonshub.xyz/", image: "https://picsum.photos/300/140?random=12" },
    { title: "H! Anime", url: "https://hianimez.to/home", image: "https://picsum.photos/300/140?random=13" },
    { title: "Anime4U", url: "https://www.animes4u.com/", image: "https://picsum.photos/300/140?random=14" },
    { title: "Game Space", url: "https://poki.com/", image: "https://picsum.photos/300/140?random=15" },
  ];

  const handleRedirect = (url) => {
    window.location.href = url;
  };

  const containerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px",
    padding: "10px",
    backgroundColor: "black",
    minHeight: "100vh",
  };

  const cardStyle = {
    width: "100%",
    cursor: "pointer",
    borderRadius: "3px",
    overflow: "hidden",
    transition: "transform 0.2s",
    textAlign: "center",
    color: "white",
    backgroundColor: "black",
    border: "1px solid #333",
  };

  const imageStyle = {
    width: "100%",
    height: "140px",
    objectFit: "cover",
  };

  const titleStyle = {
    fontSize: "13px",
    fontWeight: "bold",
    margin: "8px 5px 12px 5px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  return (
    <div style={containerStyle}>
      {items.map((item, index) => (
        <div
          key={index}
          style={cardStyle}
          onClick={() => handleRedirect(item.url)}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
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
