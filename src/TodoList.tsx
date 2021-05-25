import React, { ChangeEvent, useState } from 'react'
import { FilterValuesType, TaskType } from './App'

type propsTodoListType = {
  title: string
  tasks: Array<TaskType>
  filter: FilterValuesType
  removeTask: (taskID: string) => void
  addTask: (title: string) => void
  changeTodoListFilter: (filterValue: FilterValuesType) => void
  changeTaskStatus: (taskID: string, newValue: boolean) => void
}

function TodoList (props: propsTodoListType) {
  //BLL
  const [title, setTitle] = useState<string>('') // create local state
  const [error, setError] = useState<boolean>(false)

  const onClickAddTask = () => {
    const validatedTitle = title.trim()
    if (validatedTitle) {
      props.addTask(validatedTitle)
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
          onChange={e => props.changeTaskStatus(task.id, e.target.checked)
          }
        />
        <span className={taskClass}>{task.title}</span>

        <button
          onClick={function () {
            props.removeTask(task.id)
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
      <h3>{props.title}</h3>
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
            props.changeTodoListFilter('all')
          }}
        >
          All
        </button>
        <button
          className={props.filter === 'active' ? 'activeFilter' : ''}
          onClick={function () {
            props.changeTodoListFilter('active')
          }}
        >
          Active
        </button>
        <button
          className={props.filter === 'completed' ? 'activeFilter' : ''}
          onClick={function () {
            props.changeTodoListFilter('completed')
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
