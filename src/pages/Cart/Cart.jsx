import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Row, Col, Select, Input, Divider, Typography, notification, Space } from 'antd';
import {MinusOutlined, PlusOutlined, DeleteOutlined, CloseOutlined} from '@ant-design/icons';
import './cart.css';

const { Text } = Typography;
const { Option } = Select;

const Cart = () => {
    const [cart, setDataCart] = useState([]);
    const navigate = useNavigate();

    const goToCheckOut = async () => {
        if (cart.length < 1) {
            notification.error({
                message: 'Giỏ hàng của bạn rỗng',
                duration: 3
            });
            return;
        }
        navigate("/checkout");
    }

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setDataCart(cart);
    }, []);

    const handleQuantityChange = (id, change) => {
        const cartList = JSON.parse(localStorage.getItem('cart')) || [];
        const item = cartList.find(x => x.product_id === id);

        if (item) {
            if (change === 1) {
                item.soluong += 1;
            } else if (change === -1 && item.soluong > 1) {
                item.soluong -= 1;
            } else if (change === -1 && item.soluong <= 1) {
                notification.error({
                    message: 'Thông báo',
                    description: 'Phải có ít nhất 1 sản phẩm',
                    duration: 3
                });
                return;
            }

            item.total = Math.round(item.soluong * item.price);
            localStorage.setItem('cart', JSON.stringify(cartList));
            setDataCart(cartList);
        }
    };

    const TotalMoney = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        return cart.reduce((acc, item) => acc + (item.soluong * item.price), 0);
    };

    const Delete = (id) => {
        const cartList = JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCart = cartList.filter(item => item.product_id !== id);
        setDataCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    return (
      <div className='cart-container'>
          <Row gutter={16}>
              <Col span={16}>
                  <h3>Shopping Cart</h3>
                  {cart.map(item => (
                    <Card key={item.product_id} className="mb-3">
                        <Card.Meta
                          description={
                              <Row align="middle" gutter={16}>
                                  <Col span={10}>
                                      <img src={item.image} alt={item.product_name}
                                           style={{width: '100px', marginRight: '20px'}}/>
                                      <strong>{item.product_name}</strong>
                                  </Col>
                                  <Col span={8} className='quantity-cart'>
                                      <Button
                                        icon={<MinusOutlined/>}
                                        onClick={() => handleQuantityChange(item.product_id, -1)}
                                        disabled={item.soluong <= 1}
                                      />
                                      <Text>{item.soluong}</Text>
                                      <Button
                                        icon={<PlusOutlined/>}
                                        onClick={() => handleQuantityChange(item.product_id, 1)}
                                      />
                                  </Col>
                                  <Col span={4}>
                                      <Text strong>${item.total}</Text>
                                  </Col>
                                  <Col span={2}>
                                      <Button
                                        icon={<CloseOutlined/>}
                                        type="danger"
                                        onClick={() => Delete(item.product_id)}
                                      />
                                  </Col>
                              </Row>
                          }
                        />
                    </Card>
                  ))}
                  <Button type="link" onClick={() => window.history.back()}>← Back to shop</Button>
              </Col>
              <Col span={8}>
                  <Card>
                      <Text strong>Summary</Text>
                      <Divider/>
                      <Row gutter={[12, 12]}>
                          <Col>
                              <Text>ITEMS</Text>
                          </Col>
                          <Col>
                              <Text strong>$ {TotalMoney()}</Text>
                          </Col>
                      </Row>
                      <Divider/>
                      <Row justify="space-between" align="middle">
                          <Col>
                              <Text>SHIPPING</Text>
                          </Col>
                          <Col>
                              <Select defaultValue="Standard-Delivery" style={{width: 185}}>
                                  <Option value="Standard-Delivery">Standard-Delivery</Option>
                              </Select>
                          </Col>
                      </Row>
                      <Divider/>
                      <Row justify="space-between" align="middle">
                          <Col>
                              <Text>GIVE CODE</Text>
                          </Col>
                          <Col>
                              <Input placeholder="Enter your code"/>
                          </Col>
                      </Row>
                      <Divider/>
                      <Row justify="space-between" align="middle">
                          <Col>
                              <Text strong>TOTAL PRICE</Text>
                          </Col>
                          <Col>
                              <Text strong>$ {TotalMoney()}</Text>
                          </Col>
                      </Row>
                      <div className='button-order' onClick={goToCheckOut}>
                          <span>Checkout</span>
                      </div>
                  </Card>
                  <div className="payment_methods_container">
                      <p>Payment Methods:</p>
                      <div className="payment_methods_icons">
                          <img src='/visa.svg' alt="visa_icon"/>
                          <img src='/mastercard.svg' alt="master_card_icon"/>
                          <img src='/jcb.svg' alt="jcb_icon"/>
                      </div>
                  </div>
              </Col>

          </Row>
      </div>
    );
};

export default Cart;
