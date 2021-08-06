export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const SET_STATUS = "APP/SET-STATUS"
const SET_ERROR = "APP/SET-ERROR"

type SetStatusType = {
  type: typeof SET_STATUS
  status: RequestStatusType
}

type SetErrorType = {
  type: typeof SET_ERROR
  error: string | null
}

export type setStatusActionType = ReturnType<typeof setStatusAC>
export type setErrorActionType = ReturnType<typeof setErrorAC>

export const setStatusAC = (status: RequestStatusType): SetStatusType => ({
  type: SET_STATUS, status
} as const)

export const setErrorAC = (error: string | null): SetErrorType => ({
  type: SET_ERROR, error
} as const)


type ActionType = setStatusActionType | setErrorActionType

const initialState = {
  // происходит ли сейчас взаимодействие с сервером
  status: 'idle' as RequestStatusType,
  // если возникает глобальная ошибка 'failed' , записываем код ошибки в error
  error: null as string | null
}

export type initialStateType = typeof initialState

export const appReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {
  switch (action.type) {
    case "APP/SET-STATUS":
      return { ...state, status: action.status }
    case "APP/SET-ERROR":
      return { ...state, error: action.error }
    default:
      return state
  }
}
