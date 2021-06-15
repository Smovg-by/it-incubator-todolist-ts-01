import { v1 } from 'uuid'
import { FilterValuesType, TodolistType } from '../App'

type RemoveTodollistAT = {
  type: 'REMOVE-TODOLIST'
  id: string
}
type AddTodollistAT = {
  type: 'ADD-TODOLIST'
  title: string
}
type ChangeTodolistTitleAT = {
  type: 'CHANGE-TODOLIST-TITLE'
  id: string
  title: string
}
type ChangeTodolistFilterAT = {
  type: 'CHANGE-TODOLIST-FILTER'
  id: string
  filter: FilterValuesType
}

type ActionType =
  | RemoveTodollistAT
  | AddTodollistAT
  | ChangeTodolistTitleAT
  | ChangeTodolistFilterAT

export const todolistsReducer = (
  todoLists: Array<TodolistType>,
  action: ActionType
) => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      todoLists = [...todoLists.filter(tl => tl.id != action.id)]
      return todoLists

    case 'ADD-TODOLIST':
      let newTodolist: TodolistType = {
        id: v1(),
        title: action.title,
        filter: 'all'
      }
      todoLists = [...todoLists, newTodolist]
      console.table(todoLists)
      return todoLists

    case 'CHANGE-TODOLIST-TITLE':
      console.table(todoLists)
      const todolist = todoLists.find(tl => tl.id === action.id)
      if (todolist) {
        todolist.title = action.title
      }
      console.table(todoLists)
      return todoLists

    case 'CHANGE-TODOLIST-FILTER':
      console.table(todoLists)
      let findTodolist = todoLists.find(tl => tl.id === action.id)
      if (findTodolist) {
        findTodolist.filter = action.filter
      }
      console.table(todoLists)
      return todoLists

    default:
      return todoLists
  }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodollistAT => {
  return { type: 'REMOVE-TODOLIST', id: todolistId }
}
export const AddTodollistAC = (title: string): AddTodollistAT => {
  return { type: 'ADD-TODOLIST', title: title }
}
export const ChangeTodolistTitleAC = (
  id: string,
  title: string
): ChangeTodolistTitleAT => {
  return { type: 'CHANGE-TODOLIST-TITLE', id: id, title: title }
}
export const ChangeTodolistFilterAC = (
  id: string,
  filter: FilterValuesType
): ChangeTodolistFilterAT => {
  return { type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter }
}
