import {listAPI, taskAPI} from "../api/api";

const SET_TASK = 'SET_TASK'
const ADD_TASK = 'ADD_TASK'
const DELETE_TASK = 'DELETE_TASK'
const SET_CURRENT_LIST = 'SET_CURRENT_LIST'
const ADD_LIST = 'ADD_LIST'
const SET_LIST = 'SET_LIST'
const DELETE_LIST = 'DELETE_LIST'
const CLEAR_LIST_TASK = 'CLEAR_LIST_TASK'


let initialState = {
   currentList: '',
   list: [],
}

const todoReducer = (state = initialState, action) => {
   const setCurrentList = () => {
      switch (action.type){
         case DELETE_LIST:
            debugger
            if (action.listId === state.list[0].listId && state.list.length >= 2){
               return state.list[1].listId
            }else if(action.listId === state.currentList && state.list.length >= 2){
               return state.list[0].listId
            }else{
               return ''
            }
         case SET_LIST:
            if (action.lists[0]){
               return action.lists[0].id
            }else{
               return ''
            }
         default:
            break
      }
   }

   switch (action.type) {
      case SET_TASK:
         const updatedAddList = state.list.map(listItem => {
            if (listItem.listId === state.currentList) {
               return {
                  ...listItem,
                  tasks: [...action.tasks.items],
               };
            } else {
               return listItem;
            }
         });

         return {
            ...state,
            list: updatedAddList,
         };
      case ADD_TASK:
         const updatedAddTask = state.list.map(listItem => {
            if (listItem.listId === state.currentList) {
               return {
                  ...listItem,
                  tasks: [action.tasks, ...listItem.tasks],
               };
            } else {
               return listItem;
            }
         });

         return {
            ...state,
            list: updatedAddTask,
         };
      case DELETE_TASK:
         const updatedDeletedList = state.list.map(listItem => {
            if (state.currentList === listItem.listId) {
               const updatedTasks = listItem.tasks.filter(task => {
                  return  task.id !== action.id
               });
               return {
                  ...listItem,
                  tasks: updatedTasks,
               };
            }
            return listItem;
         });

         return {
            ...state,
            list: updatedDeletedList,
         };
      case SET_LIST:
         const newLists = action.lists.map(listItem => {
            return {
               listId: listItem.id,
               title: listItem.title,
               addedDate: listItem.addedDate,
               order: listItem.order,
               tasks: [],
            };
         });

         return {
            ...state,
            currentList: setCurrentList(),
            list: [...state.list, ...newLists],
         };
      case ADD_LIST:
         return {
            ...state,
            currentList: action.listItem.id,
            list: [{
               listId: action.listItem.id,
               title: action.listItem.title,
               addedDate: action.listItem.addedDate,
               order: action.listItem.order,
               tasks: [],
            }, ...state.list],
         };
      case DELETE_LIST:
         return {
            ...state,
            currentList: setCurrentList(),
            list: state.list.filter(item => action.listId !== item.listId)
         }
      case SET_CURRENT_LIST:
         return {
            ...state,
            currentList: action.listId,
         }
      case CLEAR_LIST_TASK:
         return {
            ...state,
            list: [],
            currentList: '',
         }
      default:
         return state
   }
}

// ===== Dispatch

export const setTaskAC = (data) => {
   return {type: SET_TASK, tasks: data}
}

export const addTaskAC = (data) => {
   return {type: ADD_TASK, tasks: data}
}

export const deleteTaskAC = (taskId) => {
   return {type: DELETE_TASK, id: taskId}
}

export const setListAC = (data) => {
   return {type: SET_LIST, lists: data }
}

export const addListAC = (data) => {
   return {type: ADD_LIST, listItem: data.item }
}

export const deleteListAC = (listId) => {
   return {type: DELETE_LIST, listId}
}

export const setCurrentListAC = (listId) => {
   return {type: SET_CURRENT_LIST, listId}
}

export const clearListTaskAC = () => {
   return {type: CLEAR_LIST_TASK}
}

// ===== Thunks

export const getListTC = () => {
   return function (dispatch){
      listAPI.getList().then(data => {
         dispatch(setListAC(data))
      })
   }
}

export const addListTC = (listTitle) => {
   return function (dispatch){
      listAPI.addList(listTitle).then(data => {
         if (data.resultCode === 0){
            dispatch(addListAC(data.data))
         }else{
            alert('Server error! List don`t added')
         }
      })
   }
}

export const deleteListTC = (listId) => {
   return function (dispatch){
      listAPI.deleteList(listId).then(data => {
         if (data.resultCode === 0){
            dispatch(deleteListAC(listId))
         }else{
            alert('Server error! List don`t deleted')
         }
      })
   }
}

export const addTaskTC = (listId, title) => {
   return function (dispatch){
      taskAPI.addTask(listId, title).then(data => {
         if(data.resultCode === 0){
            dispatch(addTaskAC(data.data.item))
         }else{
            alert("Server error! Task don`t added")
         }
      })
   }
}

export const deleteTaskTC = (listId, taskId) => {
   return function (dispatch){
      taskAPI.deleteTask(listId, taskId).then(data => {
         if(data.resultCode === 0){
            dispatch(deleteTaskAC(taskId))
         }else{
            alert("Server error! Task don`t deleted")
         }
      })
   }
}

export const getTaskTC = (listId) => {
   return function (dispatch){
      if (listId.length > 1){
         taskAPI.getTask(listId).then(data => {
            dispatch(setTaskAC(data))
         })
      }
   }
}

export default todoReducer