import React from 'react';
import {FilterValuesType, TaskType} from './App';

type propsTodoListType = {
  title: string,
  tasks: Array<TaskType>
  removeTask: (taskID: number) => void
  changeTodoListFilter: (filterValue: FilterValuesType) => void
}

function TodoList(props: propsTodoListType) {

  const tasksJSX = props.tasks.map(function (task) {
    // const RT = props.removeTask(task.id)
    return (
      <li>
        <input type="checkbox" checked={task.isDone}/>
        <span>{task.title}</span>
        {/*<button onClick={RT}>X</button>*/}
        <button onClick={function () {
          props.removeTask(task.id)
        }}>X
        </button>
      </li>
    )
  });
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input/>
        <button
        >+
        </button>
      </div>
      <ul>
        {tasksJSX}
      </ul>
      <div>
        <button onClick={function () {
          props.changeTodoListFilter('all')
        }}>All
        </button>
        <button onClick={function () {
          props.changeTodoListFilter('active')
        }}>Active
        </button>
        <button onClick={function () {
          props.changeTodoListFilter('completed')
        }}>Completed
        </button>
      </div>
    </div>
  )
}

export default TodoList;