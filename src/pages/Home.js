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
    </div>
  );
}

export default Home;
