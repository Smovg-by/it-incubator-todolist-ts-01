import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    'API-KEY': '529ae99f-10c2-4c69-896d-880d16566f14'
  }
})

export type CommonResponseType<T = {}> = {
  resultCode: number
  messages: Array<string>
  fieldsErrors: Array<string>
  data: T
}

export type TodoType = {
  id: string
  title: string
  addedDate: string
  order: number
}

export const todolistAPI = {
  getTodos() {
    return instance.get<Array<TodoType>>('todo-lists')
  },

  createTodos(title: string) {
    return instance.post<CommonResponseType<{ item: TodoType }>>('todo-lists', { title })
  },

  deleteTodolist(todolistId: string) {
    return instance.delete<CommonResponseType<{}>>(`todo-lists/${todolistId}`)
  },

  updateTodolist(todolistId: string, title: string) {
    return instance.put<CommonResponseType<{}>>(`todo-lists/${todolistId}`, { title })
  }
}
