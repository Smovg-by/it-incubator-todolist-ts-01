import {
  AddTodollistAC,
  ChangeTodolistFilterAC,
  ChangeTodolistTitleAC,
  RemoveTodolistAC,
  todolistsReducer
} from './todolist-reducer'
import { v1 } from 'uuid'
import { FilterValuesType, TodolistType } from '../App'
//
//
//
test('correct todolist should be REMOVED', () => {
  let todolistId1 = v1()
  let todolistId2 = v1()
  const startState: Array<TodolistType> = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' }
  ]
  const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId1))
  expect(startState.length).toBe(2)
  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})
//
//
//
test('correct todolist should be ADDED', () => {
  let todolistId1 = v1()
  let todolistId2 = v1()
  let newTodolistTitle = 'New Added Todolist'
  const startState: Array<TodolistType> = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' }
  ]
  const endState = todolistsReducer(
    startState,
    AddTodollistAC(newTodolistTitle)
  )
  expect(startState.length).toBe(2)
  expect(endState.length).toBe(3)
  expect(endState[2].title).toBe(newTodolistTitle)
})
//
//
//
test('correct todolist should CHANGE TODOLIST TITLE', () => {
  let todolistId1 = v1()
  let todolistId2 = v1()
  let newTodolistTitle = 'New Todolist'
  const startState: Array<TodolistType> = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' }
  ]

  const endState = todolistsReducer(
    startState,
    ChangeTodolistTitleAC(todolistId2, newTodolistTitle)
  )
  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe(newTodolistTitle)
})
//
//
//
test('correct FILTER of todolist should be CHANGED', () => {
  let todolistId1 = v1()
  let todolistId2 = v1()
  let newFilter: FilterValuesType = 'completed'
  const startState: Array<TodolistType> = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' }
  ]
  const action = {
    type: 'CHANGE-TODOLIST-FILTER' as const,
    id: todolistId2,
    filter: newFilter
  }
  const endState = todolistsReducer(
    startState,
    ChangeTodolistFilterAC(todolistId2, newFilter)
  )
  expect(endState[0].filter).toBe('all')
  expect(endState[1].filter).toBe(newFilter)
})
