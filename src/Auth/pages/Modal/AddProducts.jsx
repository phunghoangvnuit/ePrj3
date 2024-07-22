import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Select from 'react-select';
import "./AddModal.scss";
import { createProduct, editProduct } from '../../Services/ProductService';
import { getAllCategories } from '../../Services/CategoryService';

Modal.setAppElement('#root');

const AddProductModal = ({ isOpen, onRequestClose, onProductAdded, productToEdit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [price, setPrice] = useState(0);
    const [click, setClick] = useState(0);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [isMounted, setIsMounted] = useState(true);

    useEffect(() => {
        setIsMounted(true);
        if (productToEdit) {
            setTitle(productToEdit.title);
            setDescription(productToEdit.description);
            setImages(productToEdit.image);
            setSelectedCategories(productToEdit.category.map(cat => ({ value: cat.id, label: cat.name })));
            setPrice(productToEdit.price);
            setClick(productToEdit.click);
        } else {
            setTitle('');
            setDescription('');
            setImages([]);
            setSelectedCategories([]);
            setPrice(0);
            setClick(0);
        }
        return () => {
            setIsMounted(false);
        };
    }, [productToEdit]);


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getAllCategories(1, 200);
                if (response && response.errorCode === 200) {
                    const categoryOptions = response.content.data.map(category => ({
                        value: category.id,
                        label: category.name,
                    }));
                    setCategories(categoryOptions);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const validateFields = () => {
        if (!title) {
            alert('Title is required.');
            return false;
        }
        if (!description) {
            alert('Description is required.');
            return false;
        }
        if (selectedCategories.length === 0) {
            alert('Category is required.');
            return false;
        }
        if (price <= 0) {
            alert('Price must be greater than zero.');
            return false;
        }
        return true;
    };

    const handleAddProduct = async () => {
        if (!validateFields()) {
            return;
        }

        try {
            const productData = {
                id: productToEdit ? productToEdit.id : 0,
                title: title,
                description: description,
                image: images,
                category: selectedCategories.map(cat => cat.value.toString()),
                price: price,
                click: click,
                account_id: 0,
                account_name: "admin",
                imageShop: "",
                nameShop: ""
            };

            if (productToEdit) {
                await editProduct(productData);
            } else {
                await createProduct(productData);
            }

            if (isMounted) {
                onRequestClose();
                onProductAdded();
            }
        } catch (error) {
            if (isMounted) {
                console.error('Error saving product:', error);
            }
        }
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const imageUrls = [];

        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (isMounted) {
                    imageUrls.push(reader.result);
                    setImages(prevImages => [...prevImages, ...imageUrls]);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const handleCategoryChange = (selectedOptions) => {
        setSelectedCategories(selectedOptions);
    };

    const handleImageRemove = (index) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index));
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel={productToEdit ? "Edit Product" : "Add Product"}
        >
            <h2>{productToEdit ? "Edit Product" : "Add New Product"}</h2>
            <form>
                <div className='form-group'>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className='form-group'>
                    <label>Description:</label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className='form-group'>
                    <label>Images:</label>
                    <input type="file" accept="image/*" multiple onChange={handleImageChange} />
                    {images.length > 0 && (
                        <div>
                            <p>Current Images:</p>
                            {images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Image ${index}`}
                                    style={{ height: 100, marginRight: 10, cursor: 'pointer' }}
                                    onClick={() => handleImageRemove(index)}
                                />
                            ))}
                        </div>
                    )}
                </div>
                <div className='form-group'>
                    <label>Categories:</label>
                    <Select
                        value={selectedCategories}
                        onChange={handleCategoryChange}
                        options={categories}
                        isMulti
                    />
                </div>
                <div className='form-group'>
                    <label>Price:</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className='form-group'>
                    <label>Click:</label>
                    <input type="number" value={click} onChange={(e) => setClick(e.target.value)} />
                </div>
            </form>
            <div className="modal-buttons">
                <button className="button close-button" onClick={onRequestClose}>Close</button>
                <button className="button add-button" onClick={handleAddProduct}>{productToEdit ? "Save" : "Add Product"}</button>
            </div>
        </Modal>
    );
};

export default AddProductModal;
