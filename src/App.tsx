import './App.css';
import {Todolist} from './Todolist';
import {useState} from "react";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}


function App() {

    const [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);


    const addTask = (title: string) => {
        const task = {id: v1(), title, isDone: false}
        const newTask = [task, ...tasks]
        setTasks(newTask)
    }

    function removeTask(id: string) {
        const filteredTasks = tasks.filter(t => t.id != id);
        setTasks(filteredTasks);
    }

    const changeTaskStatus = (id: string, isDone: boolean) => {
        const task = tasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks([...tasks])
        }
    }

    const [filter, setFilter] = useState<FilterValuesType>("all");

    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }


    const [todolists, setTodolists] = useState<Array<TodolistsType>>(
        [
            {id: v1(), title: 'What to learn', filter: 'all'},
            {id: v1(), title: 'What to buy', filter: 'all'},
        ]
    )


    return (
        <div className="App">
            {todolists.map(todolist => {
                return <Todolist
                    key={todolist.id}
                    id={todolist.id}
                    title={todolist.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    filter={filter}
                />
            })}

        </div>
    );
}

export default App;
