import { Helmet } from "react-helmet";
import "./Home.css";

function Home() {
  return (
    <div>
      <Helmet>
        <title>Mariia webshop - Home</title>
      </Helmet>
      <div className="shopping">
        <img src="media/image.jpg" alt="shopping" />
      </div>
      <div className="videoDiv">
        <video id="video" autoplay muted loop>
          <source src="media/production_video.mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
      </div>
    </div>
  );
}

export default Home;
