import actionTypes from "./actionType";
import {
    HandlerLogin,
    HandlerRegister,
    HandlerVerify,
    HandleLogout
} from "../../services/authService";

export const accountLoginSuccess = (data) => ({
    type: actionTypes.ACCOUNT_LOGIN_SUCCESS,
    data: data
})

export const accountLoginFail = (error) => ({
    type: actionTypes.ACCOUNT_LOGIN_FAIL,
    data: error
})

export const accountLogoutSuccess = (error) => ({
    type: actionTypes.LOGOUT_SUCCESS,
    data: error
})

export const accountLogoutFail = (error) => ({
    type: actionTypes.ACCOUNT_LOGIN_FAIL,
    data: error
})

export const processLogout = (username) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.PROCESS_LOGOUT })

            let data = await HandleLogout(username)
            console.log(data);
            if (data) {
                dispatch(accountLogoutSuccess())
                return { type: actionTypes.LOGOUT_SUCCESS }
            } else {
                dispatch(accountLogoutFail("Đăng xuất lỗi"))
                return { type: actionTypes.LOGOUT_FAILD }
            }
        } catch (error) {
            console.log(error);
            if (error && error.response && error.response.data) {
                dispatch(accountLogoutFail("Đăng xuất lỗi"))
                return { type: actionTypes.LOGOUT_FAILD };
            }
        }
    }
}

export const accountLoginStart = (dataLogin) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.ACCOUNT_LOGIN_START })

            let data = await HandlerLogin(dataLogin)
            if (data) {
                dispatch(accountLoginSuccess(data))
                return { type: actionTypes.ACCOUNT_LOGIN_SUCCESS }
            } else {
                dispatch(accountLoginFail("Đăng nhập lỗi"))
                return { type: actionTypes.ACCOUNT_LOGIN_FAIL }
            }
        } catch (error) {
            console.log(error);
            if (error && error.response && error.response.data) {
                dispatch(accountLoginFail("Đăng nhập lỗi"))
                return { type: actionTypes.ACCOUNT_LOGIN_FAIL };
            }
        }
    }
}

export const registerStart = (info) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.REGISTER_START })
            let data = await HandlerRegister(info)
            if (data) {
                dispatch(registerSuccess())
                return { type: actionTypes.REGISTER_SUCCESS }
            } else {
                dispatch(registerFailded(data.message))
                return { type: actionTypes.REGISTER_FAILDED }
            }
        } catch (error) {
            console.log(error.response);
            if (error && error.response && error.response.data) {
                dispatch(registerFailded(error.response.data.message))
                return { type: actionTypes.REGISTER_FAILDED }
            }
        }
    }
}

export const registerSuccess = () => ({
    type: actionTypes.REGISTER_SUCCESS
})

export const registerFailded = (data) => ({
    type: actionTypes.REGISTER_FAILDED,
    errorMessage: data
})


export const verifyStart = (info) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.VERIFY_START })
            let data = await HandlerVerify(info)
            if (data && data !== "Error") {
                dispatch(verifySuccess())
                return { type: actionTypes.VERIFY_SUCCESS }
            } else {
                dispatch(verifyFailded())
                return { type: actionTypes.VERIFY_FAILDED }
            }
        } catch (error) {
            console.log(error.response);
            if (error && error.response && error.response.data) {
                dispatch(registerFailded(error.response.data.message))
                return { type: actionTypes.VERIFY_FAILDED }
            }
        }
    }
}

export const verifySuccess = () => ({
    type: actionTypes.VERIFY_SUCCESS
})

export const verifyFailded = (data) => ({
    type: actionTypes.VERIFY_FAILDED,
    errorMessage: data
})
