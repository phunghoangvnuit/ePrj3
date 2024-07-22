import Slider from 'react-slick';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import './SearchTrends.css';
import {Link} from "react-router-dom";

const SearchTrends = () => {
  const trends = [
    {
      id: 1,
      imgSrc: '/Gold-jewelry.png',
      text: 'Gold jewelry',
      url: '/shop/Gold'
    },
    {
      id: 2,
      imgSrc: '/Silver-jewelry.png',
      text: 'Silver jewelry',
      url: '/shop/silver'

    },
    {
      id: 3,
      imgSrc: '/Wedding-ring.png',
      text: 'Wedding ring',
      url: '/shop/Weddingring'
    },
    {
      id: 4,
      imgSrc: '/Necklace.png',
      text: 'Necklace',
      url: '/shop/Necklace'
    },
    {
      id: 5,
      imgSrc: '/Diamond-ring.png',
      text: 'Diamond ring',
      url: '/shop/Diamondring'
    },
    {
      id: 6,
      imgSrc: '/Diamond-earrings.png',
      text: 'Diamond earrings',
      url: '/shop/Diamondearrings'
    },
    {
      id: 7,
      imgSrc: '/Golden-ring.png',
      text: 'Golden ring',
      url: '/shop/Goldenring'
    },
  ];

  const NextArrow = ({ onClick }) => {
    return (
      <div className="custom-arrow next-arrow" onClick={onClick}>
        <RightOutlined />
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div className="custom-arrow prev-arrow" onClick={onClick}>
        <LeftOutlined />
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 350,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div id="Search-trends">
      <div className="align-fomloyout">
        <div className="options">
          <h1>Search Trends</h1>
        </div>
        <Slider {...settings}>
          {trends.map((item) => (
            <div key={item.id}>
              <Link to={item.url}>
                <div className="trends-img">
                  <img src={item.imgSrc} alt="trends"/>
                </div>
                <p>{item.text}</p>
              </Link>

            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SearchTrends;
