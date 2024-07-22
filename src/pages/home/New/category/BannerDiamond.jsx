import { Row, Col, Card, Typography } from 'antd';
import './BannerDimond.css'
const { Title, Text } = Typography;
import { Link } from 'react-router-dom';

const BannerDiamond = () => {
  return (
    <div className="diamond-info">
      <Row justify="center" align="middle">
        <Col span={12} style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Title level={2}>About our lab-grown diamonds</Title>
          <Text>
            Our pioneering Lightbox Lab in Portland, Oregon, can grow a 1 carat stone in about two weeks, entirely from 100% renewable wind power.
          </Text>
          <br />
          <Text>
            What’s more, our state-of-the-art technology can alter the chemistry of the growing process to create lab-grown diamonds not just in white, but also in blue and pink.
          </Text>
          <br />
          <Link to="/shop/diamonds">View diamond products</Link>
        </Col>
        <Col span={12} style={{ textAlign: 'center' }}>
          <img src="/img-BannerDiamond1.webp" alt="Lab-grown diamonds" className="main-image" />
        </Col>
      </Row>
      <Row gutter={[16, 16]} justify="center" style={{ marginTop: '2rem' }}>
        <Col xs={24} sm={12} md={6}>
          <Card  cover={<img alt="Visit the lab" src="/img-BannerDiamond2.webp" />}>
            <Card.Meta title="Visit the lab" />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card  cover={<img alt="Our quality" src="/img-BannerDiamond3.webp" />}>
            <Card.Meta title="Our quality" />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card  cover={<img alt="Our pricing" src="/img-BannerDiamond4.webp" height={100}/>}>
            <Card.Meta title="Our pricing" />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card  cover={<img alt="Environmental Impact" src="/img-BannerDiamond5.webp" />}>
            <Card.Meta title="Environmental Impact" />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default BannerDiamond;
