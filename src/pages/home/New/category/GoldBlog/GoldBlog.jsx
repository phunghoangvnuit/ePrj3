import { Row, Col } from 'antd';
import './GoldBlog.css'
import {Link} from "react-router-dom";
const GoldBlog = () => {
  return (
    <div className="GoldBlog">
      <Row>
        <Col span={12} className="text-section">
          <div className="heading">TO GET STARTED</div>
          <h1>Book an appointment</h1>
          <p>
            Our first interaction is just about getting to know each other. We don’t believe in making hasty decisions or pressuring our clients. Ease into the process at your own speed and see what we have to offer.
          </p>
          <Link to='/contact'>
            <button type="primary" className="contact-button">Contact Us</button>
          </Link>
        </Col>
        <Col span={12} className="image-section">
          <img src="/gold-blogs.webp" alt="Jewelry" className="jewelry-image" />
        </Col>
      </Row>
    </div>
  );
};

export default GoldBlog;
