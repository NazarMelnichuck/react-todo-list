import React, {useState} from 'react'
import c from './Input.module.css'


const Input = (props) => {
	const [taskValue, setTaskValue] = useState('')

	const addTask = (e) => {
		e.preventDefault()
		props.addTaskAC(taskValue)
		setTaskValue('')
	}

	return (
		<form className={c.addBlock}>
			<input className={c.input} onChange={(e) => setTaskValue(e.target.value)} value={taskValue} type='text' />
			<button onClick={addTask}>Add</button>
		</form>
	)
}

export default Input
