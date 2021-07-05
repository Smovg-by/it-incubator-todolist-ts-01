import { TaskType } from './../Todolist'
import { v1 } from 'uuid'
import { TodolistType, TasksStateType } from '../App'

type RemoveTaskAT = {
  type: 'REMOVE_TASK'
  taskId: string
  todolistId: string
}
type AddTaskAT = {
  type: 'ADD_TASK'
  title: string
  todolistId: string
}
type ChangeTaskStatusAT = {
  type: 'CHANGE_STATUS'
  id: string
  isDone: boolean
  todolistId: string
}
type AddTodoListAT = {
  type: 'ADD_TODOLIST'
  title: string
  addTodoListId: string
}

export type TasksReducerActionType =
  | RemoveTaskAT
  | AddTaskAT
  | ChangeTaskStatusAT
  | AddTodoListAT

export const tasksReducer = (
  state: TasksStateType,
  action: TasksReducerActionType
) => {
  switch (action.type) {
    case 'REMOVE_TASK':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(
          task => task.id !== action.taskId
        )
      }
    case 'ADD_TASK':
      let newTask: TaskType = {
        id: v1(),
        title: action.title,
        isDone: false
      }
      return {
        ...state,
        [action.todolistId]: [newTask, ...state[action.todolistId]]
      }

    case 'CHANGE_STATUS':
      return {
        ...state,
        [action.todolistId]: [
          ...state[action.todolistId].map(item => {
            if (item.id === action.id) {
              return { ...item, isDone: action.isDone }
            } else {
              return item
            }
          })
        ]
      }

    case 'ADD_TODOLIST':
      return { ...state, [action.addTodoListId]: [] }

    default:
      throw new Error('I don understan this type')
  }
}

export const removeTaskAC = (
  taskId: string,
  todolistId: string
): RemoveTaskAT => {
  return { type: 'REMOVE_TASK', taskId: taskId, todolistId }
}
export const addTaskAC = (title: string, todolistId: string): AddTaskAT => {
  return { type: 'ADD_TASK', title: title, todolistId: todolistId }
}
export const changeTaskStatusAC = (
  id: string,
  isDone: boolean,
  todolistId: string
): ChangeTaskStatusAT => {
  return {
    type: 'CHANGE_STATUS',
    id: id,
    isDone: isDone,
    todolistId: todolistId
  }
}
export const addTodolistAC = (title: string): AddTodoListAT => {
  return { type: 'ADD_TODOLIST', title: title, addTodoListId: v1() }
}
