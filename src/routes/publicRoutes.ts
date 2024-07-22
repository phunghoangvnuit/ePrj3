import Login from '../pages/Login/Login';
import Register from '../pages/register/register';

const publicRoutes = {
    login: {
        path: '/login',
        component: Login,
        requiredLogin: false,
    },
    register: {
        path: '/register',
        component: Register,
        requiredLogin: false,
    },

}
export default publicRoutes;
