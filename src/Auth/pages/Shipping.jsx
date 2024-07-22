import React, { useState, useEffect } from 'react';
import './Button.scss';
import './Table.scss';
import { getAllProducts, deleteProduct } from '../Services/ProductService';
import Paging from '../components/paging/paging';
import AddProductModal from './Modal/AddProducts';
import { Carousel } from 'react-responsive-carousel';


const Shipping = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [productToEdit, setProductToEdit] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [pageCount, setPageCount] = useState(1);
    const [categoryId, setCategoryId] = useState('');

    useEffect(() => {
        fetchProducts();
    }, [currentPage, pageSize]);

    const fetchProducts = async () => {
        try {
            const response = await getAllProducts(currentPage, pageSize);
            if (response && response.errorCode === 200) {
                setProducts(response.content.data);
                setPageCount(response.content.totalPages);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            var arrayId = [productId];
            await deleteProduct(arrayId);
            await fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleEditProduct = (product) => {
        setProductToEdit(product);
        setModalIsOpen(true);
    };

    const openModal = () => {
        setProductToEdit(null);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleChangePage = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    return (
        <div className='container' style={{ position: 'absolute', top: '20%', left: "22%" }}>
            <div className='header'>
                <h3>Shipping</h3>
                <button className='button' onClick={openModal}>
                    <i className="fas fa-plus"></i>
                </button>
            </div>
            <div className='content'>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Images</th>
                            <th>Categories</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products && products.map((item, index) => (
                            <tr key={item.id} className='data'>
                                <td>{index + 1}</td>
                                <td>{item.title}</td>
                                <td>{item.description}</td>
                                <td style={{ "width": "10%" }}>
                                    <Carousel
                                        showThumbs={false}
                                        showIndicators={false}
                                        showArrows={false}
                                        infiniteLoop={true}
                                        autoPlay={true}
                                        interval={1000}
                                    >
                                        {item.image.map((img, idx) => (
                                            <div key={idx} className="carousel-image-container">
                                                <img src={img} alt={`Image ${idx + 1}`} className="carousel-image" />
                                            </div>
                                        ))}
                                    </Carousel>

                                </td>
                                <td>
                                    <ul>
                                        {item.category.map((cat, idx) => (
                                            <li key={idx}>{cat}</li>
                                        ))}
                                    </ul>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleEditProduct(item)}
                                        className='btn-edit'><i className="fas fa-pen-square"></i></button>
                                    <button
                                        onClick={() => handleDeleteProduct(item.id.toString())}
                                        className='btn-delete'><i className="fas fa-trash"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <AddProductModal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    onProductAdded={fetchProducts}
                    productToEdit={productToEdit}
                    categoryId={categoryId}
                />
            </div>
            {products.length > 0 &&
                <Paging
                    pageIndex={currentPage}
                    pageSize={pageSize}
                    pageCount={pageCount}
                    changePage={handleChangePage}
                />
            }
        </div>
    );
};

export default Shipping;
