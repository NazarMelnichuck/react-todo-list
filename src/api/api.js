import axios from "axios";

const instance = axios.create({
   baseURL: 'https://social-network.samuraijs.com/api/1.1/',
   withCredentials: true,
   headers: {
      'API-KEY': '851092d2-50f7-4738-8ab5-17cd12b2602e',
   },
})

export const authAPI = {
   isAuth(){
      return instance.get('auth/me').then(response => {
         return response.data
      })
   },

   logIn(email, password){
      return instance.post('auth/login', {email: email, password: password}).then(response => {
         return response.data
      })
   },

   logOut(){
      return instance.delete('auth/login').then(response => {
         return response.data
      })
   }
}

export const taskAPI = {
   getTask(listId) {
      return instance.get(`todo-lists/${listId}/tasks`).then(response => {
         return response.data
      })
   },

   addTask(listId, title) {
      return instance.post(`todo-lists/${listId}/tasks`, {title: title}).then(response => {
         return response.data
      })
   },

   deleteTask(listId, taskId) {
      return instance.delete(`todo-lists/${listId}/tasks/${taskId}`).then(response => {
         return response.data
      })
   }
}

export const listAPI = {
   getList() {
      return instance.get('todo-lists').then(response => {
         return response.data
      })
   },

   addList(listTitle) {
      return instance.post('todo-lists', {title: listTitle}).then(response => {
         return response.data
      })
   },

   deleteList(listId) {
      return instance.delete(`todo-lists/${listId}`).then(response => {
         return response.data
      })
   }
}