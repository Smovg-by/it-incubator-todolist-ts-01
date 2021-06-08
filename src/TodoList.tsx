import React, { ChangeEvent } from 'react'
import { FilterValuesType } from './App'
import { AddItemForm } from './AddItemForm'
import { EditableSpan } from './EditableSpan'
import { Button, Checkbox, IconButton } from '@material-ui/core'
import { Delete } from '@material-ui/icons'

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  id: string
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string, todolistId: string) => void
  changeFilter: (value: FilterValuesType, todolistId: string) => void
  addTask: (title: string, todolistId: string) => void
  changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
  removeTodolist: (id: string) => void
  changeTodolistTitle: (id: string, newTitle: string) => void
  filter: FilterValuesType
  changeTaskTitle: (
    taskId: string,
    newTitle: string,
    todolistId: string
  ) => void
}

export function Todolist (props: PropsType) {
  const addTask = (title: string) => {
    props.addTask(title, props.id)
  }

  const removeTodolist = () => {
    props.removeTodolist(props.id)
  }
  const changeTodolistTitle = (title: string) => {
    props.changeTodolistTitle(props.id, title)
  }

  const onAllClickHandler = () => props.changeFilter('all', props.id)
  const onActiveClickHandler = () => props.changeFilter('active', props.id)
  const onCompletedClickHandler = () =>
    props.changeFilter('completed', props.id)

  return (
    <div>
      <h3>
        {' '}
        <EditableSpan value={props.title} onChange={changeTodolistTitle} />
        <IconButton onClick={removeTodolist} color={'secondary'}>
          <Delete />
        </IconButton>
        {/* <button onClick={removeTodolist}>x</button> */}
      </h3>
      <AddItemForm addItem={addTask} />
      <ul style={{ listStyle: 'none', paddingLeft: '0px' }}>
        {props.tasks.map(t => {
          const onClickHandler = () => props.removeTask(t.id, props.id)
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked
            props.changeTaskStatus(t.id, newIsDoneValue, props.id)
          }
          const onTitleChangeHandler = (newValue: string) => {
            props.changeTaskTitle(t.id, newValue, props.id)
          }

          return (
            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
              <Checkbox
                onChange={onChangeHandler}
                checked={t.isDone}
                color={'primary'}
              />

              {/* <input
                type='checkbox'
                onChange={onChangeHandler}
                checked={t.isDone}
              /> */}
              <EditableSpan value={t.title} onChange={onTitleChangeHandler} />

              <IconButton onClick={onClickHandler}>
                <Delete />
              </IconButton>

              {/* <button onClick={onClickHandler}>x</button> */}
            </li>
          )
        })}
      </ul>
      <div>
        <Button
          style={{ margin: '5px' }}
          size={'small'}
          variant={props.filter === 'all' ? 'contained' : 'outlined'}
          color={'primary'}
          //   className={props.filter === 'all' ? 'active-filter' : ''}
          onClick={onAllClickHandler}
        >
          All
        </Button>
        <Button
          style={{ margin: '5px' }}
          size={'small'}
          variant={props.filter === 'active' ? 'contained' : 'outlined'}
          color={'primary'}
          //   className={props.filter === 'active' ? 'active-filter' : ''}
          onClick={onActiveClickHandler}
        >
          Active
        </Button>
        <Button
          style={{ margin: '5px' }}
          size={'small'}
          variant={props.filter === 'completed' ? 'contained' : 'outlined'}
          color={'primary'}
          //   className={props.filter === 'completed' ? 'active-filter' : ''}
          onClick={onCompletedClickHandler}
        >
          Completed
        </Button>
      </div>
    </div>
  )
}
