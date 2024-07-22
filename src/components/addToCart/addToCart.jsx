import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useState } from 'react';
import './addToCart.css';

const AddToCartButton = ({ item, vanchuyen_id, className, quantity }) => {
    const [check, setCheck] = useState(false);

    const handleAddToCart = () => {
        setCheck(true);
        let idAccount = localStorage.getItem('id_account');
        var products = {
            product_id: item.id,
            product_name: item.title,
            price: item.price,
            soluong: parseInt(quantity),
            total: item.price === 0 ? item.price * parseInt(quantity) : Math.round(parseInt(quantity) * item.price),
            account_id: idAccount,
            vanchuyen_id: vanchuyen_id,
            image: item.image[0]
        };

        const giohang = JSON.parse(localStorage.getItem('cart')) || [];
        const findOneId = giohang.find((items) => items.product_id === item.id);
        if (findOneId) {
            findOneId.soluong += products.soluong;
            findOneId.total = Math.round(findOneId.soluong * findOneId.price);
        } else {
            giohang.push(products);
        }
        localStorage.setItem("cart", JSON.stringify(giohang));
        setCheck(false);
        onAddToCart(giohang.length);
        alert("Add giỏ hàng thành công");
    };

    return (
        <Button onClick={handleAddToCart} disabled={check} className={className}>
            Add to Cart
        </Button>
    );
};

AddToCartButton.propTypes = {
    item: PropTypes.object.isRequired,
    vanchuyen_id: PropTypes.number,
};

export default AddToCartButton;
