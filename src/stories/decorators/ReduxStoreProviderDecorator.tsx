import { Provider } from "react-redux";
import { AppRootStateType } from "../../app/store";
import { tasksReducer } from "../../features/TodolistsList/tasks-reducer";
import { todolistsReducer } from "../../features/TodolistsList/todolists-reducer";
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { v1 } from "uuid";


// const rootReducer = combineReducers({
//   tasks: tasksReducer,
//   todolists: todolistsReducer
// })
// const initialGlobalState: AppRootStateType = {
//   todolists: [
//     { id: "todolistId1", title: "What to learn", filter: "all", entityStatus: 'idle' },
//     { id: "todolistId2", title: "What to buy", filter: "all", entityStatus: 'idle' }
//   ],
//   tasks: {
//     ["todolistId1"]: [
//       { id: v1(), title: "HTML&CSS", isDone: true },
//       { id: v1(), title: "JS", isDone: true }
//     ],
//     ["todolistId2"]: [
//       { id: v1(), title: "Milk", isDone: true },
//       { id: v1(), title: "React Book", isDone: true }
//     ]
//   },
//   app: {
//     error: null,
//     status: 'idle'
//   },
// };
// export const storyBookStore = createStore(rootReducer, initialGlobalState);

// export const ReduxStoreProviderDecorator = (storyFn: any) => {
//   return <Provider store={storyBookStore}>{storyFn()}</Provider>
// }