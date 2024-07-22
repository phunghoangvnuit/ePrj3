import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const AddCustomerModal = ({ isOpen, onRequestClose, onAddCustomer }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [totalOrders, setTotalOrders] = useState('');
    const [totalSpend, setTotalSpend] = useState('');
    const [location, setLocation] = useState('');

    const handleAddCustomer = () => {
        const newCustomer = {
            name,
            email,
            phone,
            totalOrders,
            totalSpend,
            location,
        };

        onAddCustomer(newCustomer);
        setName('');
        setEmail('');
        setPhone('');
        setTotalOrders('');
        setTotalSpend('');
        setLocation('');
        onRequestClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Add Customer"
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                },
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                },
            }}
        >
            <h2>Add New Customer</h2>
            <form>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Phone:</label>
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div>
                    <label>Total Orders:</label>
                    <input type="number" value={totalOrders} onChange={(e) => setTotalOrders(e.target.value)} />
                </div>
                <div>
                    <label>Total Spend:</label>
                    <input type="number" value={totalSpend} onChange={(e) => setTotalSpend(e.target.value)} />
                </div>
                <div>
                    <label>Location:</label>
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
                </div>
                <button type="button" onClick={handleAddCustomer}>Add Customer</button>
            </form>
            <button onClick={onRequestClose}>Close</button>
        </Modal>
    );
};

export default AddCustomerModal;
