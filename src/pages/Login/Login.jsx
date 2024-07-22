import {  useEffect } from 'react';
import { Input, Form } from 'antd';
import './Login.css';
import { Link, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
import { useSelector } from 'react-redux';
import Loader from '../../components/loader/Loader';
import { useDispatch } from 'react-redux';
import { accountLoginStart } from '../../store/actions/authAction';
import CryptoJS from 'crypto-js';
import actionTypes from '../../store/actions/actionType';
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const isLoading = useSelector(state => state.auth.isLoading);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const handleSignIn = async (values) => {
    const encryptedPassword = CryptoJS.HmacSHA256(values.password, "ThisismySecretKeyThisismySecretKey").toString(CryptoJS.enc.Base64);
    const param = {
      username: values.username,
      password: encryptedPassword,
    };
    try {
      const res = await dispatch(accountLoginStart(param));
      if (res.type === actionTypes.ACCOUNT_LOGIN_SUCCESS) {
        navigate('/');
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (isLoggedIn == true) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);
  return (
    <div id='login'>
      {
        isLoading == true && <Loader />
      }
      <div className="container">
        <div className="left-panel">
          <img src='/img-login2.jpg' />
        </div>
        <div className="right-panel">
          <div className="form-container">
            <h2 style={{textAlign:"center"}}>LOGIN</h2>
            <Form form={form} onFinish={handleSignIn}>
              <div className="input-group">
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    { required: true, message: 'Please enter your username!' },
                  ]}
                  labelCol={{ span: 24 }}
                  validateTrigger="onBlur"
                >
                  <Input size='large' />
                </Form.Item>
              </div>
              <div className="input-group">
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: 'Please enter your username!' }]}
                  labelCol={{ span: 24 }}
                >
                  <Input.Password size='large' />
                </Form.Item>
              </div>
              <button type="submit" className='signup-btn'>
                Đăng Nhập
              </button>
              <div className='login-link'>
                <Link to='/register'><p>Already have an account?</p></Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
