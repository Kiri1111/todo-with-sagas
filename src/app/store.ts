import {
    tasksReducer
} from '../features/TodolistsList/tasks-reducer';
import {todolistsReducer} from '../features/TodolistsList/todolists-reducer';
import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {appReducer, initializeAppWorkerSaga} from './app-reducer'
import {authReducer} from '../features/Login/auth-reducer'
import createSagaMiddleware from 'redux-saga'
import {takeEvery} from 'redux-saga/effects'
import {fetchTasksWorkerSaga, removeTaskWorkerSaga} from "../features/TodolistsList/tasks-sagas";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})

const sagaMiddleware = createSagaMiddleware()

// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, sagaMiddleware));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>


sagaMiddleware.run(rootWatcher)

function* rootWatcher() {
    yield takeEvery('APP/INITIALIZE-APP', initializeAppWorkerSaga)
    yield takeEvery('TASKS/FETCH-TASKS', fetchTasksWorkerSaga)
    yield takeEvery('TASKS/REMOVE-TASKS', removeTaskWorkerSaga)
}


// @ts-ignore
window.store = store;
