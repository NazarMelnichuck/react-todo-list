import React, {useEffect} from "react";
import {connect} from "react-redux";
import c from './TodoTaskContainer.module.css'
import {getCurrentList, getList} from "../../redux/todo-selectors";
import Input from "./Input/Input";
import Task from "./Task/Task";
import {addTaskTC, deleteTaskAC, deleteTaskTC, getTaskTC} from "../../redux/todo-reducer";
import listItem from "../TodoList/ListItem/ListItem";
import {getIsAuth} from "../../redux/auth-selectors";

const TodoTaskContainer = (props) => {
   useEffect(() => {
      if (props.isAuth){
         props.getTaskTC(props.currentList)
      }

   }, [props.currentList]);

   return (
      <section className={c.todoTask}>
         <h1 className='block-title'>Tasks</h1>
         <Input addTaskTC={props.addTaskTC} currentList={props.currentList}/>
         <ul className='task-list'>
            {
               props.list.map(listItem => {
                  if (props.currentList === listItem.listId) {
                     return listItem.tasks.map(tasks => (
                        <Task
                           key={tasks.id}
                           id={tasks.id}
                           title={tasks.title}
                           currentList={props.currentList}
                           deleteTaskTC={props.deleteTaskTC}
                        />
                     ));
                  }
               })
            }
         </ul>
      </section>
   )
}

let mapStateToProps = (state) => {
   return {
      isAuth: getIsAuth(state),
      list: getList(state),
      currentList: getCurrentList(state)
   }
}
export default connect(mapStateToProps, {
   getTaskTC,
   addTaskTC,
   deleteTaskTC,
})(TodoTaskContainer)