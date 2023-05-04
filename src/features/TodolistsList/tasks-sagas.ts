import {call, put} from "redux-saga/effects";
import {setAppStatusAC} from "../../app/app-reducer";
import {todolistsAPI} from "../../api/todolists-api";
import {removeTaskAC, setTasksAC} from "./tasks-reducer";

export function* fetchTasksWorkerSaga(action: ReturnType<typeof fetchTasks>) {
    yield put(setAppStatusAC('loading'))
    const res = yield call(todolistsAPI.getTasks, action.todolistId)

    const tasks = res.data.items
    yield put(setTasksAC(tasks, action.todolistId))
    yield put(setAppStatusAC('succeeded'))
}

export const fetchTasks = (todolistId: string) => ({type: 'TASKS/FETCH-TASKS', todolistId})

export function* removeTaskWorkerSaga(action: ReturnType<typeof removeTask>) {
    const res = yield call(todolistsAPI.deleteTask, action.todolistId, action.taskId)
    yield put(removeTaskAC(action.taskId, action.todolistId))
}

export const removeTask = (taskId: string, todolistId: string) => ({
    type: 'TASKS/REMOVE-TASKS',
    taskId,
    todolistId
})