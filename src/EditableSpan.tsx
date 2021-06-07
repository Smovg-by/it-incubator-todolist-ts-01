import React, { useState, ChangeEvent } from 'react'

type EditableSpanPropsType = {
  title: string
  taskId?: string
  listId: string
  changeTaskTitle?: (id: string, title: string, todolistId: string) => void
  changeListTitle?: (title: string, todolistId: string) => void
}

export function EditableSpan (props: EditableSpanPropsType) {
  //BLL
  let [title, setTitle] = useState(props.title)
  let [editMode, setEditMode] = useState(false)

  const activateEditMode = () => {
    setEditMode(true)
  }

  const activateViewMode = () => {
    if (props.taskId && props.changeTaskTitle) {
      props.changeTaskTitle(props.taskId, title, props.listId)
      setEditMode(false)
    }
    if (!props.taskId && props.changeListTitle) {
      props.changeListTitle(title, props.listId)
      setEditMode(false)
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  //UI
  return editMode ? (
    <input
      value={title}
      onChange={onChangeHandler}
      autoFocus
      onBlur={activateViewMode}
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.title}</span>
  )
}
