import './FeatureCard.css';

const FeatureCard = (props) => {
  return(
    <div className="feature-card">
      <img src={props.image} alt="feature-image" />
      <div className="feature-info">
        <h1 className="feature-title">{props.title}</h1>
        <p className="feature-brief">{props.brief}</p>
      </div>
    </div>
  );
}

export default FeatureCard;