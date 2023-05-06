import {FilterValuesType} from './App';
import {useState} from "react";

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
}

export function Todolist(props: PropsType) {

    const [title, setTitle] = useState<string>('')

    const addTaskHandler = () => {
        props.addTask(title)
        setTitle('')
    }

    const onKeyDownHandler = (event) => {
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
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => {
                        props.removeTask(t.id)
                    }

                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x
                        </button>
                    </li>
                })
            }
        </ul>
        <div>
            <button onClick={onClickAllHandler}>
                All
            </button>
            <button onClick={onClickActiveHandler}>
                Active
            </button>
            <button onClick={onClickCompletedHandler}>
                Completed
            </button>
        </div>
    </div>
}
