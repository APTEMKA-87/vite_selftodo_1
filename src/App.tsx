import './App.css';
import {TaskType, Todolist} from './Todolist';
import {useState} from "react";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

type AssocTaskType = {
    [key: string]: TaskType[]
}

function App() {

    const todolistID1 = v1()
    const todolistID2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<AssocTaskType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })

    /*const addTask = (title: string) => {
        const task = {id: v1(), title, isDone: false}
        const newTask = [task, ...tasks]
        setTasks(newTask)
    }*/

    function removeTask(todolistId: string, id: string) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== id)})

        //const filteredTasks = tasks.filter(t => t.id != id);
        //setTasks(filteredTasks);
    }

    /*const changeTaskStatus = (id: string, isDone: boolean) => {
        const task = tasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks([...tasks])
        }
    }*/

    function changeFilter(todolistId: string, value: FilterValuesType) {
        setTodolists(todolists.map(el => el.id === todolistId ? {
            ...el,
            filter: value // присваеваем новый ключ
        } : el))
    }

    return (
        <div className="App">
            {todolists.map(todolist => {
                let tasksForTodolist = tasks[todolist.id];

                if (todolist.filter === "active") {
                    tasksForTodolist = tasks[todolist.id].filter(t => !t.isDone);
                }
                if (todolist.filter === "completed") {
                    tasksForTodolist = tasks[todolist.id].filter(t => t.isDone);
                }
                return <Todolist
                    key={todolist.id}
                    todolistId={todolist.id}
                    title={todolist.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                   // addTask={addTask}
                   // changeTaskStatus={changeTaskStatus}
                    filter={todolist.filter}
                />
            })}
        </div>
    );
}

export default App;
