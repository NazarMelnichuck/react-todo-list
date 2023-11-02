import {authAPI} from "../api/api";

const IS_AUTH = 'IS_AUTH'
const LOG_IN = 'LOG_IN'
const LOG_OUT = 'LOG_OUT'

const initialState = {
   isAuth: null,
   userData: {
      id: null,
      login: null,
      email: null
   }
}

const authReducer = (state = initialState, action) => {
   switch (action.type) {
      case IS_AUTH:
         return {
            ...state,
            isAuth: true,
            userData: {
               ...state.userData,
               id: action.data.id,
               login: action.data.login,
               email: action.data.email,
            }
         }
      case LOG_IN:
         return {
            ...state,
            isAuth: true,
         }
      case LOG_OUT:
         return {
            ...state,
            isAuth: false,
            userData: {
               ...state.userData,
               id: null,
               login: null,
               email:null,
            }
         }
      default:
         return state
   }
}

export const isAuthAC = (data) => {
   return {type: IS_AUTH, data}
}

export const logInAC = (data) => {
   return {type: LOG_IN, data}
}

export const logOutAC = (data) => {
   return {type: LOG_OUT, data}
}

// ====== Thunks

export const isAuthTC = () => {
   return function (dispatch) {
      authAPI.isAuth().then(data => {
         if (data.resultCode === 0) {
            dispatch(isAuthAC(data.data))
         }
      })
   }
}

export const logInTC = (email, password) => {
   return function (dispatch) {
      authAPI.logIn(email, password).then(data => {
         if (data.resultCode === 0) {
            dispatch(logInAC(data.data))
         } else {
            alert('Server error!')
         }
      })
   }
}

export const logOutTC = () => {
   return function (dispatch) {
      authAPI.logOut().then(data => {
         if (data.resultCode === 0) {
            dispatch(logOutAC(data.data))
         } else {
            alert('Server error! Can`t log out')
         }
      })
   }
}

export default authReducer