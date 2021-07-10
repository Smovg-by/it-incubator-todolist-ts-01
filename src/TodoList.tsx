import React, { useCallback } from 'react'
import { FilterValuesType } from './App'
import { AddItemForm } from './AddItemForm'
import { EditableSpan } from './EditableSpan'
import { Button, IconButton } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { Task } from './Task'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    changeTaskTitle: (
        taskId: string,
        newTitle: string,
        todolistId: string
    ) => void
}

export const Todolist = React.memo(
    ({
        id,
        removeTodolist,
        changeFilter,
        removeTask,
        changeTaskStatus,
        changeTaskTitle,
        addTask,
        changeTodolistTitle,
        ...props
    }: PropsType) => {

        console.log('Todolist');

        const addTaskCB = useCallback(
            (title: string) => {
                addTask(title, id)
            },
            [addTask, id]
        )

        const removeTodolistCB = useCallback(() => {
            removeTodolist(id)
        }, [removeTodolist, id])

        const changeTodolistTitleCB = useCallback(
            (title: string) => {
                changeTodolistTitle(id, title)
            },
            [changeTodolistTitle, id]
        )

        const onAllClickHandler = useCallback(() => changeFilter('all', id), [
            changeFilter,
            id
        ])
        const onActiveClickHandler = useCallback(() => changeFilter('active', id), [
            changeFilter,
            id
        ])
        const onCompletedClickHandler = useCallback(
            () => changeFilter('completed', id),
            [changeFilter, id]
        )

        let tasksForTodolist = props.tasks

        if (props.filter === 'active') {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
        }
        if (props.filter === 'completed') {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
        }

        const removeTaskCB = useCallback(
            (taskId: string, todolistId: string) => {
                removeTask(taskId, todolistId)
            },
            [removeTask]
        )

        const changeTaskStatusCB = useCallback(
            (taskId: string, newIsDoneValue: boolean, todolistId: string) => {
                changeTaskStatus(taskId, newIsDoneValue, todolistId)
            },
            [changeTaskStatus]
        )

        const changeTaskTitleCB = useCallback(
            (taskId: string, newValue: string, todolistId: string) => {
                changeTaskTitle(taskId, newValue, todolistId)
            },
            [changeTaskTitle]
        )

        return (
            <div>
                <h3>
                    {' '}
                    <EditableSpan value={props.title} onChange={changeTodolistTitleCB} />
                    <IconButton onClick={removeTodolistCB}>
                        <Delete />
                    </IconButton>
                </h3>
                <AddItemForm addItem={addTaskCB} />
                <div>
                    {tasksForTodolist.map(t => (
                        <Task
                            key={t.id}
                            todolistId={id}
                            task={t}
                            removeTask={removeTaskCB}
                            changeTaskStatus={changeTaskStatusCB}
                            changeTaskTitle={changeTaskTitleCB}
                        />
                    ))}
                </div>
                <div style={{ paddingTop: '10px' }}>
                    <Button
                        variant={props.filter === 'all' ? 'outlined' : 'text'}
                        onClick={onAllClickHandler}
                        color={'default'}
                    >
                        All
                    </Button>
                    <Button
                        variant={props.filter === 'active' ? 'outlined' : 'text'}
                        onClick={onActiveClickHandler}
                        color={'primary'}
                    >
                        Active
                    </Button>
                    <Button
                        variant={props.filter === 'completed' ? 'outlined' : 'text'}
                        onClick={onCompletedClickHandler}
                        color={'secondary'}
                    >
                        Completed
                    </Button>
                </div>
            </div>
        )
    }
)
