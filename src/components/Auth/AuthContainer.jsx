import React, {useEffect} from 'react';
import c from './AuthContainer.module.css'
import {connect} from "react-redux";
import Form from "./Form/Form";
import {isAuthTC, logInTC, logOutTC} from "../../redux/auth-reducer";
import {getErrors, getIsAuth, getUserData} from "../../redux/auth-selectors";

const AuthContainer = (props) => {
   useEffect(() => {
      props.isAuthTC()
   }, [props.isAuth]);

   const logOut = (e) => {
      e.preventDefault()
      props.logOutTC()
   }

   return (
      <section className={c.auth}>
         {!props.isAuth ? (
            <div>
               <h1 className='block-title'>Login</h1>
               <Form logInTC={props.logInTC}/>
               {
                  props.errors ? props.errors.map(e => <p className={c.errorText}>{e}</p>) : null
               }
            </div>
         ) : (
            <div>
               <h1 className='block-title'>Account</h1>
               <div className={c.userInfo}>
                  <div className={c.infoBlock}>
                     <h2 className={c.infoItem}>Login:</h2>
                     <p className={c.infoValue}>{props.userData.login}</p>
                  </div>
                  <div className={c.infoBlock}>
                     <h2 className={c.infoItem}>Email:</h2>
                     <p className={c.infoValue}>{props.userData.email}</p>
                  </div>
               </div>
               <button className={'button ' + c.button} onClick={logOut}>Log out</button>
            </div>
         )}
      </section>
   );
};

const mapStateToProps = (state) => {
   return {
      isAuth: getIsAuth(state),
      userData: getUserData(state),
      errors: getErrors(state)
   }
}

export default connect(mapStateToProps, {
   isAuthTC,
   logInTC,
   logOutTC,
})(AuthContainer);
