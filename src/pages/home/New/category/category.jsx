import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './category.css';
import { getProductbyCategory } from '../../../../Auth/Services/ProductService';
import Loader from "../../../../components/loader/Loader";
import { Link } from 'react-router-dom';
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import Slider from "react-slick";
import { Card, Rate } from 'antd';
import { MdOutlineAdd } from "react-icons/md";
import BannerDiamond from "./BannerDiamond.jsx";
import GoldBlog from "./GoldBlog/GoldBlog.jsx";
import Silver from "./Silver/Silver.jsx";
const Category = ({ categoryId, categoryName }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null); // Create a ref for the Slider component

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProductbyCategory([categoryId.toString()], 1, 20);
        if (response && response.errorCode === 200) {
          setProducts(response.content.data);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  const getRandomProducts = (products) => {
    let shuffled = products.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(products.length, 5));
  };

  const randomProducts = getRandomProducts(products);

  if (loading) {
    return <Loader />;
  }

  if (products.length < 1) {
    return null;
  }

  const NextArrow = () => (
    <div onClick={() => sliderRef.current.slickNext()}>
      <GoArrowRight size={30} />
    </div>
  );

  const PrevArrow = () => (
    <div onClick={() => sliderRef.current.slickPrev()}>
      <GoArrowLeft size={30} />
    </div>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(4, products.length),
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(3, products.length),
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(2, products.length),
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div id='best-seller'>
      {categoryName.toLowerCase().includes('diamond') && <BannerDiamond />}
      {categoryName.toLowerCase().includes('gold') && <GoldBlog />}
      {categoryName.toLowerCase().includes('silver') && <Silver />}
      <div className="align-fomloyout">
        <div className="options">
          <h1>{categoryName} Products</h1>
        </div>
        <Slider ref={sliderRef} {...settings}>
          {randomProducts.map(product => (
            <div key={product.id} className='layout'>
              <Card
                cover={
                  <div className="image-wrapper">
                    <img className='diamond-image' alt={product.name} src={product.image[0]} />
                    <img className='diamond-image-hover' alt={product.name} src={product.image[1]} />
                    <Link to='/cart'>
                      <MdOutlineAdd className="add-icon" />
                    </Link>
                  </div>
                }
                actions={[]}
                className="diamond-card"
              >
                <Card.Meta
                  title={
                    <Link to={`/Product/${product.id}`}>
                      {product.title}
                    </Link>
                  }
                  description={`${product.price.toLocaleString()}/$`}
                />
                <div className="diamond-rating">
                  <Rate disabled defaultValue={5} />
                </div>
              </Card>
            </div>
          ))}
        </Slider>
        <div className="arrow-container">
          <PrevArrow />
          <NextArrow />
        </div>
        <Link to='/shop'>
          <button className='all-button'>Xem tất cả</button>
        </Link>
      </div>
    </div>
  );
};

Category.propTypes = {
  categoryId: PropTypes.number.isRequired,
  categoryName: PropTypes.string.isRequired,
};

export default Category;
