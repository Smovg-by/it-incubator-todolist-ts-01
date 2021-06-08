import { IconButton, TextField } from '@material-ui/core'
import { AddBox, ErrorOutline } from '@material-ui/icons'
import React, { ChangeEvent, KeyboardEvent, useState } from 'react'

type AddItemFormPropsType = {
  addItem: (title: string) => void
}

export function AddItemForm (props: AddItemFormPropsType) {
  let [title, setTitle] = useState('')
  let [error, setError] = useState<string | null>(null)

  const addItem = () => {
    if (title.trim() !== '') {
      props.addItem(title)
    } else {
      setError('Title is required')
    }
    setTitle('')
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.charCode === 13) {
      addItem()
    }
  }

  return (
    <div>
      <TextField
        label='Type your task here'
        variant='outlined'
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        helperText={error && 'Title is required'}
      />

      {/* <input
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        className={error ? 'error' : ''}
      /> */}
      {/* <button onClick={addItem}>+</button> */}
      <IconButton onClick={addItem} color={'primary'}>
        <AddBox />
      </IconButton>

      {/* {error && <div className='error-message'>{error}</div>} */}
    </div>
  )
}
