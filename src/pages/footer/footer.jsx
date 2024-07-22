import './footer.css';
import logo from './img/PNJ-Logo.png';
import fb_icon from './img/facebook.svg';
import ins_icon from './img/instagram.svg';
import yt_icon from './img/youtube.svg';
import email_icon from './img/email.svg';
import visa_icon from './img/visa.svg';
import master_icon from './img/mastercard.svg';
import jcb_icon from './img/jcb.svg';
import cert from './img/op-da-thong-bao-bo-cong-thuong-183x60.png'

const Footer = () => {
  return(
    <div className="footerSection">
      <div className="footerTop">
        <div className="col-type1">
          <div className="row1">
            <img className="logo" src={logo} alt="logo"/>
            <h2>© 2024 Yash Gems & Jewelries Joint Stock Company</h2>
          </div>
          <div className="row2">
            <p>8th, Ton That Thuyet, My Dinh, Nam Tu Liem, Ha Noi</p>
            <p>Tel: <span>033 869 5456</span> - Fax: <span>098 739 6061</span></p>
          </div>
          <p className="row3"><span>Business Registration Certificate: 0300521758</span> issued by the Department of Planning and Investment of Hanoi for the first time on July 7, 2024. <span>Business Model</span></p>
          <div className="row4">
            <p>Support Hotline {"(08:00 - 21:00, Free Call)"}</p>
            <p>Hotline 1: <span>0338695456</span> {"(Button 1)"}</p>
            <p>Hotline 2: <span>0987396061</span> {"(Button 2)"}</p>
          </div>
        </div>

        <div className="col-type2">
          <div className="col-type2-sub">
            <h3>About YGJ</h3>
            <p>YGJ Story</p>
            <p>Recruitment</p>
            <p>Export</p>
            <p>Wholesale business</p>
            <p>Diamond testing</p>
            <p>Gold bar trading</p>
          </div>

          <div className="col-type2-sub">
            <h3>Policy</h3>
            <p>Refund Policy</p>
            <p>Delivery Policy</p>
            <p>Warranty Exchange Policy</p>
            <p>Customer Loyalty Policy</p>
            <p>Customer Information Policy</p>
          </div>

          <div className="col-type2">
            <div className="col-type2-sub">
              <h3>Connect With Us</h3>
              <div className="social-link">
                <img src={fb_icon} alt="facebook"/>
                <img src={ins_icon} alt="instagram"/>
                <img src={yt_icon} alt="youtube"/>
                <img src={email_icon} alt="email"/>
              </div>
            </div>

            <div className="col-type2-sub">
              <h3>Payment Methods</h3>
              <div className="payment-link">
                <img src={visa_icon} alt="visa"/>
                <img src={master_icon} alt="masterCard"/>
                <img src={jcb_icon} alt="jcb"/>
              </div>
              <img className="cert" src={cert} alt="certification"/>
            </div>
          </div>
        </div>
      </div>
      <div className="footerBottom">
        © 2024 Yash Gems & Jewelries. All rights reserved. FPT Aptech T2301E
      </div>
    </div>
  );
}

export default Footer
