import React, {useState} from "react";
import c from './Input.module.css'

const Input = (props) => {
   const [listValue, setListValue] = useState('')

   const addList = (e) => {
      e.preventDefault()
      props.addListTC(listValue)
      setListValue('')
   }

   return (
      <form className={c.addBlock}>
         <input className='input' onChange={(e) => setListValue(e.target.value)} value={listValue} type='text' />
         <button className='button' onClick={addList} >Add</button>
      </form>
   )
}

export default Input