import { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import Swal from 'sweetalert2';
import './checkout.css';
import {Col , Row} from "antd";

const Checkout = () => {
    const [selectedProductIds, setSelectedProductIds] = useState([]);
    const [checkBox, setCheckBox] = useState(null);
    const [nganhang, setNganhang] = useState("");
    const [createPayment, setCreatePayment] = useState({
        paymentContent: "",
        paymentCurrency: "",
        paymentRefId: 0,
        paymentAmount: 0.0,
        paymentDate: null,
        expireDate: null,
        paymentLanguage: "",
        merchantId: 0,
        paymentDestinationId: 0,
        signature: ""
    });

    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: '',
        zip: '',
        addCode: '',
        name: ''
    });

    const [formErrors, setFormErrors] = useState({});
    const [cart, setCart] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
        const total = storedCart.reduce((acc, item) => acc + (item.soluong * item.price), 0);
        setTotalAmount(total);
    }, []);

    const validateForm = () => {
        const errors = {};
        if (!formValues.firstName) errors.firstName = 'First name is required';
        if (!formValues.lastName) errors.lastName = 'Last name is required';
        if (!formValues.phone) errors.phone = 'Phone is required';
        if (!formValues.email) errors.email = 'Email is required';
        if (!formValues.address) errors.address = 'Address is required';
        if (!formValues.zip) errors.zip = 'Zip is required';
        if (!formValues.addCode) errors.addCode = 'Add code is required';
        if (!formValues.name) errors.name = 'Name is required';

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormValues({
            ...formValues,
            [id]: value
        });
    };

    const handlePaymentChange = (e) => {
        setNganhang(e.target.value);
    };

    const ThanhToan = async () => {
        if (!validateForm()) {
            Swal.fire({
                title: "Error",
                text: "Please fill out all required fields",
                icon: "error",
                duration: 5000
            });
            return;
        }

        const now = moment();
        setCreatePayment(prev => ({
            ...prev,
            paymentDate: now.format(),
            expireDate: now.add(1, 'day').format()
        }));

        try {
            if (nganhang === "") {
                const response = await axios.post(`${hostname}/api/Order/AddDonHangXuLy`, selectedProductIds, getTokenConfig());
                const updateCart = cart.filter(item => !selectedProductIds.includes(item.product_id));
                setCart(updateCart);
                localStorage.setItem('cart', JSON.stringify(updateCart));
                setSelectedProductIds([]);
                Swal.fire({
                    title: "Thông báo",
                    text: "Đang đợi xét duyệt đơn hàng",
                    icon: "success",
                    duration: 5000
                });
            } else {
                const paymentData = {
                    ...createPayment,
                    paymentContent: "Thanh toán Online",
                    paymentCurrency: "VND",
                    paymentRefId: 1,
                    paymentAmount: totalAmount,
                    paymentLanguage: "vn",
                    merchantId: 2,
                    paymentDestinationId: nganhang === "zalopay" ? 2 : 1,
                    signature: "qwerty"
                };

                const response = await axios.post(`https://localhost:44382/api/Payments/Create`, paymentData);
                console.log(response);
                window.location.href = `${response.data.data.paymentUrl}`;
            }
        } catch (error) {
            if (error.response) {
                Swal.fire(error.response.data);
            }
        }
    };

    const isChecked = (index) => checkBox === index;

    const thanhToanOnline = (type, index) => {
        setNganhang(type);
        setCheckBox(prevCheckBox => prevCheckBox === index ? null : index);
    };

    const getTokenConfig = () => {
        const info = JSON.parse(localStorage.getItem("persist:auth"));
        const token = info.token.replace(/"/g, '');
        return {
            headers: { Authorization: `Bearer ${token}` }
        };
    };

    return (
      <div id='checkout-form'>
          <h2>Checkout</h2>
          <Row gutter={[20 ,12]}>
              <Col md={15} xs={24}>
                  <Row gutter={[12 , 12]}>
                      <Col md={12}>
                          <Form.Group controlId="firstName">
                                      <Form.Label>First name</Form.Label>
                                      <Form.Control type="text" placeholder="First name" value={formValues.firstName} onChange={handleInputChange} isInvalid={!!formErrors.firstName} />
                                      <Form.Control.Feedback type="invalid">
                                          {formErrors.firstName}
                                      </Form.Control.Feedback>
                                  </Form.Group>
                              </Col>
                      <Col md={12}>
                                  <Form.Group controlId="lastName">
                                      <Form.Label>Last name</Form.Label>
                                      <Form.Control type="text" placeholder="Last name" value={formValues.lastName} onChange={handleInputChange} isInvalid={!!formErrors.lastName} />
                                      <Form.Control.Feedback type="invalid">
                                          {formErrors.lastName}
                                      </Form.Control.Feedback>
                                  </Form.Group>
                              </Col>
                      <Col md={8}>
                          <Form.Group controlId="email">
                              <Form.Label>Email</Form.Label>
                              <Form.Control type="text" placeholder="Email" value={formValues.email} onChange={handleInputChange} isInvalid={!!formErrors.email} />
                              <Form.Control.Feedback type="invalid">
                                  {formErrors.email}
                              </Form.Control.Feedback>
                          </Form.Group>
                      </Col>
                      <Col md={8}>
                          <Form.Group controlId="zip">
                              <Form.Label>Zip</Form.Label>
                              <Form.Select aria-label="Default select example" value={formValues.zip} onChange={handleInputChange} isInvalid={!!formErrors.zip}>
                                  <option>select menu</option>
                                  <option value="1">zip 1</option>
                                  <option value="2">zip 2</option>
                              </Form.Select>
                              <Form.Control.Feedback type="invalid">
                                  {formErrors.zip}
                              </Form.Control.Feedback>
                          </Form.Group>
                      </Col>
                      <Col md={8}>
                                  <Form.Group controlId="addCode">
                                      <Form.Label>Add code</Form.Label>
                                      <Form.Select aria-label="Default select example" value={formValues.addCode} onChange={handleInputChange} isInvalid={!!formErrors.addCode}>
                                          <option>select menu</option>
                                          <option value="1">1</option>
                                      </Form.Select>
                                      <Form.Control.Feedback type="invalid">
                                          {formErrors.addCode}
                                      </Form.Control.Feedback>
                                  </Form.Group>
                              </Col>
                      <Col md={12}>
                                  <Form.Group controlId="name">
                                      <Form.Label>Name</Form.Label>
                                      <Form.Select aria-label="Default select example" value={formValues.name} onChange={handleInputChange} isInvalid={!!formErrors.name}>
                                          <option>select menu</option>
                                          <option value="1">1</option>
                                          <option value="2">2</option>
                                          <option value="3">3</option>
                                      </Form.Select>
                                      <Form.Control.Feedback type="invalid">
                                          {formErrors.name}
                                      </Form.Control.Feedback>
                                  </Form.Group>
                         </Col>
                      <Col md={12}>
                          <Form.Group controlId="phone">
                              <Form.Label>Phone</Form.Label>
                              <Form.Control type="text" placeholder="Phone" value={formValues.phone} onChange={handleInputChange} isInvalid={!!formErrors.phone} />
                              <Form.Control.Feedback type="invalid">
                                  {formErrors.phone}
                              </Form.Control.Feedback>
                          </Form.Group>
                      </Col>
                      <Col md={24}>
                          <Form.Group controlId="address">
                              <Form.Label>Address</Form.Label>
                              <Form.Control type="text" placeholder="Address" value={formValues.address} onChange={handleInputChange} isInvalid={!!formErrors.address} />
                              <Form.Control.Feedback type="invalid">
                                  {formErrors.address}
                              </Form.Control.Feedback>
                          </Form.Group>
                      </Col>
                      <Col md={24}>
                          <Form.Group>
                              <Form.Label>Payment</Form.Label>
                              <div>
                                  <Form.Check
                                    type="radio"
                                    label="VnPay"
                                    name="paymentMethod"
                                    id="paypal"
                                    value="vnpay"
                                    onChange={handlePaymentChange}
                                  />
                                  <Form.Check
                                    type="radio"
                                    label="ZaloPay"
                                    name="paymentMethod"
                                    id="zalopay"
                                    value="zalopay"
                                    onChange={handlePaymentChange}
                                  />
                              </div>
                          </Form.Group>
                      </Col>
                  </Row>
              </Col>
              <Col md={8} xs={24}>
                  <Card>
                      <Card.Body>
                                  <h2>The total amount of</h2>
                                  <Row gutter={[16 ,16]}>
                                      <Col md={18} style={{color:'red'}}>Temporary amount</Col>
                                      <Col md={6}>${totalAmount.toFixed(2)}</Col>
                                      <Col md={18}>Shipping</Col><Col md={6}>Gratis</Col>
                                      <Col md={24}>
                                          <div className="shipping-options">
                                              SHIPPING OPTIONS
                                          </div>
                                      </Col>
                                      <Col md={24}><h3 style={{textAlign:'center'}}>${totalAmount.toFixed(2)}</h3></Col>
                                </Row>
                                  <Col md={24}>
                                      <Link to='/'>
                                          <div className="shipping-options">
                                              BUY MORE
                                          </div>
                                      </Link>

                                  </Col>
                      </Card.Body>
                  </Card>
              </Col>
              <button className='button-order payment' onClick={ThanhToan}><span>Proceed to payment</span></button>
          </Row>
      </div>

    );
};

export default Checkout;
