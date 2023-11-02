import React from "react";
import {connect} from "react-redux";
import {getCurrentList, getList} from "../../redux/todo-selectors";
import {setCurrentListAC} from "../../redux/todo-reducer";
import ListItem from "./ListItem/ListItem";

const TodoListsContainer = (props) => {
   return (
      <section>
         <h1>Lists</h1>
         <ul>
            {
               props.list.map(listItem => {
                  debugger
                  return (
                     <ListItem name={listItem.listName} listId={listItem.listId} currentList={props.currentList}
                               setCurrentListAC={props.setCurrentListAC}/>
                  )
               })
            }
         </ul>
      </section>
   )
};

const mapStateToProps = (state) => {
   return {
      list: getList(state),
      currentList: getCurrentList(state)
   }
}

export default connect(mapStateToProps, {
   setCurrentListAC,
})(TodoListsContainer)