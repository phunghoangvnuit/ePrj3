import { useState } from 'react';
import emailjs from 'emailjs-com';
import './Contact.css';
import {Form, Input } from "antd";
import Footer from "../footer/footer.jsx";
import toast from "react-hot-toast";
import GetInTouch from "./GetInTouch.jsx";
const ScheduleAppointment = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    appointmentDate: '',
    message: '',
    phone:'',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFinish = () => {
    const emailParams = {
      name: formData.name,
      appointmentDate: formData.appointmentDate,
      message: formData.message,
      email:formData.email,
      phone:formData.phone
    };

    emailjs.send('service_bl0wb4d', 'template_nfhekjf', emailParams, '8iHhQZjiUqQeM7nhI')
      .then((response) => {
        console.log('Email sent successfully:', response);
        toast.success('Lịch hẹn đã được gửi qua email!');
      }, (error) => {
        console.error('Error sending email:', error);
        toast.error('Có lỗi xảy ra khi gửi.');
      });
  };

  return (
    <>
      <div className="ContactSection">
        <div className="header-title">
          <div className="decor-line">
            <div></div>
            <div></div>
          </div>
          <h1>Contact Us</h1>
        </div>
        <div id='contact'>
          <GetInTouch />
          <div className='book'>
            <h2>Leave Us Your Information</h2>
            <p>Leave us your information and our customer services will contact to you as soon as possible</p>
            <Form onFinish={handleFinish}>
              <Form.Item
                label="First & Last Name:"
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your name'
                  }
                ]}
                labelCol={{
                  span: 24
                }}
              >
                <Input name="name" value={formData.name} onChange={handleChange}/>
              </Form.Item>

              <Form.Item
                label="Email:"
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your email'
                  },
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!'
                  }
                ]}
                labelCol={{
                  span: 24,
                }}
              >
                <Input name="email" value={formData.email} onChange={handleChange}/>
              </Form.Item>

              <Form.Item
                label="Appointment date:"
                name="appointmentDate"
                rules={[
                  {
                    required: true,
                    message: 'Please select an appointment date'
                  }
                ]}
                labelCol={{
                  span: 24,
                }}
              >
                <Input type="date" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange}/>
              </Form.Item>

              <Form.Item
                label="Phone"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your phone'
                  }
                ]}
                labelCol={{
                  span: 24,
                }}
              >
                <Input name="phone" value={formData.phone} onChange={handleChange}/>
              </Form.Item>
              <Form.Item
                label="How can we help you?"
                name="message"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your message'
                  }
                ]}
                labelCol={{
                  span: 24,
                }}
              >
                <Input.TextArea name="message" value={formData.message} onChange={handleChange}/>
              </Form.Item>
              <button type="submit">
                SUBMIT
              </button>
            </Form>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default ScheduleAppointment;
