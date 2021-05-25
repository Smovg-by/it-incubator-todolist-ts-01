import React, { ChangeEvent, useState } from 'react'
import { FilterValuesType, TaskType } from './App'

type propsTodoListType = {
  todoListID: string
  title: string
  tasks: Array<TaskType>
  filter: FilterValuesType
  removeTask: (taskID: string, todoListID: string) => void
  addTask: (title: string, todoListID: string) => void
  changeTodoListFilter: (filterValue: FilterValuesType, todoListID: string) => void
  changeTaskStatus: (taskID: string, newValue: boolean, todoListID: string) => void
  removeTodoList: (taskID: string)=>void
}

function TodoList (props: propsTodoListType) {
  //BLL
  const [title, setTitle] = useState<string>('') // create local state
  const [error, setError] = useState<boolean>(false)

  const onClickAddTask = () => {
    const validatedTitle = title.trim()
    if (validatedTitle) {
      props.addTask(validatedTitle, props.todoListID)
    } else {
      setError(true)
    }
    setTitle('')
  }

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
    setError(false)
  }

  const onPressTitle = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClickAddTask()
    }
  }

  const tasksJSX = props.tasks.map(function (task) {
    let taskClass = task.isDone ? 'isDone' : ''
    return (
      <li key={task.id}>
        <input
          type='checkbox'
          checked={task.isDone}
          onChange={e => props.changeTaskStatus(task.id, e.target.checked, props.todoListID)
          }
        />
        <span className={taskClass}>{task.title}</span>

        <button
          onClick={function () {
            props.removeTask(task.id, props.todoListID)
          }}
        >
          X
        </button>
      </li>
    )
  })

  //UI

  return (
    <div>
      <h3>{props.title}<button onClick={()=>{props.removeTodoList(props.todoListID)}}>X</button></h3>
      <div>
        <input
          className={error ? 'error' : ''}
          value={title}
          onChange={onChangeTitle}
          onKeyPress={onPressTitle}
        />
        <button onClick={onClickAddTask}>add task</button>
      </div>
      <ul>{tasksJSX}</ul>
      <div>
        <button
          className={props.filter === 'all' ? 'activeFilter' : ''}
          onClick={function () {
            props.changeTodoListFilter('all', props.todoListID)
          }}
        >
          All
        </button>
        <button
          className={props.filter === 'active' ? 'activeFilter' : ''}
          onClick={function () {
            props.changeTodoListFilter('active', props.todoListID)
          }}
        >
          Active
        </button>
        <button
          className={props.filter === 'completed' ? 'activeFilter' : ''}
          onClick={function () {
            props.changeTodoListFilter('completed', props.todoListID)
          }}
        >
          Completed
        </button>
        {error && <div style={{ color: 'red' }}>Invalid imput</div>}
      </div>
    </div>
  )
}

export default TodoList
