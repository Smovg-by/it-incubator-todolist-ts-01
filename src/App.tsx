import React, { useState } from 'react'
import './App.css'
import TodoList from './TodoList'
import { v1 } from 'uuid'

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App () {
  console.log(v1())
  //BLL

  const todoListID_1 = v1()
  const todoListID_2 = v1()

  const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    { id: todoListID_1, title: 'What to learn', filter: 'all' },
    { id: todoListID_2, title: 'What to buy', filter: 'all' }
  ])

  const [tasks, setTasks] = useState<TasksStateType>({
    [todoListID_1]: [
      { id: v1(), title: 'HTML', isDone: true },
      { id: v1(), title: 'CSS', isDone: false },
      { id: v1(), title: 'CSS', isDone: false },
      { id: v1(), title: 'JS', isDone: true }
    ],
    [todoListID_2]: [
      { id: v1(), title: 'HTML', isDone: true },
      { id: v1(), title: 'CSS', isDone: false },
      { id: v1(), title: 'CSS', isDone: false },
      { id: v1(), title: 'JS', isDone: true }
    ]
  })

  // const [filter, setFilter] = useState<FilterValuesType>('all')

  // const [tasks, setTasks] = useState<Array<TaskType>>([
  //   { id: v1(), title: 'HTML', isDone: true },
  //   { id: v1(), title: 'CSS', isDone: true },
  //   { id: v1(), title: 'JS', isDone: true },
  //   { id: v1(), title: 'React', isDone: false },
  //   { id: v1(), title: 'Redux', isDone: false }
  // ])

  function addTask (taskTitle: string, todoListID: string) {
    const newTask: TaskType = {
      id: v1(),
      title: taskTitle,
      isDone: false
    }
    const copyTasks = { ...tasks }
    copyTasks[todoListID] = [newTask, ...tasks[todoListID]] // construct a new array with new task
    setTasks(copyTasks) //put a new array into useState to render
  }

  function removeTask (taskID: string, todoListID: string) {
    tasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskID)
    setTasks({ ...tasks })
  }

  function getFilteredTasks (tl: TodoListType) {
    switch (tl.filter) {
      case 'active':
        return tasks[tl.id].filter(task => !task.isDone)
      case 'completed':
        return tasks[tl.id].filter(task => task.isDone)
      default:
        return tasks[tl.id]
    }
  }

  function changeTodoListFilter (filter: FilterValuesType, todoListID: string) {
    setTodoLists(
      todoLists.map(tl =>
        tl.id === todoListID ? { ...tl, filter: filter } : tl
      )
    )
  }

  function changeTaskStatus (
    taskID: string,
    newValue: boolean,
    todoListID: string
  ) {
    const copyTasks = { ...tasks }
    copyTasks[todoListID] = tasks[todoListID].map(item =>
      item.id === taskID ? { ...item, isDone: newValue } : item
    )

    setTasks(copyTasks)
  }

  function removeTodoList (todoListID: string) {
    setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
    const copyTasks = { ...tasks }
    delete tasks[todoListID]
    setTasks(copyTasks)
  }

  const todoListComponents = todoLists.map(tl => {
    return (
      <TodoList
        key={tl.id} // для правильной отрисовки
        todoListID={tl.id}
        title={tl.title}
        tasks={getFilteredTasks(tl)} //TODO
        filter={tl.filter}
        removeTask={removeTask}
        changeTodoListFilter={changeTodoListFilter}
        addTask={addTask}
        changeTaskStatus={changeTaskStatus}
        removeTodoList={removeTodoList}
      />
    )
  })

  // UI: (use interface)
  return <div className='App'>{todoListComponents}</div>
}

export default App
