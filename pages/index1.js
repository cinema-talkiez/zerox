import React from "react";

const Index1 = () => {
  const handleRedirect = (url) => {
    if (url) window.location.href = url;
  };

  const pageStyle = {
    backgroundColor: "black",
    minHeight: "100vh",
    padding: "10px",
  };

  const headingStyle = {
    display: "flex",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "white",
    marginBottom: "10px",
  };

  const cyanBarStyle = {
    width: "5px",
    height: "25px",
    backgroundColor: "#00D4FF",
    marginRight: "10px",
  };

  const containerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px",
    padding: "10px",
    marginBottom: "5px",
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
    border: "1px solid #00D4FF",
    WebkitTapHighlightColor: "transparent",
  };

  const imageStyle = {
    width: "100%",
    height: "140px",
    objectFit: "cover",
  };

  const titleStyle = {
    fontSize: "10px",
    fontWeight: "bold",
    margin: "8px 5px 10px 5px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    textTransform: "uppercase",
    letterSpacing: "1px",
  };

  return (
    <div style={pageStyle}>
    <div style={{
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  padding: '30px 10px 20px 10px',
  animation: 'fadeInUp 1s ease-out',
}}>
  <h1 style={{
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#00D4FF',
    textShadow: '0 0 10px #00D4FF, 0 0 20px #00D4FF, 0 0 40px #00D4FF',
    letterSpacing: '2px',
    fontVariant: "small-caps",
    marginBottom: '10px',
    animation: 'glow 2s ease-in-out infinite alternate',
  }}>
    Welcome to Cinema Talkiez
  </h1>
  <p style={{
    fontSize: '14px',
    color: '#ccc',
    maxWidth: '600px',
    animation: 'fadeIn 2s ease-in',
  }}>
    Stream or download the latest Telugu and dubbed movies from reliable sites. Pick your favorite and start watching today!
  </p>
</div>

<div>
        <div style={headingStyle}>
          <div style={cyanBarStyle}></div>
          Game Space
        </div>
        <div style={containerStyle}>
          <div
            style={cardStyle}
            onClick={() => handleRedirect("https://poki.com/")}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img src="/img/game1.jpg" alt="Ibomma" style={imageStyle} />
            <div style={titleStyle}>Poki</div>
          </div>

              <div
            style={cardStyle}
            onClick={() => handleRedirect("https://www.crazygames.com/")}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img src="/img/game2.png" alt="Movierulz" style={imageStyle} />
            <div style={titleStyle}>Crazy Games</div>
          </div>

            <div
            style={cardStyle}
            onClick={() => handleRedirect("https://google.com/")}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img src="/img/crime.jpg" alt="Movierulz" style={imageStyle} />
            <div style={titleStyle}>PlayHop</div>
          </div>

            
        </div>
      </div>

      {/* Downloads Section */}
      <div>
        <div style={headingStyle}>
          <div style={cyanBarStyle}></div>
          Movie Section
        </div>
        <div style={containerStyle}>
          <div
            style={cardStyle}
            onClick={() => handleRedirect("https://one.ibomma.foo/")}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img src="/img/ibomma.jpg" alt="Ibomma" style={imageStyle} />
            <div style={titleStyle}>Ibomma</div>
          </div>

            <div
            style={cardStyle}
            onClick={() => handleRedirect("https://www.moviezwap.farm/")}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img src="/img/moviezwap.jpg" alt="Moviezwap" style={imageStyle} />
            <div style={titleStyle}>Moviezwap</div>
          </div>

          <div
            style={cardStyle}
            onClick={() => handleRedirect("https://www.5movierulz.haus/")}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img src="/img/movierulz-website.jpg" alt="Movierulz" style={imageStyle} />
            <div style={titleStyle}>Movierulz</div>
          </div>

          
<div
            style={cardStyle}
            onClick={() => handleRedirect("https://netfree2.cc/mobile/home")}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img src="/img/netmirror.jpg" alt="Movieswood" style={imageStyle} />
            <div style={titleStyle}>NetMirror</div>
          </div>

          <div
            style={cardStyle}
            onClick={() => handleRedirect("https://telugupalakamovies.com/")}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img src="/img/telugupalaka.jpg" alt="Movierulz" style={imageStyle} />
            <div style={titleStyle}>Telugupalaka</div>
          </div>

          
          {/* Add more cards as needed... */}
        </div>
      </div>

      {/* Online Watching Section */}
      <div>
        <div style={headingStyle}>
          <div style={cyanBarStyle}></div>
          Anime & Cartoon Section
        </div>
        <div style={containerStyle}>
          <div
            style={cardStyle}
            onClick={() => handleRedirect("https://animerulz.net/home")}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img src="/img/A1.jpg" alt="Mirror" style={imageStyle} />
            <div style={titleStyle}>AnimeRulz</div>
          </div>
<div
            style={cardStyle}
            onClick={() => handleRedirect("https://watchanimeworld.in/")}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img src="/img/A2.jpg" alt="ESA Ibomma" style={imageStyle} />
            <div style={titleStyle}>Anime World</div>
          </div>

          <div
            style={cardStyle}
            onClick={() => handleRedirect("https://animedub.pro/home")}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img src="/img/A3.jpg" alt="Movierulz" style={imageStyle} />
            <div style={titleStyle}>Animedub</div>
          </div>

          <div
            style={cardStyle}
            onClick={() => handleRedirect("https://anihub.in/")}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img src="/img/A4.jpg" alt="Moviezwap" style={imageStyle} />
            <div style={titleStyle}>Toons Hub</div>
          </div>

          <div
            style={cardStyle}
            onClick={() => handleRedirect("https://toonshub.xyz/")}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img src="/img/A4.jpg" alt="Moviezwap" style={imageStyle} />
            <div style={titleStyle}>Toons Hub</div>
          </div>
          <div
            style={cardStyle}
            onClick={() => handleRedirect("https://toonworld4all.me/")}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img src="/img/A5.jpg" alt="Toonworld4all" style={imageStyle} />
            <div style={titleStyle}>Toonworld4all</div>
          </div>
<div
            style={cardStyle}
            onClick={() => handleRedirect("https://hianime.pe/home")}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img src="/img/A6.jpg" alt="ESA Ibomma" style={imageStyle} />
            <div style={titleStyle}>H! Anime</div>
          </div>

          <div
            style={cardStyle}
            onClick={() => handleRedirect("https://9anime.org.lv/")}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img src="/img/A7.jpg" alt="Movierulz" style={imageStyle} />
            <div style={titleStyle}>9anime</div>
          </div>

          <div
            style={cardStyle}
            onClick={() => handleRedirect("https://zorotv.com.in/")}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img src="/img/A8.jpg" alt="Moviezwap" style={imageStyle} />
            <div style={titleStyle}>Zoro TV</div>
          </div>

          {/* Add more cards with manual images here */}
        </div>
      </div>
    </div>
  );
};

export default Index1;
