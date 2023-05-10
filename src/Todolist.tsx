import {FilterValuesType} from './App';
import {ChangeEvent, useState} from "react";
import style from './App.css'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void
    filter: FilterValuesType
    todolistId: string
}

export function Todolist(props: PropsType) {

    const [title, setTitle] = useState<string>('')

    const [error, setError] = useState<string | null>(null)

    const addTaskHandler = () => {
        if (title.trim() !== '') {
            props.addTask(props.todolistId, title.trim())
            setTitle('')
        } else {
            setError('Введите таску')
        }
    }

    const onKeyDownHandler = (event) => {
        setError(null)
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

    const onChangeHandler = (event) => {
        setTitle(event.currentTarget.value)
    }

    const onClickAllHandler = () => {
        props.changeFilter(props.todolistId, "all")
    }

    const onClickActiveHandler = () => {
        props.changeFilter(props.todolistId, "active")
    }

    const onClickCompletedHandler = () => {
        props.changeFilter(props.todolistId, "completed")
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}
            />
            <button onClick={addTaskHandler}>+
            </button>
            {error && <div className={style.errorMessage}>{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => {
                        props.removeTask(props.todolistId, t.id)
                    }

                    const onChangeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        const newIsDoneValue = event.currentTarget.checked
                        props.changeTaskStatus(props.todolistId, t.id, newIsDoneValue)
                    }

                    return <li key={t.id} className={t.isDone ? 'isDone' : ''}>
                        <input type="checkbox"
                               checked={t.isDone}
                               onChange={onChangeStatusHandler}
                        />
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x
                        </button>
                    </li>
                })}
        </ul>
        <div>
            <button className={props.filter === "all" ? 'activeFilter' : ''}
                    onClick={onClickAllHandler}>
                All
            </button>
            <button className={props.filter === "active" ? 'activeFilter' : ''}
                    onClick={onClickActiveHandler}>
                Active
            </button>
            <button
                className={props.filter === "completed" ? 'activeFilter' : ''}
                onClick={onClickCompletedHandler}>
                Completed
            </button>
        </div>
    </div>
}
