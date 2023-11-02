import React, {useEffect} from "react";
import {connect} from "react-redux";
import c from './TodoListContainer.module.css'
import {getCurrentList, getList} from "../../redux/todo-selectors";
import {
   addListTC,
   clearListTaskAC,
   deleteListTC,
   getListTC,
   setCurrentListAC,
   setListAC
} from "../../redux/todo-reducer";
import ListItem from "./ListItem/ListItem";
import Input from "./Input/Input";
import {getIsAuth} from "../../redux/auth-selectors";

const TodoListContainer = (props) => {
   useEffect(() => {
      if (props.isAuth){
         props.getListTC()
      }else{
         props.clearListTaskAC()
      }
   }, [props.isAuth]);

   return (
      <section className={c.todoList}>
         <h1 className='block-title'>Lists</h1>
         <Input addListTC={props.addListTC}/>
         <ul>
            {
               props.list.map(listItem => {
                  return (
                     <ListItem name={listItem.title} listId={listItem.listId} currentList={props.currentList}
                               setCurrentListAC={props.setCurrentListAC} deleteListTC={props.deleteListTC}/>
                  )
               })
            }
         </ul>
      </section>
   )
};

const mapStateToProps = (state) => {
   return {
      isAuth: getIsAuth(state),
      list: getList(state),
      currentList: getCurrentList(state),
   }
}

export default connect(mapStateToProps, {
   getListTC,
   setListAC,
   setCurrentListAC,
   addListTC,
   deleteListTC,
   clearListTaskAC,
})(TodoListContainer)