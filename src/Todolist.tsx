import {FilterValuesType} from './App';
import {ChangeEvent, useState} from "react";
import style from './App.css'

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

    const [title, setTitle] = useState<string>('')

    const [error, setError] = useState<string | null>(null)

    const addTaskHandler = () => {
        if (title.trim() !== '') {
            props.addTask(title)
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
        props.changeFilter("all")
    }

    const onClickActiveHandler = () => {
        props.changeFilter("active")
    }

    const onClickCompletedHandler = () => {
        props.changeFilter("completed")
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
                        props.removeTask(t.id)
                    }

                    const onChangeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        const newIsDoneValue = event.currentTarget.checked
                        props.changeTaskStatus(t.id, newIsDoneValue)
                    }

                    return <li key={t.id}>
                        <input type="checkbox"
                               checked={t.isDone}
                               onChange={onChangeStatusHandler}
                        />
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x
                        </button>
                    </li>
                })
            }
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
