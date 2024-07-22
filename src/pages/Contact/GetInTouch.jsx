import { Fragment } from 'react';
import './GetInTouch.css'

const GetInTouch = () => {
  return(
    <div className="contactContainer">
      <div className="getInTouchContainer">
        <div className="getInTouchTitle">
          <h1>{'Get In Touch'}</h1>
          <p>{'Looking for help? Fill the form and start a new adventure.'}</p>
        </div>
        <div className="getInTouchInfo">
          <h5>{'Headquaters'}</h5>
          <p>{'8A, Ton That Thuyet, My Dinh, Tu Liem, Hanoi, Vietnam'}</p>
        </div>
        <div className="line"></div>
        <div className="getInTouchInfo">
          <h5>{'Phone'}</h5>
          <p>{'(+84) 0987.396.061'}</p>
          <p>{'(+84) 0338.69.5456'}</p>
        </div>
        <div className="line"></div>
        <div className="getInTouchInfo">
          <h5>{'Support'}</h5>
          <p>{'phunghoangvnuit@gmail.com'}</p>
          <p>{'phunghoangfpt.edu@gmail.com'}</p>
        </div>
        <div className="line"></div>
        <div className="getInTouchInfo">
          <h5>{'Social Networks'}</h5>
          <div className="socialNetworkContact">
            <a href="#"><div><i className="fa-brands fa-facebook-f"></i></div></a>
            <a href="#"><div><i className="fa-brands fa-instagram"></i></div></a>
            <a href="#"><div><i className="fa-brands fa-twitter"></i></div></a>
          </div>
        </div>
      </div>
      <div className="contactMap">
        {/* <h5>{'Location Map'}</h5> */}
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.097299083215!2d105.77946271130983!3d21.02879248053983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab86cece9ac1%3A0xa9bc04e04602dd85!2zRlBUIEFwdGVjaCBIw6AgTuG7mWkgLSBI4buHIFRo4buRbmcgxJDDoG8gVOG6oW8gTOG6rXAgVHLDrG5oIFZpw6puIFF14buRYyBU4bq_IChTaW5jZSAxOTk5KQ!5e0!3m2!1svi!2s!4v1685156833043!5m2!1svi!2s" style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  );
}
export default GetInTouch