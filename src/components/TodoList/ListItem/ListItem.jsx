import React from "react";
import c from './ListItem.module.css'
import {deleteListTC} from "../../../redux/todo-reducer";

const ListItem = (props) => {
   return (
      <li className={props.listId === props.currentList ? c.listItemActive : c.listItem}
          onClick={() => props.setCurrentListAC(props.listId)}>
         <p className={c.listText}>{props.name}</p>
         <button className={c.button} onClick={() => props.deleteListTC(props.listId)}></button>
      </li>
   )
}

export default ListItem