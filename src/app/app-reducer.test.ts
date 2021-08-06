import { appReducer, initialStateType, setErrorAC, setStatusAC } from "./app-reducer"

let startState: initialStateType

beforeEach(() => {
  startState = {
    error: null,
    status: 'idle'
  }
})

test('corrct error message should be set', () => {
  const endState = appReducer(startState, setErrorAC('some error'))
  expect(endState.error).toBe('some error')
})

test('status should be set', () => {
  const endState = appReducer(startState, setStatusAC('loading'))
  expect(endState.status).toBe('loading')
})