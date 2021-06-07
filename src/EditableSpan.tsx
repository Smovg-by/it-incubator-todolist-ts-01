import React, { useState, ChangeEvent } from 'react'

type EditableSpanPropsType = {
  title: string
  onChange: (newTitle: string) => void
  // taskId?: string
  // listId: string
  // changeTaskTitle?: (id: string, title: string, todolistId: string) => void
  // changeListTitle?: (title: string, todolistId: string) => void
}

export function EditableSpan (props: EditableSpanPropsType) {
  //BLL
  let [title, setTitle] = useState(props.title)
  let [editMode, setEditMode] = useState(false)

  const activateEditMode = () => {
    setEditMode(true)
    setTitle(props.title)
  }

  const activateViewMode = () => {
    setEditMode(false)
    props.onChange(title)
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
