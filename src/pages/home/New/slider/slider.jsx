import './slider.css';
import { Link } from "react-router-dom";

function HomeSlider() {
  return (
    <div className='home-slider'>
      <video
        className="video-background"
        src="/video-home.mp4"
        autoPlay
        muted
        loop
      />
      <div className="video-caption">
        <h3>JEWELRY STORE PNJ</h3>
        <Link to='/shop'>
          <p>DISCOVER</p>
        </Link>
      </div>
    </div>
  );
}

export default HomeSlider;
