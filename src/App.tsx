import React, { useState } from 'react'
import './App.css'
import TodoList from './TodoList'
import { v1 } from 'uuid'

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App () {
  console.log(v1())
  //BLL

  const [filter, setFilter] = useState<FilterValuesType>('all')

  const [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: 'HTML', isDone: true },
    { id: v1(), title: 'CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'React', isDone: false },
    { id: v1(), title: 'Redux', isDone: false }
  ])

  function addTask (taskTitle: string) {
    const newTask: TaskType = {
      id: v1(),
      title: taskTitle,
      isDone: false
    }
    const newTasks = [newTask, ...tasks] // construct a new array with new task
    setTasks(newTasks) //put a new array into useState to render
  }

  function removeTask (taskID: string) {
    const filteredTasks = tasks.filter(function (tasks) {
      return tasks.id !== taskID
    })
    setTasks(filteredTasks)
  }

  function getFilteredTasks () {
    switch (filter) {
      case 'active':
        return tasks.filter(task => !task.isDone)
      case 'completed':
        return tasks.filter(task => task.isDone)
      default:
        return tasks
    }
  }

  function changeTodoListFilter (FilterValue: FilterValuesType) {
    setFilter(FilterValue)
  }

  function changeTaskStatus (taskID: string, newValue: boolean) {
    debugger
    const updatedTasks = tasks.map(item =>
      item.id === taskID ? { ...item, isDone: newValue } : item
    )
    setTasks(updatedTasks)
  }

  // UI: (use interface)
  return (
    <div className='App'>
      <TodoList
        title={'What to learn'}
        tasks={getFilteredTasks()}
        removeTask={removeTask}
        changeTodoListFilter={changeTodoListFilter}
        addTask={addTask}
        filter={filter}
        changeTaskStatus={changeTaskStatus}
      />
    </div>
  )
}

export default App
