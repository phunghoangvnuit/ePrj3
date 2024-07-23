import { useEffect, useState } from 'react';
import './header.css';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GrMapLocation } from "react-icons/gr";
import { PiPhoneTransferLight } from "react-icons/pi";
import { Col, Row } from "antd";
import Logout from "../../pages/Logout/Logout.jsx";
import { useSelector } from 'react-redux';
import logo from './img/pnj.com.vn.png';

const Header = () => {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isLogined = useSelector(state => state.auth.isLoggedIn);
  const [loginStatus, setLoginStatus] = useState(isLogined);

  const toggleSearchBar = () => {
    setSearchVisible(!isSearchVisible);
    if (!isSearchVisible) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  };

  useEffect(() => {
    setLoginStatus(isLogined);
  }, [isLogined]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchKeyword) {
      navigate(`/shop/${searchKeyword}`);
    } else {
      navigate(`/shop`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <>
      <Row className={`header ${isScrolled ? 'background' : ''}`}>
        <Col span={24}>
          <div className="headerAlt">
            <div className='icon-header-item'>
              <div className='icon-header'>
              <svg width="35px" height="35px" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="#000000" stroke-width="0.72" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" stroke="#000000" stroke-width="0.72" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                Store Location
              </div>
              <div className='icon-header'>
              <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14.3308 15.9402L15.6608 14.6101C15.8655 14.403 16.1092 14.2384 16.3778 14.1262C16.6465 14.014 16.9347 13.9563 17.2258 13.9563C17.517 13.9563 17.8052 14.014 18.0739 14.1262C18.3425 14.2384 18.5862 14.403 18.7908 14.6101L20.3508 16.1702C20.5579 16.3748 20.7224 16.6183 20.8346 16.887C20.9468 17.1556 21.0046 17.444 21.0046 17.7351C21.0046 18.0263 20.9468 18.3146 20.8346 18.5833C20.7224 18.8519 20.5579 19.0954 20.3508 19.3L19.6408 20.02C19.1516 20.514 18.5189 20.841 17.8329 20.9541C17.1469 21.0672 16.4427 20.9609 15.8208 20.6501C10.4691 17.8952 6.11008 13.5396 3.35083 8.19019C3.03976 7.56761 2.93414 6.86242 3.04914 6.17603C3.16414 5.48963 3.49384 4.85731 3.99085 4.37012L4.70081 3.65015C5.11674 3.23673 5.67937 3.00464 6.26581 3.00464C6.85225 3.00464 7.41488 3.23673 7.83081 3.65015L9.40082 5.22021C9.81424 5.63615 10.0463 6.19871 10.0463 6.78516C10.0463 7.3716 9.81424 7.93416 9.40082 8.3501L8.0708 9.68018C8.95021 10.8697 9.91617 11.9926 10.9608 13.04C11.9994 14.0804 13.116 15.04 14.3008 15.9102L14.3308 15.9402Z" stroke="#000000" stroke-width="0.6" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                0338 69 54 56
              </div>
            </div>
            <div>
              <img style={{width: "88px"}} src={logo}/>
            </div>
            <div className="header-img-icom">
              {loginStatus ? (
                <Logout />
              ) : (
                <Link className="p-2 support-item" to='/login'>
                  <svg aria-hidden="true" fill="none" focusable="false" width="24" class="header__nav-icon icon icon-account" viewBox="0 0 18 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9 10A5 5 0 1 0 9 0a5 5 0 0 0 0 10Zm0-1a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" fill="currentColor"></path><path d="M17 20c0-4.411-3.589-8-8-8s-8 3.589-8 8H0a9 9 0 0 1 9-9 9 9 0 0 1 9 9h-1Z" fill="currentColor"></path></svg>
                </Link>
              )}
              <svg onClick={toggleSearchBar} aria-hidden="true" fill="none" focusable="false" width="28" class="header__nav-icon icon icon-search" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.387 2.387A8.156 8.156 0 0 1 8.159 0v.01c2.09 0 4.182.796 5.773 2.387 3.063 3.063 3.177 7.97.342 11.17l6.08 6.08-.707.707-6.08-6.08a8.149 8.149 0 0 1-5.408 2.044 8.138 8.138 0 0 1-5.772-2.386 8.175 8.175 0 0 1 0-11.545Zm10.82.724A7.097 7.097 0 0 0 8.16 1.02a7.098 7.098 0 0 0-5.048 2.09 7.147 7.147 0 0 0 0 10.098 7.098 7.098 0 0 0 5.048 2.09 7.097 7.097 0 0 0 5.048-2.09 7.097 7.097 0 0 0 2.091-5.049 7.098 7.098 0 0 0-2.09-5.048Z" fill="currentColor"></path></svg>
              <Link to='/cart' className="p-2 support-item">
                <svg aria-hidden="true" fill="none" focusable="false" width="26" class="header__nav-icon icon icon-cart" viewBox="0 0 19 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.5 6h-4V4c0-1.4-.9-4-4-4-3.2 0-4 2.6-4 4v2h-4l-1 14h18l-1-14Zm-11-2c0-.3.1-3 3-3s3 2.9 3 3v2h-6V4ZM1.6 18.9 2.5 7h14l.9 11.9H1.6Z" fill="currentColor"></path></svg>
              </Link>
            </div>
          </div>
        </Col>
        <Col span={24} className="headerSection">
          <div className="headerBottom">
            <div className="headerBottom-middle">
              <Link to='/' className={`nav-link ${isActive('/')}`}>
                <p>Home</p>
              </Link>
              <Link to='/shop' className={`nav-link ${isActive('/shop')}`}>
                <p>Shop</p>
              </Link>
              <Link to='/about' className={`nav-link ${isActive('/about')}`}>
                <p>About Us</p>
              </Link>
              <Link to='/contact' className={`nav-link ${isActive('/contact')}`}>
                <p>Contact Us</p>
              </Link>
              <Link to='/blog' className={`nav-link ${isActive('/blog')}`}>
                <p>Blog</p>
              </Link>
            </div>
          </div>
          <div className={`search-bar ${isSearchVisible ? 'show' : ''}`}>
            <SearchOutlined onClick={handleSearch} className="search-icon"/>
            <input
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="SEARCH..."
              className="search-input"/>
            <CloseOutlined className="close-icon" onClick={toggleSearchBar}/>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default Header;
