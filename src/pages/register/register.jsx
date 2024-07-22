import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import { registerStart } from '../../store/actions/authAction';
import Verify from './verify';
import CryptoJS from 'crypto-js';
import actionTypes from '../../store/actions/actionType';
import '../Login/Login.css'
const Register = () => {
  const [form] = Form.useForm();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState(null);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const registerSuccess = useSelector((state) => state.auth.registerSuccess);
  const dispatch = useDispatch();

  const handleChangeInput = (e, id) => {
    switch (id) {
      case 'username':
        setUsername(e.target.value);
        break;
      case 'email':
        setEmail(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      case 'phone':
        setPhone(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleImageUpload = ({ file }) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.onerror = () => {
      message.error('Failed to upload image.');
    };
    reader.readAsDataURL(file);
  };

  const checkValidateInput = () => {
    if (!username || !email || !phone || !password || !image) {
      message.error('Missing parameter!');
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (checkValidateInput()) {
      const encryptedPassword = CryptoJS.HmacSHA256(password, "ThisismySecretKeyThisismySecretKey").toString(CryptoJS.enc.Base64);
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('password', encryptedPassword);
      formData.append('image', image);

      try {
        const res = await dispatch(registerStart(formData));
        if (res.type === actionTypes.ACCOUNT_LOGIN_SUCCESS) {
          setIsOpenModal(true);
        }
      } catch (err) {
        message.error('Registration failed.');
        console.error(err);
      }
    }
  };

  useEffect(() => {
    if (registerSuccess) {
      setIsOpenModal(true);
    }
  }, [registerSuccess]);

  const toggleSignupModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <>
      {isLoading && <Loader />}
      {isOpenModal && (
        <Verify
          data={{ username, password, email, phone }}
          toggleFromParent={toggleSignupModal}
          isOpen={isOpenModal}
        />
      )}
      <div id='login'>
        <div className="container">
          <div className="left-panel">
            <img src='/im-register.jpg'/>
          </div>
          <div className="right-panel">
            <div className="form-container">
              <h2 style={{textAlign:"center"}}>Register</h2>
              <Form form={form} onFinish={handleSignUp}>
                  <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please enter your username!' }]}
                    labelCol={{ span: 24 }}
                    validateTrigger="onBlur"
                  >
                    <Input size="large" value={username} onChange={(e) => handleChangeInput(e, 'username')} />
                  </Form.Item>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: 'Please enter your email!' },
                      { type: 'email', message: 'The input is not valid E-mail!' }
                    ]}
                    labelCol={{ span: 24 }}
                    validateTrigger="onBlur"
                  >
                    <Input size="large" value={email} onChange={(e) => handleChangeInput(e, 'email')} />
                  </Form.Item>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please enter your password!' }]}
                    labelCol={{ span: 24 }}
                  >
                    <Input.Password size="large" value={password} onChange={(e) => handleChangeInput(e, 'password')} />
                  </Form.Item>
                  <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[{ required: true, message: 'Please enter your phone number!' }]}
                    labelCol={{ span: 24 }}
                    validateTrigger="onBlur"
                  >
                    <Input size="large" value={phone} onChange={(e) => handleChangeInput(e, 'phone')} />
                  </Form.Item>
                  <Form.Item
                    label="Upload Image"
                    name="image"
                    rules={[{ required: true, message: 'Please upload your image!' }]}
                    labelCol={{ span: 24 }}
                    style={{textAlign:'center'}}
                  >
                    {!image && (
                      <Upload
                        listType="picture"
                        showUploadList={false}
                        beforeUpload={(file) => {
                          handleImageUpload({ file });
                          return false;
                        }}
                      >
                        <Button icon={<UploadOutlined />}>Upload Image</Button>
                      </Upload>
                    )}
                    {image && <img src={image} alt="avatar" style={{ width: '100px' }} />}
                  </Form.Item>
                <button type="submit" className='signup-btn'>
                  Register
                </button>
              </Form>
              <div className='login-link'>
              <Link to='/login'><p>Don't have an account?</p></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
