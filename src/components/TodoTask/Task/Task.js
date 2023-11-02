import React from 'react'
import c from './Task.module.css'

const Task = (props) => {
	const deleteTask = (e) => {
		e.preventDefault()
		props.deleteTaskTC(props.currentList, props.id)
	}

	return (
		<li className={c.task}>
			<p className={c.text}>{props.title}</p>
			<button onClick={deleteTask} className={c.button}></button>
		</li>
	)
}

export default Task
