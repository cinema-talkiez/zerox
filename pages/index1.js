import React from "react";

const Index1 = () => {
  const handleRedirect = (url) => {
    window.location.href = url;
  };

  const buttonStyle = {
    padding: "12px 16px",
    fontSize: "14px",
    fontWeight: "bold",
    cursor: "pointer",
    border: "none",
    backgroundColor: "#007bff",
    color: "white",
    borderRadius: "5px",
    transition: "0.3s",
    width: "45%", // Ensures two buttons per row
    maxWidth: "200px",
    textAlign: "center",
  };

  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100vh",
    gap: "10px",
    padding: "10px",
    maxWidth: "420px", // Prevents buttons from stretching too wide
    margin: "0 auto", // Centers the container
  };

  return (
    <div style={containerStyle}>
      <button style={buttonStyle} onClick={() => handleRedirect("https://esa.ibomma.day/")}>ESA Ibomma</button>
      <button style={buttonStyle} onClick={() => handleRedirect("https://netfree.cc/mobile/home/")}>Mirror</button>
      <button style={buttonStyle} onClick={() => handleRedirect("https://www.moviezwap.pub/")}>Moviezwap</button>
      <button style={buttonStyle} onClick={() => handleRedirect("https://movieswood.cloud/")}>Movieswood</button>
      <button style={buttonStyle} onClick={() => handleRedirect("https://anime-world.co/")}>Anime World</button>
      <button style={buttonStyle} onClick={() => handleRedirect("https://animedub.pro/")}>AnimeDub</button>
      <button style={buttonStyle} onClick={() => handleRedirect("https://9anime.org.lv/")}>9Anime</button>
      <button style={buttonStyle} onClick={() => handleRedirect("https://zorotv.com.in/")}>ZoroTV</button>
      <button style={buttonStyle} onClick={() => handleRedirect("https://telugupalakamovies.com/")}>TeluguPalakaMovies</button>
      <button style={buttonStyle} onClick={() => handleRedirect("https://crex.live/")}>Crex Live</button>
      <button style={buttonStyle} onClick={() => handleRedirect("https://m.cricbuzz.com/")}>Cricbuzz</button>
      <button style={buttonStyle} onClick={() => handleRedirect("https://www.5movierulz.ag/")}>5Movierulz</button>
      <button style={buttonStyle} onClick={() => handleRedirect("/index2")}>Go to Index2</button>
    </div>
  );
};

export default Index1;
