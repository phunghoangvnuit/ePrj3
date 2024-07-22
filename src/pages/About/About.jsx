import './About.css';
import FeatureCard from './FeatureCard';
import Footer from '../footer/footer.jsx';

const About = () => {
  return(
    <>
      <div className="AboutUsSection">
        <div className="header-title">
          <div className="decor-line">
            <div></div>
            <div></div>
          </div>
          <h1>About Us</h1>
        </div>
        <div className="feature-card-container">
          <FeatureCard image='/Asset 4_p.png' title="Lifetime Warranty" brief="The lifetime warranty covers all the cleaning and tightening services and the loss of accent diamonds, assuming the loss was not the result of damage. However, even with the warranty, it's critical to have your jewelry insured in the event of loss, damage, or theft."/>
          <FeatureCard image='/Asset 3_p.png' title="Expert Advice" brief="Our knowledgeable staff is always available to provide personalized recommendations, answer any questions, and assist you in finding the perfect piece for any occasion. Chat with us now."/>
          <FeatureCard image='/Asset 2_p.png' title="Requests & Replacements" brief="Lost a favorite earring or need to match a necklace with a new pendant? Our extensive inventory and custom design capabilities make finding replacements or complementary pieces effortless. Chat with an expert now to get started."/>
          <FeatureCard image='/Asset 0_p.png' title="Cleaning & Maintenance" brief="Keep your jewelry sparkling like new with our professional cleaning and maintenance services. Walk in anytime – no appointment necessary. You don't have to purchase jewelry from us to benefit from these services."/>
        </div>
        <div className="aboutUs-bottom">
          <div className="feedback-container">
            <div className="left"><img src='/feedback_01.webp' alt="feedback-image" /></div>
            <div className="feedback-content"><p>Buying A Diamond Is One Of The Biggest Decisions Of Your Life. We Will Eliminate All The Confusion From This Experience And Guide You Through This Process To Ensure You Find The Right Diamond You Love.<br/><br/><span>— Itay Berger, President</span></p></div>
            <div className="right"><img src='/feedback_02.webp' alt="feedback-image" /></div>
          </div>

        </div>
      </div>
      <Footer/>
    </>
  );
};

export default About;
