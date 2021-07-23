import React, { useEffect, useState } from 'react'
import { todolistAPI } from '../api/todolist-api'

export default {
  title: 'API'
}

//
export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    todolistAPI.getTodos().then(res => {
      setState(res.data)
    })
  }, [])
  return <div> {JSON.stringify(state)}</div>
}
//
export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    todolistAPI.createTodos('new todolists!!!').then(res => {
      setState(res.data)
    })
  }, [])
  return <div> {JSON.stringify(state)}</div>
}
//
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = "8cd49b32-a2ea-4d59-9e25-2f9396e7dd27"
    todolistAPI.deleteTodolist(todolistId)
      .then(res => {
        setState(res.data)
      })
  }, [])
  return <div> {JSON.stringify(state)}</div>
}
//
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = '32623b05-5c23-46aa-89f5-823179277150'
    todolistAPI.updateTodolist(todolistId, 'SOME NEW TITLE')
      .then(res => {
        setState(res.data)
      })
  }, [])
  return <div> {JSON.stringify(state)}</div>
}
