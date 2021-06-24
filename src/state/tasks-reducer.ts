import { TasksStateType, TodolistType } from '../App'
import { v1 } from 'uuid'

export type RemoveTaskAT = {
  type: 'REMOVE_TASK'
  id: string
  todolistId: string
}

export type AddTaskAT = {
  type: 'ADD_TASK'
  title: string
  todolistId: string
}

export type changeStatusAT = {
  type: 'CHANGE_STATUS'
  id: string
  isDone: boolean
  todolistId: string
}

export type changeTaskTitleAT = {
  type: 'CHANGE_TASK_TITLE'
  id: string
  title: string
  todolistId: string
}

type AddTodolistAC = {
  type: 'ADD_TODO_LIST'
  title: string
  todolistId: string
}

type removeTodolistAC = {
  type: 'REMOVE_TODOLIST'
  todolistId: string
}

type ActionsType =
  | RemoveTaskAT
  | AddTaskAT
  | changeStatusAT
  | changeTaskTitleAT
  | AddTodolistAC
  | removeTodolistAC

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
  switch (action.type) {
    case 'REMOVE_TASK':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(item => {
          return item.id !== action.id
        })
      }

    case 'ADD_TASK':
      let newTask = { id: v1(), title: action.title, isDone: false }
      return {
        ...state,
        [action.todolistId]: [newTask, ...state[action.todolistId]]
      }

    case 'CHANGE_STATUS':
      return {
        ...state,
        [action.todolistId]: [
          ...state[action.todolistId].map(item =>
            item.id === action.id
              ? { ...item, isDone: action.isDone }
              : { ...item }
          )
        ]
      }

    case 'CHANGE_TASK_TITLE':
      return {
        ...state,
        [action.todolistId]: [
          ...state[action.todolistId].map(item =>
            item.id === action.id
              ? { ...item, title: action.title }
              : { ...item }
          )
        ]
      }
    case 'ADD_TODO_LIST':
      return { ...state, [action.todolistId]: [] }
    case 'REMOVE_TODOLIST':
      let newState = { ...state }
      delete newState[action.todolistId]
      return newState

    default:
      throw new Error("I don't understand this type")
  }
}

export const removeTaskAC = (id: string, todolistId: string): RemoveTaskAT => {
  return { type: 'REMOVE_TASK', id: id, todolistId: todolistId }
}

export const addTaskAC = (title: string, todolistId: string): AddTaskAT => {
  return { type: 'ADD_TASK', title: title, todolistId: todolistId }
}

export const changeTaskStatusAC = (
  id: string,
  isDone: boolean,
  todolistId: string
): changeStatusAT => {
  return { type: 'CHANGE_STATUS', id, isDone, todolistId }
}

export const changeTaskTitleAC = (
  id: string,
  title: string,
  todolistId: string
): changeTaskTitleAT => {
  return { type: 'CHANGE_TASK_TITLE', id, title, todolistId }
}

export const addTodolistAC = (title: string): AddTodolistAC => {
  return { type: 'ADD_TODO_LIST', title, todolistId: v1() }
}

export const removeTodolistAC = (todolistId: string): removeTodolistAC => {
  return { type: 'REMOVE_TODOLIST', todolistId }
}
