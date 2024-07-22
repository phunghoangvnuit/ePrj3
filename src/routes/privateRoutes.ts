import Home from '../pages/home/Home'
import Shop from '../pages/shop/Shop';
import Product from '../pages/product/Product';
import Contact from '../pages/Contact/Contact';
import Blog from '../pages/Blog/Blog';
import Cart from '../pages/Cart/Cart';
import Checkout from '../pages/checkout/checkout';
import Categories from '../Auth/pages/Categories/Categories';
import Dashboard from '../Auth/pages/Dashboard';
import Customers from '../Auth/pages/Customers';
import Products from '../Auth/pages/Products';
import ProductDetail from '../pages/product/New/productDetail/productDetail';
import Shipping from '../Auth/pages/Shipping';
import AddToCartButton from '../components/addToCart/addToCart';
import About from '../pages/About/About'
const privateRoutes = {
    home: {
        path: '/',
        component: Home,
    },
    shop: {
        path: '/shop/:name?',
        component: Shop,
    },
    product: {
        path: '/product',
        component: Product,

    },
    productDetail: {
        path: '/Product/:id',
        component: ProductDetail,

    },
    about: {
        path: '/about',
        component: About,

    },
    contact: {
        path: '/contact',
        component: Contact,

    },
    blog: {
        path: '/blog',
        component: Blog,

    },
    cart: {
        path: '/cart',
        component: Cart,
        requiredLogin: true,
    },
    addtoCart: {
        path: '/addToCart',
        component: AddToCartButton,
        requiredLogin: true,
    },
    checkout: {
        path: '/checkout',
        component: Checkout,
        requiredLogin: true,
    },
    categories: {
        path: '/system/categories',
        component: Categories,
        requiredLogin: true,
        role: "Admin"
    },
    dashboard: {
        path: '/system',
        component: Dashboard,
        requiredLogin: false,
        role: "Admin"
    },
    customers: {
        path: '/system/customers',
        component: Customers,
        requiredLogin: true,
        role: "Admin"
    },
    products: {
        path: '/system/products',
        component: Products,
        requiredLogin: true,
        role: "Admin"
    },
    shipping: {
        path: '/system/shipping',
        component: Shipping,
        requiredLogin: true,
        role: "Admin"
    },
};

export default privateRoutes;
