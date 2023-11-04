import React, from 'react';
import c from "../AuthContainer.module.css";
import {useFormik} from "formik";

const validate = values => {
   const errors = {};

   if (!values.email) {
      errors.email = 'Required';
   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
   }

   if (!values.password) {
      errors.password = 'Required';
   }

   return errors;
};

const Form = ({logInTC}) => {
   const logIn = (e) => {
      e.preventDefault()
      logInTC(formik.values.email, formik.values.password)
   }

   const formik = useFormik({
      initialValues: {
         email: '',
         password: '',
      },
      validate,
   });

   return (
      <form className={c.form} onSubmit={formik.handleSubmit}>
         <div className={c.inputBox}>
            <label className={c.labelText} htmlFor="email">Your email</label>
            <input
               id="email"
               className={'input ' + (formik.touched.email && formik.errors.email ? c.inputError : '')}
               type="email"
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               value={formik.values.email}
               placeholder={'Email'}
            />
            {formik.touched.email && formik.errors.email === 'Invalid email address' ? (
               <div className={c.errorText}>{formik.errors.email}</div>
            ) : null}
         </div>
         <div className={c.inputBox}>
            <label className={c.labelText} htmlFor="password">Password</label>
            <input
               id="password"
               className={'input ' + (formik.touched.password && formik.errors.password ? c.inputError : '')}
               type="password"
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               value={formik.values.password}
               placeholder={'Password'}
            />
         </div>
         <button className='button' onClick={logIn}>Login</button>
      </form>
   );
};

export default Form;
