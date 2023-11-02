import './App.css'
import TodoListsContainer from "./components/TodoList/TodoListContainer";
import TodoTaskContainer from "./components/TodoTask/TodoTaskContainer";
import AuthContainer from "./components/Auth/AuthContainer";
import Form from "./components/Auth/Form/Form";
import c from "./components/Auth/AuthContainer.module.css";
import React from "react";
import Locked from "./components/Locked/Locked";
import {connect} from "react-redux";
import {getIsAuth} from "./redux/auth-selectors";

const App = ({isAuth}) => {
   if (!isAuth) {
      return (
         <section className='App'>
            <div className='container'>
               <Locked/>
               <TodoListsContainer/>
               <TodoTaskContainer/>
            </div>
            <AuthContainer/>
         </section>
      )
   } else {
      return (
         <section className='App'>
            <div className='container'>
               <TodoListsContainer/>
               <TodoTaskContainer/>
            </div>
            <AuthContainer/>
         </section>
      )
   }
};

const mapStateToProps = (state) => {
   return {
      isAuth: getIsAuth(state),
   }
}

export default connect(mapStateToProps,{})(App)