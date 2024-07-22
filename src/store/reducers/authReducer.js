import toast from "react-hot-toast";
import actionTypes from '../actions/actionType';

const initialState = {
    isLoggedIn: false,
    token: null,
    isLoading: false,
    registerSuccess: false,
    verify: false,
    errorData: true,
    currentUser: {}
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ACCOUNT_LOGIN_START:
            state.isLoading = true
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.ACCOUNT_LOGIN_SUCCESS:
            state.isLoading = false
            toast.success('Login success')
            state.currentUser = { ...action.data }
            state.token = action.data.token,
            state.isLoggedIn = true
            return {
                ...state,
                isLoading: false,
                errorData: false,

            }
        case actionTypes.ACCOUNT_LOGIN_FAIL:
            state.isLoading = false
            toast.error("Login failed")
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                isLoading: false,
                errorData: true,
                currentUser: {}
            }
        case actionTypes.REGISTER_START:
            return {
                ...state,
                isLoading: true,
                registerSuccess: false,
            }
        case actionTypes.REGISTER_SUCCESS:

            return {
                ...state,
                isLoading: false,
                registerSuccess: true
            }
        case actionTypes.REGISTER_FAILDED:
            toast.error("Đăng kí failed")
            return {
                ...state,
                isLoading: false,
                registerSuccess: false,
            }
        case actionTypes.VERIFY_START:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.VERIFY_SUCCESS:
            toast.success('Verify success')
            return {
                ...state,
                isLoading: false,
                verify: true,
                registerSuccess: false
            }
        case actionTypes.VERIFY_FAILDED:
            toast.error('Verify fail')
            return {
                ...state,
                isLoading: false
            }
        case actionTypes.PROCESS_LOGOUT:
            toast.success('Logout successfully')
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                currentUser: {}
            }
        default:
            return state;
    }
};

export default authReducer;
