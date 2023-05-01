
export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    tasks: TasksType[]
    addTask: () => void
    removeTask: () => void
}

const Todolist = (props: PropsType) => {

    const addTaskHandler = () => {
        props.addTask()
    }

    const removeTaskHandler = () => {
        props.removeTask()
    }

    return (
        <>
            <div>
                <input/>
                <button onClick={addTaskHandler}>Add Task</button>
            </div>
            <div>
                <ul>
                    {props.tasks.map(el => <li>
                        <input type="checkbox"
                               checked={el.isDone}/>
                        <span>
                            {el.title}
                        </span>
                        <button
                            onClick={removeTaskHandler}
                        >Х
                        </button>
                    </li>)
                    }
                </ul>
            </div>
        </>
    );
};

export default Todolist;