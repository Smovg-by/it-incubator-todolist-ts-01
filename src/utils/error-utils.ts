import {
  setErrorAC,
  setErrorActionType,
  setStatusAC,
  setStatusActionType
} from '../app/app-reducer'
import { ResponseType } from '../api/todolists-api'
import { Dispatch } from 'redux'

export const handleServerAppError = <D>(
  data: ResponseType<D>,
  dispatch: Dispatch<setErrorActionType | setStatusActionType>
) => {
  if (data.messages.length) {
    dispatch(setErrorAC(data.messages[0]))
  } else {
    dispatch(setErrorAC('some error occurred'))
  }
  dispatch(setStatusAC('failed'))
}

export const handleServerNetworkError = (
  message: string,
  dispatch: Dispatch<setErrorActionType | setStatusActionType>
) => {
  message ? dispatch(setErrorAC(message)) : dispatch(setErrorAC('some error occurred'))
  dispatch(setStatusAC('failed'))
}
