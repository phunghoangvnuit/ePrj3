import { useState } from 'react';
import {Form, Input, Button, Rate, notification, Tag, Modal, Row, Col, Upload, Select} from 'antd';
import './Comment.css';
const { Option } = Select;
const { TextArea } = Input;

const Comment = () => {
  const [form] = Form.useForm();
  const [rating, setRating] = useState(0);
  const [submittedComment, setSubmittedComment] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filterType, setFilterType] = useState('all');

  const handleSubmit = (values) => {
    const commentData = { ...values, rating };
    setSubmittedComment(commentData);
    notification.success({
      message: 'Đánh giá thành công!',
      description: 'Cảm ơn bạn đã gửi đánh giá.',
    });
    form.resetFields();
    setRating(0);
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const purchased = true;
  const handleFilterChange = (filter) => {
    setFilterType(filter);
  };
  return (
    <div id="comment-container">
      <h2>Đánh giá từ khách hàng</h2>
      <Row style={{ borderBottom: '1px solid' }}>
        <Col span={16}>
          <Col span={24}>
            <span className="score">5.0</span>
            <Rate disabled defaultValue={5} />
          </Col>
          <Col span={24}>
            <strong>Tổng cộng 3 đánh giá từ khách hàng</strong>
          </Col>
          <Button type="primary" onClick={showModal} style={{ marginTop: '10px', marginBottom: '20px' }}>Viết đánh giá</Button>
        </Col>
        <Col span={8}>
          <Row>
            <Col span={24}>
              <Input.Group compact>
                <Button
                  className={filterType === 'all' ? 'button-evaluate' : 'default'}
                  onClick={() => handleFilterChange('all')}
                  style={{ height: '55px' }}
                >
                  Tất cả đánh giá
                </Button>
                <Button
                  className={filterType === 'images' ? 'button-evaluate' : 'default'}
                  onClick={() => handleFilterChange('images')}
                  style={{ height: '55px' }}
                >
                  Hình ảnh/video
                </Button>
                <Select
                  placeholder="Chọn sao"
                  style={{ height: '55px', width:'130px', textAlign: 'center'}}
                  defaultValue={5}
                >
                  {[1, 2, 3, 4, 5].map(star => (
                    <Option key={star} value={star}>
                      {[...Array(star)].map((_, i) => (
                        <img key={i} src='/Star.svg' alt="star" style={{ width: '16px', height: '16px' }}/>
                      ))}
                    </Option>
                  ))}
                </Select>
              </Input.Group>
            </Col>
          </Row>

        </Col>
      </Row>
      <Modal
        title={
          <h5 style={{ textAlign: 'center' }}>
            Tên sản phẩm
          </h5>
        }
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="title"
            label="Họ và tên"
            rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
          >
            <Input placeholder="Nhập họ và tên" />
          </Form.Item>

          <Form.Item
            name="comment"
            label="Chia sẻ của bạn về sản phẩm"
            rules={[{ required: true, message: 'Vui lòng nhập bình luận của bạn!' }]}
          >
            <TextArea rows={4} placeholder="Nhập bình luận của bạn" />
          </Form.Item>

          <Form.Item
            label="Đánh giá sao"
          >
            <Rate
              allowHalf
              value={rating}
              onChange={(value) => setRating(value)}
              className="rating-star"
            />
          </Form.Item>

          <Form.Item
            label="Tải lên hình ảnh"
            className='upload-img-commet'
          >
            <Upload
              listType="picture-card"
              showUploadList={false}
              accept="image/*"
            >
              Tải lên hình ảnh
            </Upload>
          </Form.Item>
          <Form.Item className="submit-button">
            <Button type="primary" htmlType="submit">
              Gửi Đánh Giá
            </Button>
          </Form.Item>
        </Form>
      </Modal>

        <div className="review">
          <div className="review-header">
            <div className="review-name">Hải Giáp</div>
            <Rate disabled defaultValue='5' />
          </div>
          <div className="review-time">
            8 phút <Tag color="green">{purchased ? 'Đã mua' : 'Chưa mua'}</Tag>
          </div>
          <div className="review-text">
            sssssss
          </div>
        </div>
    </div>
  );
};

export default Comment;
