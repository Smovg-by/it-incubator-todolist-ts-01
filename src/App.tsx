import React, {useState} from 'react';
import './App.css';
import TodoList from './TodoList';

export type TaskType = {
  id: number,
  title: string,
  isDone: boolean,
}

export type FilterValuesType =
  'all'
  | 'active'
  | 'completed'


function App() {

  //BLL

  const [filter, setFilter] = useState<FilterValuesType>('all')

  const [tasks, setTasks] = useState<Array<TaskType>>(
    [
      {id: 0, title: 'HTML', isDone: true},
      {id: 1, title: 'CSS', isDone: true},
      {id: 2, title: 'JS', isDone: true},
      {id: 3, title: 'React', isDone: false},
      {id: 4, title: 'Redux', isDone: false},
    ])

  function removeTask(taskID: number) {
    const filteredTasks = tasks.filter(
      function (tasks) {
        return tasks.id !== taskID;
      })
    setTasks(filteredTasks)
  }

  // под капотом происходит следующее
  // if (filteredTasks !== tasks) {
  // tasks = filteredTasks;
  // React.render();
  // }

  function getFilteredTasks() {
    switch (filter) {
      case 'active':
        return tasks.filter(task => task.isDone === false)
      case 'completed':
        return tasks.filter(task => task.isDone === true)
      default:
        return tasks;
    }
  }

  function changeTodoListFilter(FilterValue: FilterValuesType) {
    setFilter(FilterValue);
  }

  // UI: (use interface)
  return (
    <div className="App">
      <TodoList title={'What to learn'}
                tasks={getFilteredTasks()}
                removeTask={removeTask}
                changeTodoListFilter={changeTodoListFilter}
      />
    </div>
  );
}

export default App;
