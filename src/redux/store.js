import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import todoReducer from './todo-reducer'
import authReducer from "./auth-reducer";

let reducers = combineReducers({
	auth: authReducer,
	todo: todoReducer,
})

const store = createStore(reducers, applyMiddleware(thunkMiddleware))

window.state = store

export default store
