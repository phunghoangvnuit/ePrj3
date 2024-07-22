import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Form } from 'react-bootstrap';
import actionTypes from '../../store/actions/actionType';
import './verify.css';
import { Link, useNavigate } from "react-router-dom";
import { verifyStart } from '../../store/actions/authAction';
import Loader from '../../components/loader/Loader';

const Verify = (props) => {
    const isLoading = useSelector(state => state.auth.isLoading);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [arrInput, setArrInput] = useState(['', '', '', '', '', '']);

    useEffect(() => {
        setEmail(props.data.email);
    }, [props.data]);

    const handleInputChange = (index, value) => {
        if (value.length === 1) {
            const newOtpValues = [...arrInput];
            newOtpValues[index] = value;
            setArrInput(newOtpValues);
        } else if (value.length === 0) { 
            const newOtpValues = [...arrInput];
            newOtpValues[index] = '';
            setArrInput(newOtpValues);
        }
    };

    const handleSubmitValidate = async () => {
        if (arrInput.every(value => value.length === 1)) {
            const result = arrInput.join('');
            let res = await dispatch(verifyStart(result));
            if (res.type === actionTypes.VERIFY_SUCCESS) {
                navigate("/login")
            }
        } else {
            alert('Please enter OTP in all fields');
        }
    };

    const toggle = () => {
        props.toggleFromParent();
    }

    return (
        <>
            <Modal show={props.isOpen} onHide={toggle} centered>
                <Modal.Header closeButton>
                    <Modal.Title>OTP Verification</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container height-100 d-flex justify-content-center align-items-center">
                        {isLoading && <Loader />}
                        <div className="position-relative">
                            <div className="card p-2 text-center">
                                <h6>
                                    Please enter the one-time password <br />
                                    to verify your account
                                </h6>
                                <div>
                                    <span>A code has been sent to</span> <small>{email}</small>
                                </div>
                                <div id="otp" className="inputs d-flex flex-row justify-content-center mt-2">
                                    {arrInput.map((value, index) => (
                                        <Form.Control
                                            key={index}
                                            className="m-2 text-center rounded"
                                            defaultValue={value} // Use defaultValue instead of value
                                            maxLength={1}
                                            onChange={(e) => handleInputChange(index, e.target.value)}
                                            style={{ width: '40px' }}
                                        />
                                    ))}
                                </div>
                                <div className="mt-4">
                                    <Button variant="danger" onClick={handleSubmitValidate} className="px-4 validate">Verify</Button>
                                </div>
                            </div>
                            <div className="card-2">
                                <div className="content d-flex justify-content-center align-items-center">
                                    <span>Didn't get the code</span>
                                    <a href="#" className="text-decoration-none ms-3">Resend(1/3)</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggle}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Verify;
