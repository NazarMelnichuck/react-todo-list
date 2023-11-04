export const getIsAuth = (state) => {
   return state.auth.isAuth
}

export const getUserData = (state) => {
   return state.auth.userData
}

export const getErrors = (state) => {
   return state.auth.errors
}