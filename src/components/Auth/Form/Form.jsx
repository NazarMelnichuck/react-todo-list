import React, {useState} from 'react';
import c from "../AuthContainer.module.css";

const Form = ({logInTC}) => {
   const [emailValue, setEmailValue] = useState('');
   const [passwordValue, setPasswordValue] = useState('')

   const logIn = (e) => {
      e.preventDefault()
      logInTC(emailValue, passwordValue)
      setEmailValue('')
      setPasswordValue('')
   }

   return (
      <form className={c.form}>
         <label className={c.label}>
            <h3 className={c.labelText}>Email</h3>
            <input className='input'
                   onChange={(e) => setEmailValue(e.target.value)}
                   value={emailValue}
                   type='email'
                   placeholder={'Email'}
            />
         </label>
         <label className={c.label}>
            <h3 className={c.labelText}>Password</h3>
            <input className='input'
                   onChange={(e) => setPasswordValue(e.target.value)}
                   value={passwordValue}
                   type='password'
                   placeholder={'Password'}
            />
         </label>

         <button className='button' onClick={logIn}>Login</button>
      </form>
   );
};

export default Form;
